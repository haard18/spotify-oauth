const express = require("express");
const cors = require("cors");
const axios = require("axios"); // ✅ Use axios instead of fetch

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON body

// 🎯 Fetch Top Tracks & Followed Artists
app.post("/fetch-data", async (req, res) => {
    const accessToken = req.body.access_token;

    if (!accessToken) {
        return res.status(400).json({ error: "Access token is required" });
    }

    try {
        // 🎵 Fetch User's Top Tracks
        const topTracksResponse = await axios.get("https://api.spotify.com/v1/me/top/tracks?limit=10", {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        // 🎤 Fetch Followed Artists
        const followedArtistsResponse = await axios.get("https://api.spotify.com/v1/me/following?type=artist", {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        res.json({
            // top_tracks: topTracksResponse.data.items || [],
            followed_artists: followedArtistsResponse.data.artists?.items || []
        });

    } catch (error) {
        console.error("Error fetching data:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

// 🎯 Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});
