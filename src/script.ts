const clientId = "965e50908f3d482aae1da55191ef3f5a"; 
const redirectUri = "http://127.0.0.1:5173"; 
const scope = "user-top-read user-follow-read";

async function loginWithSpotify() {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;
    window.location.href = authUrl;
}

async function fetchTopTracks() {
    const accessToken = getAccessTokenFromUrl();
    if (!accessToken) {
        alert("You need to log in first!");
        return;
    }

    const response = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=10", {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    const data = await response.json();
    displayTracks(data.items);
}

function getAccessTokenFromUrl() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    return params.get("access_token");
}

function displayTracks(tracks) {
    const trackDiv = document.getElementById("tracks");
    trackDiv.innerHTML = "<h2>Your Top Tracks</h2>";

    tracks.forEach(track => {
        trackDiv.innerHTML += `
            <p>
                <img src="${track.album.images[0].url}" alt="Album Art">
                <strong>${track.name}</strong> by ${track.artists.map(artist => artist.name).join(", ")}
                <br>
                <a href="${track.external_urls.spotify}" target="_blank">Listen on Spotify</a>
            </p>
            <hr>
        `;
    });
}
// http://127.0.0.1:5173/#access_token=BQAgH2jy3m1NFXtB0H_So0hH5v3cHyzg76OfhcX5jadn6U4dQLVULa1a7JcxbRo6bK8ptnOsEveg5anVCyHvFeLa4mNcwlVmJrzA-__jJ4HWU0QP5QszcWvtklSWl8HNX45_WmJEfW06FfqBoh8ualy6mO89Tm_1O6X6ixk0HOX8ZsctmLY4AtKVEgSnR_aIkzB8Yz0N2b4NIk5Sqe1YQSMjXpy7jeGd6ZBP4LzBg9BwCdSm&token_type=Bearer&expires_in=3600