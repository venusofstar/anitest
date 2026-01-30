const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Serve static files from public folder
app.use(express.static("public"));

// -------------------
// Episode APIs
// -------------------

// Hunter X Hunter
app.get("/api/hxh/:ep", (req, res) => {
  const ep = parseInt(req.params.ep);
  if(!ep || ep < 1 || ep > 148) return res.status(404).json({error:"Episode not found"});
  
  let src = "";
  if(ep <= 60){
    src = `https://dn720706.ca.archive.org/0/items/anime-2.0-5/HunterXHunter-${ep}.mp4`;
  } else if(ep <= 100){
    src = `https://ia601504.us.archive.org/10/items/anime-2.0-100/HunterXHunter-${ep}.mp4`;
  } else {
    src = `https://ia801509.us.archive.org/29/items/anime-2.0-114/HunterXHunter-${ep}.mp4`;
  }
  
  res.json({ src });
});

// Black Clover / Naruto example
app.get("/api/blackclover/:ep", (req, res) => {
  const ep = parseInt(req.params.ep);
  const episodes = {
    1: "https://file.garden/Z5iMyklJBX3zDDC5/BClover/Black%20Clover%20S1-Ep01.mp4",
    2: "https://file.garden/Z5iMyklJBX3zDDC5/BClover/Black%20Clover%20S1-Ep102.mp4"
    // Add more episodes here
  };
  
  if(!episodes[ep]) return res.status(404).json({error:"Episode not found"});
  
  res.json({ src: episodes[ep] });
});

// Start server
app.listen(port, () => {
  console.log(`Anime server running at http://localhost:${port}`);
});
