const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Simple homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// -------------------
// Episode APIs
// -------------------

// Hunter X Hunter (1-148)
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

// Black Clover (1-102)
app.get("/api/blackclover/:ep", (req, res) => {
  const ep = parseInt(req.params.ep);
  if (!ep || ep < 1 || ep > 102) return res.status(404).json({ error: "Episode not found" });

  const epStr = ep.toString().padStart(2, "0");
  const src = `https://file.garden/Z5iMyklJBX3zDDC5/BClover/Black%20Clover%20S1-Ep${epStr}.mp4`;

  res.json({ src });
});

// Bleach (1-167)
app.get("/api/bleach/:ep", (req, res) => {
  const ep = parseInt(req.params.ep);
  if (!ep || ep < 1 || ep > 167) return res.status(404).json({ error: "Episode not found" });

  // Removed weird encoding for safer URLs
  const src = `https://dn720401.ca.archive.org/0/items/bleach-episode-${ep}/Bleach%20Episode%20${ep}.mp4`;

  res.json({ src });
});

// Catch-all 404 for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start the server
app.listen(port, () => {
  console.log(`Anime server running at http://localhost:${port}`);
});
