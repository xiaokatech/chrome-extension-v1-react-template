import browser from "webextension-polyfill";
import { EContextMenuItem } from "./enums/EContextMenuItem";

console.log("Hello from the background!");

browser.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed:", details);

  // chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

  setupContextMenu();
});

function setupContextMenu() {
  // @Source: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/sample.sidepanel-dictionary
  chrome.contextMenus.create({
    id: EContextMenuItem.SELECT_TEXT,
    title: "Select Text",
    contexts: ["selection"],
  });

  // @Source: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/cookbook.sidepanel-open
  chrome.contextMenus.create({
    id: EContextMenuItem.OPEN_SIDE_PANEL,
    title: "Open side panel",
    contexts: ["all"],
  });
}

// === ContextMenus.onClicked events manager - start ===
chrome.contextMenus.onClicked.addListener((data, tab) => {
  if (!tab || !tab.id) return;

  console.log("data in contextMenus.onClicked:", data);

  if (data.menuItemId === EContextMenuItem.SELECT_TEXT) {
    // Store the last word in chrome.storage.session.
    chrome.storage.session.set({ selectedText: data.selectionText });

    // Make sure the side panel is open.
    chrome.sidePanel.open({ tabId: tab.id });
  }

  if (data.menuItemId === EContextMenuItem.OPEN_SIDE_PANEL) {
    // This will open the panel in all the pages on the current window.
    chrome.sidePanel.open({ windowId: tab.windowId });
  }
});
// === ContextMenus.onClicked events manager - end ===

// === Runtime.onMessage events manager - start ===
// @Source: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/cookbook.sidepanel-site-specific
// chrome.runtime.onMessage.addListener((message, sender) => {
//   // The callback for runtime.onMessage must return falsy if we're not sending a response
//   (async () => {
//     if (message.type === 'open_side_panel') {
//       // This will open a tab-specific side panel only on the current tab.
//       await chrome.sidePanel.open({ tabId: sender.tab.id });
//       await chrome.sidePanel.setOptions({
//         tabId: sender.tab.id,
//         path: 'sidepanel-tab.html',
//         enabled: true
//       });
//     }
//   })();
// });
// === Runtime.onMessage events manager - end ===

// === Others - start ===
// @Source: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/cookbook.sidepanel-multiple
// const welcomePage = 'sidepanels/welcome-sp.html';
// const mainPage = 'sidepanels/main-sp.html';

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.sidePanel.setOptions({ path: welcomePage });
//   chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
// });

// chrome.tabs.onActivated.addListener(async ({ tabId }) => {
//   const { path } = await chrome.sidePanel.getOptions({ tabId });
//   if (path === welcomePage) {
//     chrome.sidePanel.setOptions({ path: mainPage });
//   }
// });
// === Others - end ===
