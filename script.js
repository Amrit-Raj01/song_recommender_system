// ... (keep existing SongRecommender class code)

function recommendSongs(mood) {
    const results = recommender.recommend(mood);
    const container = document.getElementById('results');
    
    if (results.length === 0) {
        container.innerHTML = `<p class="no-results">No songs found for ${mood} mood</p>`;
        return;
    }

    container.innerHTML = results.map(song => `
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
    `).join('');
}

function getEmoji(mood) {
    const emojis = {
        happy: '😊',
        sad: '😢',
        romantic: '❤️',
        energetic: '⚡'
    };
    return emojis[mood] || '🎵';
}
