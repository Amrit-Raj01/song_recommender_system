// Initialize the Song Recommender System
class SongApp {
    constructor() {
        this.recommender = new SongRecommender();
        this.currentSong = null;
        this.initializeEventListeners();
        this.renderSongs();
        this.updateStats();
    }

    initializeEventListeners() {
        // Category buttons
        const categoryBtns = document.querySelectorAll('.category-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleCategoryChange(e.target.dataset.category);
            });
        });

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        
        searchBtn.addEventListener('click', () => {
            this.handleSearch();
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });

        searchInput.addEventListener('input', (e) => {
            if (e.target.value === '') {
                this.recommender.setSearchQuery('');
                this.renderSongs();
            }
        });

        // Modal functionality
        const modal = document.getElementById('songModal');
        const closeBtn = document.querySelector('.close');
        
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Modal favorite button
        const modalFavBtn = document.getElementById('modalFavBtn');
        modalFavBtn.addEventListener('click', () => {
            if (this.currentSong) {
                this.toggleFavorite(this.currentSong.title);
                this.updateModalFavoriteButton();
                this.renderSongs();
                this.updateStats();
            }
        });
    }

    handleCategoryChange(category) {
        // Update active button
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');

        // Update filter and render
        this.recommender.setFilter(category);
        this.renderSongs();
    }

    handleSearch() {
        const searchInput = document.getElementById('searchInput');
        const query = searchInput.value.trim();
        this.recommender.setSearchQuery(query);
        this.renderSongs();
    }

    renderSongs() {
        const container = document.getElementById('songsContainer');
        const songs = this.recommender.getFilteredSongs();

        if (songs.length === 0) {
            container.innerHTML = '<div class="no-results">No songs found matching your criteria.</div>';
            return;
        }

        container.innerHTML = songs.map(song => this.createSongCard(song)).join('');

        // Add event listeners to song cards
        this.attachSongCardListeners();
    }

    createSongCard(song) {
        const heartIcon = song.isFavorite ? 'fas fa-heart' : 'far fa-heart';
        const favoriteClass = song.isFavorite ? 'favorite' : '';

        return `
            <div class="song-card" data-title="${song.title}">
                <button class="fav-btn ${favoriteClass}" data-title="${song.title}">
                    <i class="${heartIcon}"></i>
                </button>
                <span class="category-badge">${song.category}</span>
                <img src="${song.image}" alt="${song.title}" class="song-image">
                <div class="song-info">
                    <h3>${song.title}</h3>
                    <p><strong>Artist:</strong> ${song.artist}</p>
                    <p><strong>Year:</strong> ${song.year}</p>
                    <p><strong>Category:</strong> ${song.category}</p>
                </div>
            </div>
        `;
    }

    attachSongCardListeners() {
        // Song card click listeners
        const songCards = document.querySelectorAll('.song-card');
        songCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.fav-btn')) {
                    const title = card.dataset.title;
                    this.showSongModal(title);
                }
            });
        });

        // Favorite button listeners
        const favBtns = document.querySelectorAll('.fav-btn');
        favBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const title = btn.dataset.title;
                this.toggleFavorite(title);
                this.renderSongs();
                this.updateStats();
            });
        });
    }

    showSongModal(title) {
        const song = this.recommender.getSongByTitle(title);
        if (!song) return;

        this.currentSong = song;
        
        // Update modal content
        document.getElementById('modalImage').src = song.image;
        document.getElementById('modalTitle').textContent = song.title;
        document.getElementById('modalArtist').innerHTML = `<strong>Artist:</strong> ${song.artist}`;
        document.getElementById('modalCategory').innerHTML = `<strong>Category:</strong> ${song.category}`;
        document.getElementById('modalYear').innerHTML = `<strong>Year:</strong> ${song.year}`;
        
        this.updateModalFavoriteButton();
        
        // Show modal
        document.getElementById('songModal').style.display = 'block';
    }

    updateModalFavoriteButton() {
        const modalFavBtn = document.getElementById('modalFavBtn');
        if (this.currentSong && this.currentSong.isFavorite) {
            modalFavBtn.innerHTML = '<i class="fas fa-heart"></i> Remove from Favorites';
            modalFavBtn.style.background = '#ff6b6b';
            modalFavBtn.style.color = 'white';
        } else {
            modalFavBtn.innerHTML = '<i class="far fa-heart"></i> Add to Favorites';
            modalFavBtn.style.background = '#667eea';
            modalFavBtn.style.color = 'white';
        }
    }

    toggleFavorite(title) {
        this.recommender.toggleFavorite(title);
    }

    updateStats() {
        document.getElementById('totalSongs').textContent = this.recommender.getTotalSongs();
        document.getElementById('totalFavorites').textContent = this.recommender.getFavoritesCount();
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SongApp();
});
