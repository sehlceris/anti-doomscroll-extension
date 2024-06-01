document.getElementById("proceed-btn").addEventListener("click", () => {
  const timeInput = document.getElementById("time-input")?.value;
  let timeInMinutes = parseInt(timeInput, 10);

  if (isNaN(timeInMinutes) || timeInMinutes <= 0) {
    timeInMinutes = 5; // Default to 5 minutes
  }

  const timeInMilliseconds = timeInMinutes * 60 * 1000;
  console.log(
    `proeced button clicked, dismissing warning for minuntes: `,
    timeInMinutes
  );

  chrome.storage.local.get("redirectUrl", (data) => {
    if (data.redirectUrl) {
      const domain = extractDomain(data.redirectUrl);
      chrome.storage.local.set(
        { [domain]: Date.now() + timeInMilliseconds },
        () => {
          console.log(`proceeding to redirect url`, data.redirectUrl);
          window.location.href = data.redirectUrl; // Redirect to the original URL
        }
      );
    }
  });
});

function extractDomain(url) {
  try {
    const { hostname } = new URL(url);
    return hostname.replace(/^www\./, ""); // Remove 'www.' if it exists
  } catch (e) {
    console.error("Invalid URL:", url);
    return "";
  }
}
