
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// ================= HOME =================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ================= ANIME MOVIES =================
const animeMovies = {
  silentvoice: {
    title: "A Silent Voice - Tagalog Dubbed",
    src: "https://dn720404.ca.archive.org/0/items/perfect-scholarship/Perfect%20Scholarship.mp4"
  },
  yourname: {
    title: "Your Name - Tagalog Dubbed",
    src: "https://dn720409.ca.archive.org/0/items/yur-ne-m/YUr-NeM.mp4"
  },
  weathering: {
    title: "Weathering With You - Tagalog Dubbed",
    src: "https://dn720406.ca.archive.org/0/items/wwthiyou_202301/wwthiYOU.mp4"
  },
  hxhphantom: {
    title: "Hunter × Hunter: Phantom Rouge - Tagalog Dubbed",
    src: "https://ia804501.us.archive.org/2/items/yur-ne-m/hter2x%20Ph%C3%B1tom%20ROG.mp4"
  },
  hxhlastmission: {
    title: "Hunter X Hunter: The Last Mission - Tagalog Dubbed",
    src: "https://dn720409.ca.archive.org/0/items/yur-ne-m/Ha%C3%B1ta2x%20LstMisyo%C3%B1.mp4"
  }
};

app.get("/api/movie/:id", (req, res) => {
  const movie = animeMovies[req.params.id];
  if (!movie) return res.status(404).json({ error: "Movie not found" });
  res.json(movie);
});

// ================= ANIME SERIES =================

// Hunter X Hunter
app.get("/api/hxh/:ep", (req, res) => {
  const ep = parseInt(req.params.ep);
  if (!ep || ep < 1 || ep > 148) return res.status(404).json({ error: "Episode not found" });

  let src = "";
  if (ep <= 60) {
    src = `https://dn720706.ca.archive.org/0/items/anime-2.0-5/%F0%9D%97%94%F0%9D%97%BB%F0%9D%97%B6%F0%9D%97%BA%F0%9D%97%B2%20%F0%9D%9F%AE.%F0%9D%9F%AC%20-%20${ep}.mp4`;
  } else if (ep <= 100) {
    src = `https://ia601504.us.archive.org/10/items/anime-2.0-100/%F0%9D%97%94%F0%9D%97%BB%F0%9D%97%B6%F0%9D%97%BA%F0%9D%97%B2%20%F0%9D%9F%AE.%F0%9D%9F%AC%20-%20${ep}.mp4`;
  } else {
    src = `https://ia801509.us.archive.org/29/items/anime-2.0-114/%F0%9D%97%94%F0%9D%97%BB%F0%9D%97%B6%F0%9D%97%BA%F0%9D%97%B2%20%F0%9D%9F%AE.%F0%9D%9F%AC%20-%20${ep}.mp4`;
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
  if (!ep || ep < 1 || ep > 167) return res.status(404).json({ error: "Episode not found" });

  const src = ep < 10
    ? `https://dn720401.ca.archive.org/0/items/ble-ach-episode-166/BL%E1%B4%87ACh%20Episode%200${ep}.mp4`
    : `https://dn720401.ca.archive.org/0/items/ble-ach-episode-166/BL%E1%B4%87ACh%20Episode%20${ep}.mp4`;

  res.json({ src });
});

// Doraemon story
app.get("/api/doraemonseries/:ep", (req, res) => {
  const ep = parseInt(req.params.ep);
  if (!ep || ep < 1 || ep > 102) return res.status(404).json({ error: "Episode not found" });

  const epStr = ep.toString().padStart(2, "0");
  const src = `https://dn720308.ca.archive.org/0/items/draem-0-n-32/DRaem0N-${epStr}.mp4`;
  res.json({ src });
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
