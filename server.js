const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// API endpoint (PROTECTED LINKS)
app.get("/api/episode/:ep", (req, res) => {
  const ep = parseInt(req.params.ep);
  let url = "";

  if (ep >= 1 && ep <= 60) {
    url = `https://dn720706.ca.archive.org/0/items/anime-2.0-5/%F0%9D%97%94%F0%9D%97%BB%F0%9D%97%B6%F0%9D%97%BA%F0%9D%97%B2%20%F0%9D%9F%AE.%F0%9D%9F%AC%20-%20${ep}.mp4`;
  } 
  else if (ep <= 100) {
    url = `https://ia601504.us.archive.org/10/items/anime-2.0-100/%F0%9D%97%94%F0%9D%97%BB%F0%9D%97%B6%F0%9D%97%BA%F0%9D%97%B2%20%F0%9D%9F%AE.%F0%9D%9F%AC%20-%20${ep}.mp4`;
  } 
  else if (ep <= 148) {
    url = `https://ia801509.us.archive.org/29/items/anime-2.0-114/%F0%9D%97%94%F0%9D%97%BB%F0%9D%97%B6%F0%9D%97%BA%F0%9D%97%B2%20%F0%9D%9F%AE.%F0%9D%9F%AC%20-%20${ep}.mp4`;
  } 
  else {
    return res.status(404).json({ error: "Episode not found" });
  }

  // Send URL only when requested
  res.json({ src: url });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
