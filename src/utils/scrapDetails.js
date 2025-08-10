const axios = require("axios");
const cheerio = require("cheerio");

async function scrapDetails(url) {
  try {
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const iframeSrc = $("#desc_ifr").attr("src");

    if (iframeSrc) {
      console.log(`Menemukan iframe dengan src: ${iframeSrc}`);

      const iframeResponse = await axios.get(iframeSrc);

      const iframe$ = cheerio.load(iframeResponse.data);
      iframe$("head, script, style, noscript", "img").remove();
      const iframeContent = iframe$("body").find("div, p").text().trim();

      if (iframeContent) {
        console.log("Konten dari iframe:");
        return iframeContent
          .replace(/\n+/g, " ")
          .trim()
          .replace(/\s+/g, " ")
          .trim();
      } else {
        console.log("Tidak ada konten yang ditemukan di dalam iframe.");
        return "-";
      }
    } else {
      return "-";
    }
  } catch (error) {
    console.error("Error scraping halaman:", error);
    return "-";
  }
}

module.exports = scrapDetails;
