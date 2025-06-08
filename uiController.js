class UIController {
    constructor(recommender) {
        this.recommender = recommender;
        this.currentMood = 'all';
        this.initElements();
        this.initEventListeners();
        this.loadSongs();
    }

    initElements() {
        this.elements = {
            moodButtons: document.querySelectorAll('.mood-btn'),
            searchInput: document.getElementById('search-input'),
            searchBtn: document.getElementById('search-btn'),
            resultsContainer: document.getElementById('results'),
            statsContainer: document.getElementById('stats'),
            audioPlayer: document.getElementById('audio-player')
        };
    }

    initEventListeners() {
        this.elements.moodButtons.forEach(btn => {
            btn.addEventListener('click', () => this.handleMoodChange(btn));
        });

        this.elements.searchBtn.addEventListener('click', () => this.handleSearch());
        this.elements.searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });
    }

    handleMoodChange(btn) {
        this.elements.moodButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentMood = btn.dataset.mood;
        this.loadSongs();
    }

    handleSearch() {
        const searchTerm = this.elements.searchInput.value.trim();
        this.loadSongs(searchTerm);
    }

    loadSongs(searchTerm = '') {
        this.showLoading();
        
        setTimeout(() => {
            const songs = this.recommender.recommend(this.currentMood, {
                searchTerm: searchTerm
            });
            
            this.displaySongs(songs);
            this.updateStats(songs.length);
        }, 500);
    }

    showLoading() {
        this.elements.resultsContainer.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>Loading songs...</p>
            </div>
        `;
    }

    displaySongs(songs) {
        if (songs.length === 0) {
            this.elements.resultsContainer.innerHTML = `
                <div class="no-results">
                    <h3>No songs found</h3>
                    <p>Try a different mood or search term.</p>
                </div>
            `;
            return;
        }

        this.elements.resultsContainer.innerHTML = songs.map(song => `
            <div class="song-card" data-id="${song.id}">
                <div class="song-poster" style="background-color: ${this.getMoodColor(song.mood)}">
                    ${this.getMoodEmoji(song.mood)}
                </div>
                <div class="song-info">
                    <h3 class="song-title">${song.title}</h3>
                    <p class="song-movie">${song.movie} (${song.year})</p>
                    <p class="song-singer"><i class="fas fa-microphone"></i> ${song.singer}</p>
                    <p class="song-duration"><i class="fas fa-clock"></i> ${song.duration}</p>
                    
                    <div class="song-controls">
                        <button class="play-btn" data-audio="${song.audioUrl}">
                            <i class="fas fa-play"></i>
                        </button>
                        <div class="progress-container">
                            <div class="progress-bar"></div>
                        </div>
                        <button class="favorite-btn ${this.recommender.isFavorite(song.id) ? 'active' : ''}" 
                                data-id="${song.id}">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Add event listeners to new elements
        document.querySelectorAll('.play-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.playSong(btn.dataset.audio);
            });
        });

        document.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const songId = parseInt(btn.dataset.id);
                const isFavorite = this.recommender.toggleFavorite(songId);
                btn.classList.toggle('active', isFavorite);
            });
        });
    }

    playSong(audioUrl) {
        const audio = this.recommender.playSong(audioUrl);
        
        audio.addEventListener('timeupdate', () => {
            const progress = (audio.currentTime / audio.duration) * 100;
            const progressBar = document.querySelector(`.play-btn[data-audio="${audioUrl}"]`).nextElementSibling.querySelector('.progress-bar');
            if (progressBar) {
                progressBar.style.width = `${progress}%`;
            }
        });
    }

    updateStats(count) {
        this.elements.statsContainer.textContent = `Showing ${count} ${this.currentMood === 'all' ? '' : this.currentMood} songs`;
    }

    getMoodEmoji(mood) {
        const emojis = {
            happy: '😊',
            sad: '😢',
            romantic: '❤️',
            energetic: '⚡'
        };
        return emojis[mood] || '🎵';
    }

    getMoodColor(mood) {
        const colors = {
            happy: '#ffdd59',
            sad: '#a5b1c2',
            romantic: '#ff7675',
            energetic: '#74b9ff'
        };
        return colors[mood] || '#dfe6e9';
    }
}
