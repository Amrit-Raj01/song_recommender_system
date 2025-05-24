// Song Recommender Class (OOP Implementation)
class SongRecommender {
    constructor() {
        this.songs = [];
        this.loadSongs();
    }

    async loadSongs() {
        const response = await fetch('assets/songs.json');
        this.songs = await response.json();
    }

    recommend(mood) {
        return this.songs.filter(song => song.mood === mood);
    }
}

// Initialize Recommender
const recommender = new SongRecommender();

// UI Handler
function recommendSongs(mood) {
    const results = recommender.recommend(mood);
    const container = document.getElementById('results');
    
    if (results.length === 0) {
        container.innerHTML = `<p>No songs found for ${mood} mood</p>`;
        return;
    }

    container.innerHTML = results.map(song => `
        <div class="song-card">
            <div class="song-title">${song.title}</div>
            <div class="song-movie">From: ${song.movie} (${song.year})</div>
        </div>
    `).join('');
}
