const blockList = [
  "*://*.doubleclick.net/*",
  "*://*.googleadservices.com/*",
  "*://*.googlesyndication.com/*",
  "*://*.adsafeprotected.com/*",
  "*://*.adnxs.com/*",
  "*://*.adform.net/*",
  "*://*.advertising.com/*",
  "*://*.media.net/*",
  "*://*.yieldmanager.com/*",
  "*://*.yahoo.com/*",
  "*://*.ytimg.com/*"  // YouTube ads
];

chrome.webRequest.onBeforeRequest.addListener(
  (details) => ({ cancel: true }),
  { urls: blockList },
  ["blocking"]
);


const browserAPI = window.browser || window.chrome;