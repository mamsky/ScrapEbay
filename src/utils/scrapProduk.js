const axios = require("axios");
const cheerio = require("cheerio");
const scrapDetails = require("./scrapDetails");

async function scrapProduk(url) {
  try {
    const { data: rawHTML } = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const $ = cheerio.load(rawHTML);
    $("head, script, style, noscript").remove();

    const items = $(".s-item").map(async (index, element) => {
      const Name = $(element).find(".s-item__title").text();

      const Price = $(element).find(".s-item__price").text();

      const productUrl = $(element).find(".s-item__link").attr("href");

      const productDescription = await scrapDetails(productUrl);

      return {
        Name,
        Price,
        Description: productDescription,
      };
    });

    const resultsArray = await Promise.all(items.get());
    return resultsArray.slice(0, 20);
  } catch (err) {
    return `❌ Error fetching ${url}:`, err.message;
  }
}

module.exports = { scrapProduk };
