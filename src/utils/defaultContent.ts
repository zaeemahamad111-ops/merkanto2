export interface ContentItem {
  key: string;
  value: string;
  category: string;
  label: string;
  type: "text" | "textarea" | "image" | "video";
}

export const defaultContent: ContentItem[] = [
  // ─── HOME PAGE ───
  {
    key: "home.hero.badge",
    value: "Global Logistics Excellence",
    category: "Home",
    label: "Hero Badge Text",
    type: "text"
  },
  {
    key: "home.hero.title",
    value: "Building Global Trade Leaders",
    category: "Home",
    label: "Hero Title",
    type: "text"
  },
  {
    key: "home.hero.description",
    value: "Merkanto Global Trade Academy equips entrepreneurs and future exporters with practical international trade systems, supplier networks, branding strategies, and real-world import-export operations.",
    category: "Home",
    label: "Hero Description Text",
    type: "textarea"
  },
  {
    key: "home.hero.video",
    value: "/videos/hero_logistics.mp4",
    category: "Home",
    label: "Hero Background Video URL",
    type: "video"
  },
  {
    key: "home.about.title",
    value: "Architecting Global Trade Integration",
    category: "Home",
    label: "About Section Header",
    type: "text"
  },
  {
    key: "home.about.description",
    value: "Merkanto Global is a multi-sector enterprise integrating premium commodity trading, structured academy training, luxury automotive acquisitions, and elite creative production.",
    category: "Home",
    label: "About Section Description",
    type: "textarea"
  },
  {
    key: "home.division.0.title",
    value: "Institutional Trade",
    category: "Home",
    label: "Division 1 Title (Trade)",
    type: "text"
  },
  {
    key: "home.division.0.description",
    value: "Precision-driven commodity trading and supply chain architecture for global markets.",
    category: "Home",
    label: "Division 1 Description",
    type: "textarea"
  },
  {
    key: "home.division.0.img",
    value: "/images/academy.png",
    category: "Home",
    label: "Division 1 Image URL",
    type: "image"
  },
  {
    key: "home.division.1.title",
    value: "Academy Hub",
    category: "Home",
    label: "Division 2 Title (Academy)",
    type: "text"
  },
  {
    key: "home.division.1.description",
    value: "Mentorship and curriculum for the next generation of exporters.",
    category: "Home",
    label: "Division 2 Description",
    type: "textarea"
  },
  {
    key: "home.division.1.img",
    value: "/images/academy.png",
    category: "Home",
    label: "Division 2 Image URL",
    type: "image"
  },
  {
    key: "home.division.2.title",
    value: "Automotive",
    category: "Home",
    label: "Division 3 Title (Automotive)",
    type: "text"
  },
  {
    key: "home.division.2.description",
    value: "Global vehicle logistics and boutique acquisition services.",
    category: "Home",
    label: "Division 3 Description",
    type: "textarea"
  },
  {
    key: "home.division.2.img",
    value: "/images/car interior.png",
    category: "Home",
    label: "Division 3 Image URL",
    type: "image"
  },
  {
    key: "home.division.3.title",
    value: "Weddings",
    category: "Home",
    label: "Division 4 Title (Weddings)",
    type: "text"
  },
  {
    key: "home.division.3.description",
    value: "Architecting timeless, high-production celebratory experiences.",
    category: "Home",
    label: "Division 4 Description",
    type: "textarea"
  },
  {
    key: "home.division.3.img",
    value: "https://lh3.googleusercontent.com/aida-public/AB6AXuClmYFYOhxjTw17KMDLSnD1y6q-h3RHIrf7eFRA1ZwGgtFIkRnV-QlKZSxKC2hFcS7uxqg370wSqMzqlPN7EGnCmI65PDwfAt4vPjYNIrAY4KjkhsgfRTYYK10DJHH1GMsemYjvANUJ0tx6T2pPKSrC5oBS44tvoLZG7J4uwL_yJdaMa1Nf-j7qbWO9AKhfNB9htBc5DCPvFn-fLq_W8QUmgpa1IyG9seOrKu_2ftFJoUv7E0LRV0EW1mPrlWq5np_nVCUL2la4baM",
    category: "Home",
    label: "Division 4 Image URL",
    type: "image"
  },
  {
    key: "home.division.4.title",
    value: "Studios & Events",
    category: "Home",
    label: "Division 5 Title (Events)",
    type: "text"
  },
  {
    key: "home.division.4.description",
    value: "Large-scale event management and creative production house.",
    category: "Home",
    label: "Division 5 Description",
    type: "textarea"
  },
  {
    key: "home.division.4.img",
    value: "/images/wedding set.png",
    category: "Home",
    label: "Division 5 Image URL",
    type: "image"
  },

  // ─── ABOUT PAGE ───
  {
    key: "about.hero.badge",
    value: "Institutional Profile & Core Philosophy",
    category: "About",
    label: "Hero Badge Text",
    type: "text"
  },
  {
    key: "about.hero.title",
    value: "Structural Intelligence For Global Commerce",
    category: "About",
    label: "Hero Title Text",
    type: "text"
  },
  {
    key: "about.hero.description",
    value: "Merkanto is a multi-dimensional global enterprise operating at the intersection of international trade, private capital execution, strategic compliance advisory, and elite academic accreditation. We engineer and govern private supply chains with absolute precision.",
    category: "About",
    label: "Hero Description Text",
    type: "textarea"
  },
  {
    key: "about.pillar.1.title",
    value: "Supply Chain Orchestration",
    category: "About",
    label: "Pillar 1 Title",
    type: "text"
  },
  {
    key: "about.pillar.1.description",
    value: "We direct primary networks and logistics channels across six continents, implementing real-time verification and rigorous quality control for raw asset and high-value technical shipments.",
    category: "About",
    label: "Pillar 1 Description",
    type: "textarea"
  },
  {
    key: "about.pillar.2.title",
    value: "Compliance & Security",
    category: "About",
    label: "Pillar 2 Title",
    type: "text"
  },
  {
    key: "about.pillar.2.description",
    value: "Governance is our foundation. We operate structured compliance layers and automated customs documentation routing to guarantee secure, high-stakes regulatory clearance in complex jurisdictions.",
    category: "About",
    label: "Pillar 2 Description",
    type: "textarea"
  },
  {
    key: "about.pillar.3.title",
    value: "Scholastic Excellence",
    category: "About",
    label: "Pillar 3 Title",
    type: "text"
  },
  {
    key: "about.pillar.3.description",
    value: "Our Academy exists to cultivate the next cohort of global trade executives. We provide elite-track accreditation, dynamic video classrooms, and structured case review work.",
    category: "About",
    label: "Pillar 3 Description",
    type: "textarea"
  },
  {
    key: "about.governance.title",
    value: "Governance & Global Standards",
    category: "About",
    label: "Governance Header",
    type: "text"
  },
  {
    key: "about.governance.description",
    value: "Merkanto operates in compliance with strict international trade acts and custom protocols. Our corporate structures protect private client interest and maintain maximum execution efficiency across trade nodes.",
    category: "About",
    label: "Governance Description Text",
    type: "textarea"
  },

  // ─── TRADE PAGE ───
  {
    key: "trade.hero.title",
    value: "Institutional Trade",
    category: "Trade",
    label: "Hero Title",
    type: "text"
  },
  {
    key: "trade.hero.subtitle",
    value: "Commodity Trading & Supply Chain Architecture",
    category: "Trade",
    label: "Hero Subtitle Text",
    type: "text"
  },
  {
    key: "trade.hero.description",
    value: "We govern primary networks and trade lines across global markets. From origin validation to secure custom routing, Merkanto guarantees absolute execution reliability.",
    category: "Trade",
    label: "Hero Description Text",
    type: "textarea"
  },
  {
    key: "trade.hero.img",
    value: "/images/brochure_page7_img1.jpeg",
    category: "Trade",
    label: "Hero Background Image URL",
    type: "image"
  },
  {
    key: "trade.portfolio.0.title",
    value: "Heavy Industrial Components",
    category: "Trade",
    label: "Portfolio 1 Title",
    type: "text"
  },
  {
    key: "trade.portfolio.0.description",
    value: "Global supply of tier-1 heavy machinery and industrial automation hardware.",
    category: "Trade",
    label: "Portfolio 1 Description",
    type: "textarea"
  },
  {
    key: "trade.portfolio.0.img",
    value: "/images/core 1.png",
    category: "Trade",
    label: "Portfolio 1 Image URL",
    type: "image"
  },
  {
    key: "trade.portfolio.1.title",
    value: "Raw Commodity Assets",
    category: "Trade",
    label: "Portfolio 2 Title",
    type: "text"
  },
  {
    key: "trade.portfolio.1.description",
    value: "Strategic sourcing of essential industrial raw materials and base metals.",
    category: "Trade",
    label: "Portfolio 2 Description",
    type: "textarea"
  },
  {
    key: "trade.portfolio.1.img",
    value: "/images/core 2.png",
    category: "Trade",
    label: "Portfolio 2 Image URL",
    type: "image"
  },
  {
    key: "trade.portfolio.2.title",
    value: "Specialized Electronics",
    category: "Trade",
    label: "Portfolio 3 Title",
    type: "text"
  },
  {
    key: "trade.portfolio.2.description",
    value: "Precision procurement of aerospace-grade components and micro-electronics.",
    category: "Trade",
    label: "Portfolio 3 Description",
    type: "textarea"
  },
  {
    key: "trade.portfolio.2.img",
    value: "/images/core 3.png",
    category: "Trade",
    label: "Portfolio 3 Image URL",
    type: "image"
  },
  {
    key: "trade.portfolio.3.title",
    value: "Sustainable Infrastructure",
    category: "Trade",
    label: "Portfolio 4 Title",
    type: "text"
  },
  {
    key: "trade.portfolio.3.description",
    value: "Exporting advanced green energy technology and sustainable system components.",
    category: "Trade",
    label: "Portfolio 4 Description",
    type: "textarea"
  },
  {
    key: "trade.portfolio.3.img",
    value: "/images/core 4.png",
    category: "Trade",
    label: "Portfolio 4 Image URL",
    type: "image"
  },

  // ─── ACADEMY PAGE ───
  {
    key: "academy.hero.badge",
    value: "Intelligence at Scale",
    category: "Academy",
    label: "Hero Badge Text",
    type: "text"
  },
  {
    key: "academy.hero.title",
    value: "Learn International Trade From Real Business Operations",
    category: "Academy",
    label: "Hero Title Text",
    type: "text"
  },
  {
    key: "academy.hero.description",
    value: "Access the proprietary blueprints of global logistics. We don't just teach theory; we show you the live data streams of Merkanto's own international trade networks.",
    category: "Academy",
    label: "Hero Description Text",
    type: "textarea"
  },
  {
    key: "academy.hero.img",
    value: "/images/academy.png",
    category: "Academy",
    label: "Hero Background Image URL",
    type: "image"
  },

  // ─── AUTOMOTIVE PAGE ───
  {
    key: "automotive.hero.badge",
    value: "Precision Craftsmanship",
    category: "Automotive",
    label: "Hero Badge Text",
    type: "text"
  },
  {
    key: "automotive.hero.title",
    value: "The Art of Automotive Excellence",
    category: "Automotive",
    label: "Hero Title Text",
    type: "text"
  },
  {
    key: "automotive.hero.description",
    value: "Bespoke interior reimagining, imported technical enhancements, and cinematic detailing for the discerning collector.",
    category: "Automotive",
    label: "Hero Description Text",
    type: "textarea"
  },
  {
    key: "automotive.hero.img",
    value: "https://lh3.googleusercontent.com/aida-public/AB6AXuAohpsVZiOi2oxIp0hMFAGZ8u0nfYCZW38e2YoSFLNfdN6Xxpe44A-EMMxQLHdo67R7njV7jweqhHFT8trKp_HjdmZSDrwOvk_2wBPPVYlkiDSybZWMkiXYRKwIYj75eNpky7KOOpRenXNhjyHW2UYUmf6SxLlTB5Ub7o6kwo6RByFsoX1fvxzPiCnrSCR21M3LF4QPwwanIaVGYfzFC2QlrN9P_m82XzzjH5qnCL38kEYBBUmFWmMbGpmuPLi-Gb9TOg9Z_8M9Q28",
    category: "Automotive",
    label: "Hero Background Image URL",
    type: "image"
  },
  {
    key: "automotive.vertical.1.title",
    value: "Interior Reimagining",
    category: "Automotive",
    label: "Vertical 1 Header",
    type: "text"
  },
  {
    key: "automotive.vertical.1.description",
    value: "Complete cabin redesign using full-grain leathers, custom carbon structures, and tailored stitching.",
    category: "Automotive",
    label: "Vertical 1 Description",
    type: "textarea"
  },
  {
    key: "automotive.vertical.1.img",
    value: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOIqCYZaBFcIE9TgESEzShp1zX48vblh9igtli4YaBIyPyHJfGg8_YkDDvXvWR2RRyHmXnW44tL0mgk2BnDx4-x9ywHjTj-e06txKFFOblbKuluhZfe9C66eX306JfxYKAA9obGP5km90BMenA5fdR8TWPuOXGaL_fFmvBCdOA6P11WEUCbVDAZoESaF4Rmw8bYMrV-PYHYcfn0fYXDkK6xtAzByIU5VXGAfg0o-6a-7W_eHTrZWqsVKKM82eTq8LRUBt9kQicChQ",
    category: "Automotive",
    label: "Vertical 1 Image URL",
    type: "image"
  },
  {
    key: "automotive.vertical.2.title",
    value: "Technical Enhancements",
    category: "Automotive",
    label: "Vertical 2 Header",
    type: "text"
  },
  {
    key: "automotive.vertical.2.description",
    value: "Importing and engineering elite exhaust systems, forged wheels, and wind-tunnel tested aero packages.",
    category: "Automotive",
    label: "Vertical 2 Description",
    type: "textarea"
  },
  {
    key: "automotive.vertical.2.img",
    value: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2H6v_0VnB5eY20gR3Kk-1Ym_5qF8pI_R2w08S6s1h9K9Xy3x5tV-fG_n4K3yD5M3f-K_N3Rj9sJj3v6x-K_M3Rj9sJj3v6x-K_M3Rj9sJj3v6x-K_M3",
    category: "Automotive",
    label: "Vertical 2 Image URL",
    type: "image"
  },
  {
    key: "automotive.vertical.3.title",
    value: "Bespoke Aesthetics",
    category: "Automotive",
    label: "Vertical 3 Header",
    type: "text"
  },
  {
    key: "automotive.vertical.3.description",
    value: "Self-healing paint protection films, proprietary ceramic seals, and absolute detailing perfection.",
    category: "Automotive",
    label: "Vertical 3 Description",
    type: "textarea"
  },
  {
    key: "automotive.vertical.3.img",
    value: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtnDF-l73h9Cel1bjYarVIigBQRmBD2LPqxRwbUrgJFKyNIkmx3BgLQ-tRhyD6neXeWhxJSHfCWoa-Kh2uQ0cnx2FBGoE7MCyLWB7KVCZW5qXQ9kx86UyWkLhVPFVJ1afGoO4Qd_f3EozS-EKxU7N6fPukiuahtsHz9Mr5dSUhG4vlwmxqCobEfywpmSjjYntXnU7ilQoBI25sBVIxaDefd74YKAnX1uRvCgJiBSEyVe47_a7WddeGnQqN8H0EBTRQ6CHdEX0mMX8",
    category: "Automotive",
    label: "Vertical 3 Image URL",
    type: "image"
  },

  // ─── WEDDING PAGE ───
  {
    key: "wedding.hero.title",
    value: "Archiving the Eternal",
    category: "Weddings",
    label: "Hero Title Text",
    type: "text"
  },
  {
    key: "wedding.hero.description",
    value: "Elite wedding photography for those who view life through a cinematic lens. Precision-crafted imagery for the global aesthetic elite.",
    category: "Weddings",
    label: "Hero Description Text",
    type: "textarea"
  },
  {
    key: "wedding.hero.img",
    value: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0wH35p1GxmtACgOpw830FKlkO97pgBsMHfZOMAz8-7MSc-fC2ooXEAxs8zq_166fcCTUsY4fPbcE57ZfPdoxlwqh9elhy0nnPFgnXQGweZkWcrtCLOhSsB2OjFquYrlIYVCEVZXHJOsz-PduoqB2G2SewJhO-JxmDTx1GMylaLFDW1et7Krt3R-tC-wqqFP1go7QrpzCrIv_Rl1mWs_58p-LdYHCO-A-NdhytKPMuNDOYLkZ6SdS-dwM8MKK2donMqXw1bPlkwz4",
    category: "Weddings",
    label: "Hero Background Image URL",
    type: "image"
  },
  {
    key: "wedding.gallery.1.title",
    value: "The Villa Sola Cabiati Union",
    category: "Weddings",
    label: "Gallery 1 Header",
    type: "text"
  },
  {
    key: "wedding.gallery.1.subtitle",
    value: "Lake Como, Italy",
    category: "Weddings",
    label: "Gallery 1 Subtitle",
    type: "text"
  },
  {
    key: "wedding.gallery.1.img",
    value: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtMbvWo63uTL2DEg37q8poy27yzL7vpCgrqgqRD2AWWGQoAepwdz3o-kIy50C1coV-oWsU0LBHfitDk_qHTFP_FcOHT7B68p6hpc7XsyNFmTwsxCtKZFLLRA8NpAF09qHy40hpgTGcUxhujLxu8QIzSFVG3m_ByXOUIi1jTDPFPnSucri6FgL8KNB8Y3ylH3MToqECNsxYM91KSPB38f-ko9OwNP_QbsFAvNqYHbArW_80RvdNTD2RqeeyGosxFtl1rt4cjjSHoNM",
    category: "Weddings",
    label: "Gallery 1 Image URL",
    type: "image"
  },
  {
    key: "wedding.gallery.2.title",
    value: "The Editorial Silhouette",
    category: "Weddings",
    label: "Gallery 2 Header",
    type: "text"
  },
  {
    key: "wedding.gallery.2.subtitle",
    value: "Parisian Editorial Capture",
    category: "Weddings",
    label: "Gallery 2 Subtitle",
    type: "text"
  },
  {
    key: "wedding.gallery.2.img",
    value: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOI_d_yVpSjJ4n_m2p4t7T4Xl7-92yD5M3f-K_N3Rj9sJj3v6x-K_M3Rj9sJj3v6x-K_M3Rj9sJj3v6x-K_M3",
    category: "Weddings",
    label: "Gallery 2 Image URL",
    type: "image"
  },
  {
    key: "wedding.gallery.3.title",
    value: "The Amanpuri Devotion",
    category: "Weddings",
    label: "Gallery 3 Header",
    type: "text"
  },
  {
    key: "wedding.gallery.3.subtitle",
    value: "Phuket, Thailand",
    category: "Weddings",
    label: "Gallery 3 Subtitle",
    type: "text"
  },
  {
    key: "wedding.gallery.3.img",
    value: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2H6v_0VnB5eY20gR3Kk-1Ym_5qF8pI_R2w08S6s1h9K9Xy3x5tV-fG_n4K3yD5M3f-K_N3Rj9sJj3v6x-K_M3Rj9sJj3v6x-K_M3Rj9sJj3v6x-K_M3",
    category: "Weddings",
    label: "Gallery 3 Image URL",
    type: "image"
  },

  // ─── EVENTS PAGE ───
  {
    key: "events.hero.badge",
    value: "Merkanto Studios Presents",
    category: "Events",
    label: "Hero Badge Text",
    type: "text"
  },
  {
    key: "events.hero.title",
    value: "Couture Celebrations. Global Precision.",
    category: "Events",
    label: "Hero Title Text",
    type: "text"
  },
  {
    key: "events.hero.description",
    value: "Architectural event design for the world's most discerning visionaries. From high-stakes institutional galas to intimate destination unions.",
    category: "Events",
    label: "Hero Description Text",
    type: "textarea"
  },
  {
    key: "events.hero.img",
    value: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhCBAspxLpcY-L34jzrzboKs9iwXjEM7wX-gyUgBDNmWukIef8XuWA74-sV3eK17-V3B0VaS-xk8I53JGqMa3NOkWer9cLhbpse9l4fFGjy32VRFKfv-_s0kwCNQVW0X9X_pjx1OaA8zAfpZMDwozHU068ij_kfCDT5fnL5HBOHcC7a_8G9QOjWiTg7jBHWdohxvU5GF9JiACbOjzNkhwAOU-qnlmzVK1sRWb0z9hdFnRsK9ZiiXVCbn_Bp8hTA4tww9xe9sd8K5E",
    category: "Events",
    label: "Hero Background Image URL",
    type: "image"
  },
  {
    key: "events.weddings.title",
    value: "Luxury Weddings",
    category: "Events",
    label: "Weddings Section Header",
    type: "text"
  },
  {
    key: "events.weddings.description",
    value: "Designing celebrations that are spatial masterpieces. Our weddings balance couture styling with absolute logistics, turning destinations into private worlds.",
    category: "Events",
    label: "Weddings Section Description",
    type: "textarea"
  },
  {
    key: "events.weddings.img",
    value: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0wH35p1GxmtACgOpw830FKlkO97pgBsMHfZOMAz8-7MSc-fC2ooXEAxs8zq_166fcCTUsY4fPbcE57ZfPdoxlwqh9elhy0nnPFgnXQGweZkWcrtCLOhSsB2OjFquYrlIYVCEVZXHJOsz-PduoqB2G2SewJhO-JxmDTx1GMylaLFDW1et7Krt3R-tC-wqqFP1go7QrpzCrIv_Rl1mWs_58p-LdYHCO-A-NdhytKPMuNDOYLkZ6SdS-dwM8MKK2donMqXw1bPlkwz4",
    category: "Events",
    label: "Weddings Section Image URL",
    type: "image"
  },
  {
    key: "events.galas.title",
    value: "Corporate Galas & Summits",
    category: "Events",
    label: "Galas Section Header",
    type: "text"
  },
  {
    key: "events.galas.description",
    value: "Vetted event production for sovereign summits, elite trade banquets, and brand milestones. We orchestrate secure protocols, state-of-the-art multimedia environments, and flawless timeline execution.",
    category: "Events",
    label: "Galas Section Description",
    type: "textarea"
  },
  {
    key: "events.galas.img",
    value: "/images/wedding set.png",
    category: "Events",
    label: "Galas Section Image URL",
    type: "image"
  }
];
