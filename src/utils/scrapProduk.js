const axios = require("axios");
const cheerio = require("cheerio");
const scrapDetails = require("./scrapDetails");
const puppeterDetails = require("./puppeter/puppeterDetails");
const puppeteer = require("puppeteer");

async function scrapProduk(url) {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0");

    console.log("🔍 Membuka halaman list produk...");
    await page.goto(url, { waitUntil: "networkidle2", timeout: 5000 });

    const html = await page.content();
    const $ = cheerio.load(html);
    $("head, script, style, noscript").remove();

    const products = $(".s-item")
      .map((i, element) => {
        const Name = $(element).find(".s-item__title").text().trim() || "-";
        const Price = $(element).find(".s-item__price").text().trim() || "-";
        const productUrl = $(element).find(".s-item__link").attr("href") || "-";
        return { Name, Price, productUrl };
      })
      .get();

    for (let product of products) {
      if (product.productUrl && product.productUrl !== "-") {
        product.Description = await puppeterDetails(
          browser,
          product.productUrl
        );
      } else {
        product.Description = "-";
      }
    }

    return products;
  } catch (err) {
    console.error("❌ Error scraping items:", err.message);
    return [];
  } finally {
    if (browser) await browser.close();
  }
}

module.exports = { scrapProduk };
