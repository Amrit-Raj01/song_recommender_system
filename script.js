class SongRecommender {
    constructor() {
        this.songs = [
            // Paste ALL your songs from songs.json here
            // Example:
            {
                "title": "Badtameez Dil",
                "movie": "Yeh Jawaani Hai Deewani",
                "singer": "Benny Dayal",
                "year": 2013,
                "mood": "happy"
            },
            // ... add all other songs manually
        ];
    }

    recommend(mood) {
        return this.songs.filter(song => song.mood === mood);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.recommender = new SongRecommender();
});

function recommendSongs(mood) {
    const results = window.recommender.recommend(mood);
    const container = document.getElementById('results');
    
    container.innerHTML = results.length 
        ? results.map(song => `
            <div class="song-card">
                <div class="song-poster">${getEmoji(mood)}</div>
                <div class="song-info">
                    <div class="song-title">${song.title}</div>
                    <div class="song-movie">${song.movie}</div>
                    <div>
                        <span class="song-year">${song.year}</span>
                        <span style="float:right">🎤 ${song.singer}</span>
                    </div>
                </div>
            </div>
        `).join('')
        : `<p class="no-results">No ${mood} songs found. Try another mood!</p>`;
}
