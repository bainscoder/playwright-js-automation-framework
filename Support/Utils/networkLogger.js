function captureNetworkLogs(page, options = {}) {
  page.on("response", (response) => {
    const url = response.url();

    // Ignore images, css, js if enabled
    if (options.ignoreStaticFiles) {
      const ignoredExtensions = [
        ".css",
        ".png",
        ".jpg",
        ".gif",
        ".svg",
        ".js",
        ".woff",
      ];

      const shouldIgnore = ignoredExtensions.some((extension) =>
        url.includes(extension)
      );

      if (shouldIgnore) return;
    }

    console.log(`
URL: ${url}
Method: ${response.request().method()}
Status: ${response.status()}
--------------------------------`);
  });
}

module.exports = {
  captureNetworkLogs,
};