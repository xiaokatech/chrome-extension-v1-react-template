import browser from "webextension-polyfill";

console.log("Hello from the background!");

browser.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed:", details);

  // chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

  setupContextMenu();
});

function setupContextMenu() {
  chrome.contextMenus.create({
    id: "select_text",
    title: "Select Text",
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    id: "openSidePanel",
    title: "Open side panel",
    contexts: ["all"],
  });
}

// === Others - start ===
// chrome.tabs.onActivated.addListener(async (data) => {
//   console.log("Tab activated:", data);
// });
// === Others - end ===

// === ContextMenus.onClicked events manager - start ===
chrome.contextMenus.onClicked.addListener((data, tab) => {
  if (!tab || !tab.id) return;

  console.log("data in contextMenus.onClicked:", data);

  if (data.menuItemId === "select_text") {
    // Store the last word in chrome.storage.session.
    chrome.storage.session.set({ selectedText: data.selectionText });

    // Make sure the side panel is open.
    chrome.sidePanel.open({ tabId: tab.id });
  }

  if (data.menuItemId === "openSidePanel") {
    // This will open the panel in all the pages on the current window.
    chrome.sidePanel.open({ windowId: tab.windowId });
  }
});
// === ContextMenus.onClicked events manager - end ===
