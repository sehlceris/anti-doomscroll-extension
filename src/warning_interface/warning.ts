// src/warning_interface/warning.ts
document.getElementById("proceed-btn")?.addEventListener("click", () => {
  // Retrieve the original URL from storage
  chrome.storage.local.get("redirectUrl", (data) => {
    console.log(`proceed button clicked. redirecting to`, data.redirectUrl);
    if (data.redirectUrl) {
      window.location.href = data.redirectUrl; // Redirect to the original URL
    }
  });
});
