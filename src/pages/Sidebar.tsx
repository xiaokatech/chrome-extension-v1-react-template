import { useEffect, useState } from "react";
import "./Sidebar.css";

export default function () {
  const [tabId, setTabId] = useState<number>();

  useEffect(() => {
    console.log("Hello from the sidebar!");
  }, []);

  return (
    <div>
      <h1>Sidebar</h1>
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
