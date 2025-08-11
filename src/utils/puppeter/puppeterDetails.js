async function puppeterDetails(browser, url) {
  try {
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0");

    console.log(`📄 Membuka halaman detail: ${url}`);
    await page.goto(url, { waitUntil: "networkidle2", timeout: 5000 });

    // Cek apakah iframe deskripsi ada
    const hasIframe = await page.$("#desc_ifr");

    if (hasIframe) {
      const iframeSrc = await page.$eval("#desc_ifr", (iframe) => iframe.src);

      if (iframeSrc) {
        const iframePage = await browser.newPage();
        await iframePage.goto(iframeSrc, {
          waitUntil: "networkidle2",
          timeout: 60000,
        });

        const iframeContent = await iframePage.evaluate(() => {
          const bodyText = document.querySelector("body").innerText;
          return bodyText.replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
        });

        await iframePage.close();
        await page.close();
        return iframeContent || "-";
      }
    }

    // Fallback: ambil deskripsi langsung di halaman
    const fallbackSelectors = [
      "#viTabs_0_is",
      ".item-desc",
      "#viTabs_0_pd",
      ".d-item-description",
    ];

    for (const selector of fallbackSelectors) {
      const exists = await page.$(selector);
      if (exists) {
        const desc = await page.$eval(selector, (el) =>
          el.innerText.replace(/\n+/g, " ").replace(/\s+/g, " ").trim()
        );
        await page.close();
        return desc || "-";
      }
    }

    await page.close();
    return "-";
  } catch (err) {
    console.error("⚠️ Error mengambil deskripsi:", err.message);
    return "-";
  }
}

module.exports = puppeterDetails;
