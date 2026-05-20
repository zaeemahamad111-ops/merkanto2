import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";
import { defaultContent } from "@/utils/defaultContent";

// In-memory cache for the session to prevent double fetches and flashes during navigation
let cachedContent: Record<string, string> = {};
let isFetched = false;

// Create a direct map of defaults for easy O(1) fallback lookups
const defaultMap: Record<string, string> = {};
defaultContent.forEach((item) => {
  defaultMap[item.key] = item.value;
});

export function useContent() {
  const [content, setContent] = useState<Record<string, string>>(cachedContent);
  const [loading, setLoading] = useState(!isFetched);

  useEffect(() => {
    if (isFetched) {
      setLoading(false);
      return;
    }

    async function fetchContent() {
      try {
        const { data, error } = await supabase
          .from("merkanto_content")
          .select("key, value");

        if (error) {
          // If table doesn't exist, we fail silently and use fallback defaults
          console.warn("Supabase table 'merkanto_content' not found or inaccessible. Using local defaults.");
        } else if (data) {
          const map: Record<string, string> = {};
          data.forEach((row) => {
            map[row.key] = row.value;
          });
          cachedContent = map;
          isFetched = true;
          setContent(map);
        }
      } catch (err) {
        console.error("Failed to load CMS content from Supabase. Falling back to local copy.", err);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, []);

  const getContent = (key: string, customDefault?: string) => {
    if (content[key] !== undefined) {
      return content[key];
    }
    return customDefault !== undefined ? customDefault : (defaultMap[key] || "");
  };

  return { getContent, loading };
}
