class SongRecommender {
    constructor() {
        this.songs = this.loadSongs();
        this.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        this.currentCategory = 'all';
        this.searchQuery = '';
        this.currentSong = null;
        
        this.initElements();
        this.renderSongs();
        this.setupEventListeners();
    }
    
    initElements() {
        this.audioPlayer = document.getElementById('audio');
        this.songsContainer = document.getElementById('songs-container');
        this.searchInput = document.getElementById('search');
        this.searchBtn = document.getElementById('search-btn');
        this.favoritesModal = document.getElementById('favorites-modal');
        this.favoritesList = document.getElementById('favorites-list');
    }
    
    loadSongs() {
        return [
            // Romantic Songs
            { id: 1, title: "Tum Hi Ho", artist: "Arijit Singh", category: "romantic", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", imageSrc: "https://i.pinimg.com/736x/d7/3d/7e/d73d7ead0c697367c39d5b4426a9e9e3.jpg" },
            { id: 2, title: "Tera Ban Jaunga", artist: "Akhil Sachdeva", category: "romantic", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", imageSrc: "https://i.pinimg.com/736x/0c/d4/1d/0cd41dc9d349dafbeb663827a7620fd5.jpg" },
            { id: 3, title: "Raabta", artist: "Arijit Singh", category: "romantic", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", imageSrc: "https://i.pinimg.com/736x/f0/25/8a/f0258a86a18696f3d75b189880aee77e.jpg" },
            { id: 4, title: "Pehla Nasha", artist: "Udit Narayan", category: "romantic", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", imageSrc: "https://i.pinimg.com/736x/6e/b3/a0/6eb3a04918759e38125702e0b53cce2c.jpg" },
            { id: 5, title: "Tum Se Hi", artist: "Mohit Chauhan", category: "romantic", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", imageSrc: "https://i.pinimg.com/736x/a9/a7/06/a9a706eefa9d4b2003b2bb165c96acdd.jpg" },
            { id: 6, title: "Mere Haath Mein", artist: "Sonu Nigam", category: "romantic", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", imageSrc: "https://i.pinimg.com/736x/c8/9f/92/c89f920b5ac329d0695f5855b693b631.jpg" },
            { id: 7, title: "Ae Dil Hai Mushkil", artist: "Arijit Singh", category: "romantic", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", imageSrc: "https://i.pinimg.com/736x/cd/03/00/cd0300f56fe190ac4ea44fd145f66a7b.jpg" },
            { id: 8, title: "Tujhe Kitna Chahne Lage", artist: "Arijit Singh", category: "romantic", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", imageSrc: "https://i.pinimg.com/736x/3c/fc/ea/3cfcea67db2946a610a5c5f52488e1e4.jpg" },
            { id: 9, title: "Tere Bina", artist: "A.R. Rahman", category: "romantic", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", imageSrc: "https://i.pinimg.com/736x/5c/fa/05/5cfa05eb5115abc61cfcdf73b74e634b.jpg" },
            { id: 10, title: "Mere Bina", artist: "Pritam", category: "romantic", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", imageSrc: "https://i.pinimg.com/736x/3c/f4/2a/3cf42ad5bcbc67e57140d22ae7b1c81c.jpg" },
            
            // Party Songs
            { id: 11, title: "Badtameez Dil", artist: "Benny Dayal", category: "party", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", imageSrc: "https://i.pinimg.com/736x/c3/b6/00/c3b600356afd046eb1fd068631f4e2ce.jpg" },
            { id: 12, title: "DJ Waley Babu", artist: "Badshah", category: "party", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", imageSrc: "https://i.pinimg.com/736x/1f/37/5e/1f375ecae697497544a5a9d6016fa509.jpg" },
            { id: 13, title: "Kar Gayi Chull", artist: "Badshah", category: "party", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3", imageSrc: "https://i.pinimg.com/736x/83/88/bb/8388bbb3fd8f44f5c0c0ef7e744252ad.jpg" },
            { id: 14, title: "Sooraj Dooba Hain", artist: "Arijit Singh", category: "party", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3", imageSrc: "https://i.pinimg.com/736x/e8/7a/a9/e87aa9e69106dc4a9f72251d49f3f9a5.jpg" },
            { id: 15, title: "The Disco Song", artist: "Vishal Dadlani", category: "party", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3", imageSrc: "https://i.pinimg.com/736x/c1/75/20/c17520775a2ae475a0ee1b836ae19ad7.jpg" },
            { id: 16, title: "Bang Bang", artist: "Benny Dayal", category: "party", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3", imageSrc: "https://i.pinimg.com/736x/0d/0b/fb/0d0bfbdef1e3d0a01b828f2d2f5e806c.jpg" },
            { id: 17, title: "Gandi Baat", artist: "Raftaar", category: "party", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3", imageSrc: "https://i.pinimg.com/736x/c7/87/e4/c787e4a995fa9307f8ac01f1843432d7.jpg" },
            { id: 18, title: "Lungi Dance", artist: "Yo Yo Honey Singh", category: "party", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-18.mp3", imageSrc: "https://i.pinimg.com/736x/91/fb/f1/91fbf12b6bd98150eeab00a5e2b42956.jpg" },
            { id: 19, title: "High Heels", artist: "Yo Yo Honey Singh", category: "party", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-19.mp3", imageSrc: "https://i.pinimg.com/736x/eb/33/09/eb3309b0fcb7abe66ac6b9b3b14914f3.jpg" },
            { id: 20, title: "Party All Night", artist: "Yo Yo Honey Singh", category: "party", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-20.mp3", imageSrc: "https://i.pinimg.com/736x/16/2c/b0/162cb099e8f943e32f43fd7251c7a0a6.jpg" },
            
            // Sad Songs
            { id: 21, title: "Channa Mereya", artist: "Arijit Singh", category: "sad", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-21.mp3", imageSrc: "https://i.pinimg.com/736x/df/9e/c0/df9ec020dfb73812526e495afa4d2ae8.jpg" },
            { id: 22, title: "Tum Ho", artist: "Mohit Chauhan", category: "sad", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-22.mp3", imageSrc: "https://i.pinimg.com/736x/29/ce/5f/29ce5fe316c5607c6c264d3faf382c88.jpg" },
            { id: 23, title: "Phir Bhi Tumko Chaahunga", artist: "Arijit Singh", category: "sad", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-23.mp3", imageSrc: "https://i.pinimg.com/736x/86/f7/72/86f77230fcc48e38aa2e72740c32d3e0.jpg" },
            { id: 24, title: "Agar Tum Saath Ho", artist: "Alka Yagnik", category: "sad", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-24.mp3", imageSrc: "https://i.pinimg.com/736x/50/6e/76/506e76054640c2045a4928947abb2435.jpg" },
            { id: 25, title: "Tujhse Naraz Nahi Zindagi", artist: "Lata Mangeshkar", category: "sad", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-25.mp3", imageSrc: "https://i.pinimg.com/736x/48/d0/c7/48d0c76604027f7f55a5d411b7b150e5.jpg" },
            { id: 26, title: "Tere Bina Zindagi Se", artist: "Lata Mangeshkar", category: "sad", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-26.mp3", imageSrc: "images/sad.jpg" },
            { id: 27, title: "Kabira", artist: "Tochi Raina", category: "sad", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-27.mp3", imageSrc: "https://i.pinimg.com/736x/48/d0/c7/48d0c76604027f7f55a5d411b7b150e5.jpg" },
            { id: 28, title: "Jeene Laga Hoon", artist: "Atif Aslam", category: "sad", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-28.mp3", imageSrc: "images/sad.jpg" },
            { id: 29, title: "Tere Liye", artist: "Lata Mangeshkar", category: "sad", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-29.mp3", imageSrc: "images/sad.jpg" },
            { id: 30, title: "Kal Ho Naa Ho", artist: "Sonu Nigam", category: "sad", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-30.mp3", imageSrc: "images/sad.jpg" },
            
            // Workout Songs
            { id: 31, title: "Sadda Haq", artist: "Ranbir Kapoor", category: "workout", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-31.mp3", imageSrc: "https://i.pinimg.com/736x/6d/06/38/6d06389b40ed85976fef375593e181cd.jpg" },
            { id: 32, title: "Zinda", artist: "Siddharth Mahadevan", category: "workout", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-32.mp3", imageSrc: "https://i.pinimg.com/736x/4e/97/c8/4e97c818d7d5fd8a1c38ff67378b0a4b.jpg" },
            { id: 33, title: "Malang", artist: "Ved Sharma", category: "workout", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-33.mp3", imageSrc: "https://i.pinimg.com/736x/4a/83/8b/4a838bfdb59a82016ea5f8ce327b789c.jpg" },
            { id: 34, title: "Brothers Anthem", artist: "Vishal Dadlani", category: "workout", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-34.mp3", imageSrc: "https://i.pinimg.com/736x/4c/52/6b/4c526bdade4c96a633313b18cb3659ed.jpg" },
            { id: 35, title: "Jai Ho", artist: "A.R. Rahman", category: "workout", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-35.mp3", imageSrc: "https://i.pinimg.com/736x/df/99/b6/df99b61beb45daacd196b98b0b67cc3c.jpg" },
            { id: 36, title: "Chak De India", artist: "Sukhwinder Singh", category: "workout", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-36.mp3", imageSrc: "https://i.pinimg.com/736x/ec/df/42/ecdf42a20da15a019df7198542368006.jpg" },
            { id: 37, title: "Bhaag Milkha Bhaag", artist: "Shankar Mahadevan", category: "workout", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-37.mp3", imageSrc: "images/workout.jpg" },
            { id: 38, title: "Kar Har Maidan Fateh", artist: "Sukhwinder Singh", category: "workout", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-38.mp3", imageSrc: "images/workout.jpg" },
            { id: 39, title: "Dangal", artist: "Daler Mehndi", category: "workout", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-39.mp3", imageSrc: "images/workout.jpg" },
            { id: 40, title: "Singh Is Kinng", artist: "Suzanne D'Mello", category: "workout", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-40.mp3", imageSrc: "images/workout.jpg" },
            
            // Devotional Songs
            { id: 41, title: "Om Jai Jagdish Hare", artist: "Anuradha Paudwal", category: "devotional", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-41.mp3", imageSrc: "https://i.pinimg.com/736x/f4/bc/d3/f4bcd385442a96eba33909b1c9a3a1c7.jpg" },
            { id: 42, title: "Hanuman Chalisa", artist: "Hariharan", category: "devotional", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-42.mp3", imageSrc: "https://i.pinimg.com/736x/0b/9e/a1/0b9ea183c0a9d4e16423301a14d620bf.jpg" },
            { id: 43, title: "Shiv Tandav Stotram", artist: "Uma Mohan", category: "devotional", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-43.mp3", imageSrc: "https://i.pinimg.com/736x/ae/8b/22/ae8b22bba0c4143cf7c0ec1f7e5f46d2.jpg" },
            { id: 44, title: "Gayatri Mantra", artist: "Anuradha Paudwal", category: "devotional", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-44.mp3", imageSrc: "https://i.pinimg.com/736x/0f/7c/ab/0f7cab1285ce9da7cf59c1a7a8f63016.jpg" },
            { id: 45, title: "Jai Ganesh Deva", artist: "Anuradha Paudwal", category: "devotional", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-45.mp3", imageSrc: "https://i.pinimg.com/736x/fd/87/31/fd87318666eaad13b9c8adb66c9e80de.jpg" },
            { id: 46, title: "Aigiri Nandini", artist: "Shreya Ghoshal", category: "devotional", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-46.mp3", imageSrc: "https://i.pinimg.com/736x/07/99/9e/07999ee89f46f429fa1b573d1885a9e3.jpg" },
            { id: 47, title: "Vaishnav Jan To", artist: "K.S. Chithra", category: "devotional", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-47.mp3", imageSrc: "https://i.pinimg.com/736x/42/5c/92/425c92b44078140e32814bb5a11c0cbf.jpg" },
            { id: 48, title: "Shree Krishna Govind", artist: "Anuradha Paudwal", category: "devotional", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-48.mp3", imageSrc: "https://i.pinimg.com/736x/0a/b9/4a/0ab94a342bcad25131c2fec3daa6b0d5.jpg" },
            { id: 49, title: "Jai Santoshi Maa", artist: "Anuradha Paudwal", category: "devotional", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-49.mp3", imageSrc: "https://i.pinimg.com/736x/90/2b/c3/902bc3cab25113d1cdf757d2d0cdfeb6.jpg" },
            { id: 50, title: "Durga Chalisa", artist: "Anuradha Paudwal", category: "devotional", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-50.mp3", imageSrc: "images/devotional.jpg" }
        ];
    }
    
    renderSongs() {
        this.songsContainer.innerHTML = '';
        
        const filteredSongs = this.songs.filter(song => {
            const matchesCategory = this.currentCategory === 'all' || song.category === this.currentCategory;
            const matchesSearch = song.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                                 song.artist.toLowerCase().includes(this.searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
        
        if (filteredSongs.length === 0) {
            this.songsContainer.innerHTML = '<p class="no-results">No songs found. Try a different search or category.</p>';
            return;
        }
        
        filteredSongs.forEach(song => {
            const isFavorite = this.favorites.includes(song.id);
            const songCard = document.createElement('div');
            songCard.className = 'song-card';
            songCard.dataset.id = song.id;
            
            songCard.innerHTML = `
                <img src="${song.imageSrc}" alt="${song.title}" class="song-img">
                <div class="song-info">
                    <h3>${song.title}</h3>
                    <p>${song.artist}</p>
                    <span class="song-category">${song.category}</span>
                    <div class="song-actions">
                        <button class="play-btn" data-id="${song.id}">
                            <i class="fas fa-play"></i> Play
                        </button>
                        <button class="fav-btn ${isFavorite ? 'favorited' : ''}" data-id="${song.id}">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            `;
            
            this.songsContainer.appendChild(songCard);
        });
    }
    
    setupEventListeners() {
        // Category filter
        document.querySelectorAll('.category-buttons button').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelector('.category-buttons button.active').classList.remove('active');
                btn.classList.add('active');
                this.currentCategory = btn.dataset.category;
                this.renderSongs();
            });
        });
        
        // Search
        this.searchBtn.addEventListener('click', () => {
            this.searchQuery = this.searchInput.value;
            this.renderSongs();
        });
        
        this.searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                this.searchQuery = this.searchInput.value;
                this.renderSongs();
            }
        });
        
        // Play song
        document.addEventListener('click', (e) => {
            if (e.target.closest('.play-btn')) {
                const songId = parseInt(e.target.closest('.play-btn').dataset.id);
                this.playSong(songId);
            }
            
            // Toggle favorite
            if (e.target.closest('.fav-btn')) {
                const btn = e.target.closest('.fav-btn');
                const songId = parseInt(btn.dataset.id);
                this.toggleFavorite(songId, btn);
            }
        });
        
        // Favorites modal
        document.getElementById('show-favorites').addEventListener('click', () => {
            this.showFavoritesModal();
        });
        
        document.querySelector('.close').addEventListener('click', () => {
            this.favoritesModal.style.display = 'none';
        });
        
        // Player favorite button
        document.getElementById('player-fav-btn').addEventListener('click', () => {
            if (this.currentSong) {
                const songId = this.currentSong.id;
                const isNowFavorite = this.toggleFavorite(songId);
                
                // Update all favorite buttons for this song
                document.querySelectorAll(`.fav-btn[data-id="${songId}"]`).forEach(btn => {
                    btn.classList.toggle('favorited', isNowFavorite);
                });
                
                // Update player button
                const playerBtn = document.getElementById('player-fav-btn');
                playerBtn.innerHTML = isNowFavorite ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
                playerBtn.classList.toggle('favorited', isNowFavorite);
            }
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === this.favoritesModal) {
                this.favoritesModal.style.display = 'none';
            }
        });
    }
    
    playSong(songId) {
        const song = this.songs.find(s => s.id === songId);
        if (song) {
            this.currentSong = song;
            this.audioPlayer.src = song.audioSrc;
            this.audioPlayer.play();
            this.updatePlayer();
        }
    }
    
    toggleFavorite(songId, btn = null) {
        const index = this.favorites.indexOf(songId);
        let isNowFavorite;
        
        if (index === -1) {
            this.favorites.push(songId);
            isNowFavorite = true;
        } else {
            this.favorites.splice(index, 1);
            isNowFavorite = false;
        }
        
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
        
        if (btn) {
            btn.classList.toggle('favorited', isNowFavorite);
        }
        
        return isNowFavorite;
    }
    
    updatePlayer() {
        if (!this.currentSong) return;
        
        document.getElementById('now-playing-img').src = this.currentSong.imageSrc;
        document.getElementById('now-playing-title').textContent = this.currentSong.title;
        document.getElementById('now-playing-artist').textContent = this.currentSong.artist;
        
        const isFavorite = this.favorites.includes(this.currentSong.id);
        const playerBtn = document.getElementById('player-fav-btn');
        playerBtn.innerHTML = isFavorite ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
        playerBtn.classList.toggle('favorited', isFavorite);
        
        document.getElementById('player').style.display = 'flex';
    }
    
    showFavoritesModal() {
        this.favoritesList.innerHTML = '';
        
        if (this.favorites.length === 0) {
            this.favoritesList.innerHTML = '<p>You have no favorite songs yet.</p>';
        } else {
            this.favorites.forEach(favId => {
                const song = this.songs.find(s => s.id === favId);
                if (!song) return;
                
                const favSong = document.createElement('div');
                favSong.className = 'favorite-song';
                favSong.innerHTML = `
                    <img src="${song.imageSrc}" alt="${song.title}">
                    <div class="favorite-song-info">
                        <h4>${song.title}</h4>
                        <p>${song.artist}</p>
                    </div>
                    <button class="play-btn" data-id="${song.id}">
                        <i class="fas fa-play"></i>
                    </button>
                `;
                
                this.favoritesList.appendChild(favSong);
            });
        }
        
        this.favoritesModal.style.display = 'flex';
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => new SongRecommender());
