import { useEffect } from "react";
import "./Popup.css";

export default function () {
  useEffect(() => {
    console.log("Hello from the popup!");
  }, []);

  return (
    <div>
      <img src="/icon-with-shadow.svg" />
      <h1>vite-plugin-web-extension</h1>
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
      <button
        onClick={() => {
          console.log("Button clicked, opening sidebar...");
          chrome.tabs.query(
            { active: true, currentWindow: true },
            async function (tabs) {
              const tab = tabs[0];
              if (tab.id) {
                console.log("Opening sidebar for tab:", tab.id);
                const options = await chrome.sidePanel.getOptions({
                  tabId: tab.id,
                });
                console.log("Current side panel options:", options);
                const result = await chrome.sidePanel.open({ tabId: tab.id });
                console.log("Sidebar opened:", result);
              }
            }
          );
        }}
      >
        button 2: Open Sidebar
      </button>
    </div>
  );
}
