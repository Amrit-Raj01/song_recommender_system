class SongRecommender {
    constructor(database) {
        this.database = database;
        this.songs = database.getAllSongs();
        this.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        this.currentAudio = null;
    }

    recommend(mood = 'all', options = {}) {
        let results = [...this.songs];
        
        if (mood !== 'all') {
            results = results.filter(song => song.mood === mood);
        }

        if (options.searchTerm) {
            const term = options.searchTerm.toLowerCase();
            results = results.filter(song => 
                song.title.toLowerCase().includes(term) ||
                song.movie.toLowerCase().includes(term) ||
                song.singer.toLowerCase().includes(term)
            );
        }

        if (options.shuffle) {
            results = this.shuffleArray(results);
        }

        if (options.limit) {
            results = results.slice(0, options.limit);
        }

        return results;
    }

    shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    toggleFavorite(songId) {
        const index = this.favorites.indexOf(songId);
        if (index > -1) {
            this.favorites.splice(index, 1);
        } else {
            this.favorites.push(songId);
        }
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
        return !(index > -1);
    }

    isFavorite(songId) {
        return this.favorites.includes(songId);
    }

    playSong(audioUrl) {
        if (this.currentAudio) {
            this.currentAudio.pause();
        }
        this.currentAudio = new Audio(audioUrl);
        this.currentAudio.play();
        return this.currentAudio;
    }
}
