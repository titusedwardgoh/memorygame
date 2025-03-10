import { useEffect } from "react";

export default function EmojiFetcher({ setAllEmojis }) {
  useEffect(() => {
    const fetchEmojis = async () => {
      try {
        const response = await fetch(
          "https://emoji-api.com/emojis?access_key=3e427b8a2ec099e69a7509375f25f13d46df2779"
        );
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        setAllEmojis(data); 
      } catch (error) {
        console.error("Error fetching emojis:", error);
      }
    };

    fetchEmojis();
  }, [setAllEmojis]); 

}
