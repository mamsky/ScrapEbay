const express = require("express");
const app = express();
const port = 4000;
const { scrapProduk } = require("./utils/scrapProduk");

app.get("/", async (req, res) => {
  try {
    const { url } = req.query;
    const output = await scrapProduk(url);

    res.json(output);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
