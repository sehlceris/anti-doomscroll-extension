function extractDomain(url: string | undefined): string {
  if (!url) {
    return "";
  }
  try {
    const { hostname } = new URL(url);
    return hostname.replace(/^www\./, ""); // Remove 'www.' if it exists
  } catch (e) {
    console.error("Invalid URL:", url);
    return "";
  }
}

// src/background_scripts/background.ts
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    chrome.storage.sync.get({ sites: [] }, (data) => {
      const restrictedDomains = data.sites;
      const domain = extractDomain(changeInfo?.url);
      if (
        domain &&
        restrictedDomains.some(
          (restrictedDomain: string) =>
            domain.startsWith(restrictedDomain) ||
            domain.endsWith(restrictedDomain)
        )
      ) {
        chrome.storage.local.get({ [domain]: 0 }, (timestampData) => {
          const lastAccepted = timestampData[domain];
          const now = Date.now();

          if (now > lastAccepted) {
            // Check if current time is past the allowed time
            chrome.storage.local.set({ redirectUrl: changeInfo.url }, () => {
              chrome.tabs.update(tabId, {
                url: "src/warning_interface/warning.html",
              });
            });
          }
        });
      } else {
        console.log(
          `visiting url not on the restricted list`,
          changeInfo?.url,
          restrictedDomains,
          domain
        );
      }
    });
  }
});
