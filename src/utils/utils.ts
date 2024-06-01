const extractDomain = (url: string | undefined): string => {
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
};

module.exports = { extractDomain };
export { extractDomain }; // For ES module compatibility
