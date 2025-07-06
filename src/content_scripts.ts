console.log("Hello from the content_scripts!");

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  console.log("Message received in content_scripts:", msg);
  sendResponse(
    "Done from content_scripts at " + new Date().toLocaleTimeString()
  );
});
