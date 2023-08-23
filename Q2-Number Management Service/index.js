const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

app.get("/numbers", async (req, res) => {
  const urls = req.query.url;

  if (!urls) {
    return res.status(400).json({ message: "No URLs provided" });
  }

  const urlArray = Array.isArray(urls) ? urls : [urls];
  const promises = [];

  for (const url of urlArray) {
    promises.push(
      axios
        .get(url)
        .then((response) => response.data.numbers)
        .catch((error) => {
          console.error(`Error fetching data from ${url}: ${error.message}`);
          return [];
        })
    );
  }

  try {
    const results = await Promise.allSettled(promises);
    const mergedNumbers = results
      .filter((result) => result.status === "fulfilled")
      .flatMap((result) => result.value)
      .filter((number, index, self) => self.indexOf(number) === index)
      .sort((a, b) => a - b);

    res.json({ numbers: mergedNumbers });
  } catch (error) {
    console.error(`Error merging numbers: ${error.message}`);
    res.status(500).json({ message: "Error merging numbers" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
