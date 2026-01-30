const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Serve all files in public
app.use(express.static(path.join(__dirname, "public")));

// Optional: redirect root to index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Your APIs here
// e.g., Hunter X Hunter
app.get("/api/hxh/:ep", (req, res) => {
  const ep = parseInt(req.params.ep);
  if (!ep || ep < 1 || ep > 148) return res.status(404).json({ error: "Episode not found" });

  let src = "";
  if (ep <= 60) {
    src = `https://dn720706.ca.archive.org/0/items/anime-2.0-5/HunterXHunter-${ep}.mp4`;
  } else if (ep <= 100) {
    src = `https://ia601504.us.archive.org/10/items/anime-2.0-100/HunterXHunter-${ep}.mp4`;
  } else {
    src = `https://ia801509.us.archive.org/29/items/anime-2.0-114/HunterXHunter-${ep}.mp4`;
  }

  res.json({ src });
});

// Black Clover
app.get("/api/blackclover/:ep", (req, res) => {
  const ep = parseInt(req.params.ep);
  if (!ep || ep < 1 || ep > 102) return res.status(404).json({ error: "Episode not found" });

  const epStr = ep.toString().padStart(2, "0");
  const src = `https://file.garden/Z5iMyklJBX3zDDC5/BClover/Black%20Clover%20S1-Ep${epStr}.mp4`;

  res.json({ src });
});

// Bleach
app.get("/api/bleach/:ep", (req, res) => {
  const ep = parseInt(req.params.ep);
  if (!ep || ep < 1 || ep > 102) return res.status(404).json({ error: "Episode not found" });

  const epStr = ep.toString().padStart(2, "0");
  const src = `https://dn720401.ca.archive.org/0/items/bleach-episode-166/Bleach%20Episode%20${ep}.mp4`;
  res.json({ src });
});

// Start server
app.listen(port, () => {
  console.log(`Anime server running at http://localhost:${port}`);
});
