import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, type, message } = await req.json();

    if (!name || !email || !type || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Read the Web3Forms access key from environment variables
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY || "deaac10c-d556-4907-9fa2-b1a157306ab2";

    // Forward the request to Web3Forms API
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: name,
        email: email,
        subject: `[MERKANTO INQUIRY] ${type} - ${name}`,
        message: message,
        from_name: "Merkanto Website Contact Desk",
        replyto: email
      })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      console.error("[Web3Forms Proxy Error]", data);
      return NextResponse.json({ error: data.message || "Failed to dispatch message to email server." }, { status: response.status });
    }

    return NextResponse.json({ success: true, message: "Your inquiry has been successfully dispatched." });
  } catch (error: any) {
    console.error("[Web3Forms Proxy Exception]", error);
    return NextResponse.json({ error: error.message || "Internal server error." }, { status: 500 });
  }
}
