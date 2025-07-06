import { useEffect, useState } from "react";
import "./Sidebar.css";

export default function () {
  const [selectedText, setSelectedText] = useState<number>();

  useEffect(() => {
    console.log("Hello from the sidebar!");

    chrome.storage.session.get("selectedText", ({ selectedText }) => {
      setSelectedText(selectedText);
    });

    chrome.storage.session.onChanged.addListener((changes) => {
      const lastWordChange = changes["selectedText"];

      if (!lastWordChange) {
        return;
      }

      setSelectedText(lastWordChange.newValue);
    });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>

      <h1>Sidebar: {selectedText}</h1>
      <p>
        Template: <code>react-ts</code>
      </p>
      <button
        onClick={() => {
          console.log("Button clicked, sending message to content script...");
          chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
              const tab = tabs[0];
              if (tab.id) {
                chrome.tabs.sendMessage(
                  tab.id,
                  {
                    type: "popup_opened",
                    timestamp: Date.now(),
                  },
                  (msg) => {
                    console.log("result message:", msg);
                  }
                );
              }
            }
          );
        }}
      >
        button 1: Send Message to Content Script
      </button>
    </div>
  );
}
