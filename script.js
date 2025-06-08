// Song class using OOP principles
class Song {
    constructor(title, artist, category, year, image) {
        this.title = title;
        this.artist = artist;
        this.category = category;
        this.year = year;
        this.image = image;
        this.isFavorite = false;
    }

    toggleFavorite() {
        this.isFavorite = !this.isFavorite;
    }

    getDisplayInfo() {
        return {
            title: this.title,
            artist: this.artist,
            category: this.category,
            year: this.year,
            image: this.image,
            isFavorite: this.isFavorite
        };
    }
}

// SongRecommender class to manage the song collection
class SongRecommender {
    constructor() {
        this.songs = [];
        this.favorites = new Set();
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.initializeSongs();
    }

    initializeSongs() {
        const songData = [
            // Romantic Songs
            { title: "Tere Bina", artist: "A.R. Rahman", category: "romantic", year: 2007, image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop" },
            { title: "Tum Hi Ho", artist: "Arijit Singh", category: "romantic", year: 2013, image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop" },
            { title: "Jeene Laga Hoon", artist: "Atif Aslam", category: "romantic", year: 2013, image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop" },
            { title: "Raabta", artist: "Arijit Singh", category: "romantic", year: 2012, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop" },
            { title: "Pehla Nasha", artist: "Udit Narayan", category: "romantic", year: 1993, image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop" },
            { title: "Kal Ho Naa Ho", artist: "Sonu Nigam", category: "romantic", year: 2003, image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop" },
            { title: "Suraj Hua Maddham", artist: "Alka Yagnik", category: "romantic", year: 2001, image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop" },

            // Sad Songs
            { title: "Kyun Ho Gaya Na", artist: "Udit Narayan", category: "sad", year: 2004, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop" },
            { title: "Aashiqui Mein", artist: "Kumar Sanu", category: "sad", year: 1990, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop" },
            { title: "Woh Lamhe", artist: "Atif Aslam", category: "sad", year: 2006, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop" },
            { title: "Zara Zara", artist: "Bombay Jayashri", category: "sad", year: 2004, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop" },
            { title: "Judaai", artist: "Hariharan", category: "sad", year: 1997, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop" },
            { title: "Dil Hai Tumhara", artist: "Alka Yagnik", category: "sad", year: 2002, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop" },
            { title: "Alvida", artist: "Rahat Fateh Ali Khan", category: "sad", year: 2010, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop" },

            // Party Songs
            { title: "Nagada Sang Dhol", artist: "Shreya Ghoshal", category: "party", year: 2013, image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=300&fit=crop" },
            { title: "Gallan Goodiyaan", artist: "Yashita Sharma", category: "party", year: 2014, image: "https://images.unsplash.com/photo-1529236183275-4fdcf2bc987e?w=300&h=300&fit=crop" },
            { title: "London Thumakda", artist: "Labh Janjua", category: "party", year: 2014, image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=300&fit=crop" },
            { title: "Malhari", artist: "Vishal Dadlani", category: "party", year: 2015, image: "https://images.unsplash.com/photo-1529236183275-4fdcf2bc987e?w=300&h=300&fit=crop" },
            { title: "Tattad Tattad", artist: "Udit Narayan", category: "party", year: 2013, image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=300&fit=crop" },
            { title: "Ainvayi Ainvayi", artist: "Salim Merchant", category: "party", year: 2009, image: "https://images.unsplash.com/photo-1529236183275-4fdcf2bc987e?w=300&h=300&fit=crop" },
            { title: "Dhoom Machale", artist: "Sunidhi Chauhan", category: "party", year: 2004, image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=300&fit=crop" },

            // Devotional Songs
            { title: "Shiva Tandava", artist: "Hariharan", category: "devotional", year: 2010, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop" },
            { title: "Om Jai Jagdish", artist: "Anuradha Paudwal", category: "devotional", year: 1995, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop" },
            { title: "Hanuman Chalisa", artist: "Hariharan", category: "devotional", year: 2008, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop" },
            { title: "Aigiri Nandini", artist: "Bombay Saradha", category: "devotional", year: 2012, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop" },
            { title: "Vishnu Sahasranamam", artist: "M.S. Subbulakshmi", category: "devotional", year: 1975, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop" },
            { title: "Govind Bolo", artist: "Anup Jalota", category: "devotional", year: 1985, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop" },
            { title: "Shree Ram Chandra", artist: "Lata Mangeshkar", category: "devotional", year: 1988, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop" },

            // Classical Songs
            { title: "Raga Yaman", artist: "Pt. Ravi Shankar", category: "classical", year: 1980, image: "https://images.unsplash.com/photo-1520637836862-4d197d17c892?w=300&h=300&fit=crop" },
            { title: "Bhairav Raag", artist: "Ustad Bismillah Khan", category: "classical", year: 1975, image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop" },
            { title: "Malkauns", artist: "Pt. Jasraj", category: "classical", year: 1985, image: "https://images.unsplash.com/photo-1520637836862-4d197d17c892?w=300&h=300&fit=crop" },
            { title: "Raga Bhimpalasi", artist: "Ustad Rashid Khan", category: "classical", year: 1995, image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop" },
            { title: "Thumri Khamaj", artist: "Begum Akhtar", category: "classical", year: 1970, image: "https://images.unsplash.com/photo-1520637836862-4d197d17c892?w=300&h=300&fit=crop" },
            { title: "Raga Darbari", artist: "Ustad Vilayat Khan", category: "classical", year: 1978, image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop" },
            { title: "Miyan Ki Todi", artist: "Pandit Shivkumar Sharma", category: "classical", year: 1982, image: "https://images.unsplash.com/photo-1520637836862-4d197d17c892?w=300&h=300&fit=crop" }
        ];

        // Create Song objects from data
        this.songs = songData.map(data => 
            new Song(data.title, data.artist, data.category, data.year, data.image)
        );
    }

    // Get all songs
    getAllSongs() {
        return this.songs;
    }

    // Get songs by category
    getSongsByCategory(category) {
        if (category === 'all') {
            return this.songs;
        }
        if (category === 'favorites') {
            return this.songs.filter(song => song.isFavorite);
        }
        return this.songs.filter(song => song.category === category);
    }

    // Search songs
    searchSongs(query) {
        if (!query) return this.getSongsByCategory(this.currentFilter);
        
        const searchTerm = query.toLowerCase();
        const filteredSongs = this.getSongsByCategory(this.currentFilter);
        
        return filteredSongs.filter(song => 
            song.title.toLowerCase().includes(searchTerm) ||
            song.artist.toLowerCase().includes(searchTerm) ||
            song.category.toLowerCase().includes(searchTerm)
        );
    }

    // Toggle favorite status
    toggleFavorite(songTitle) {
        const song = this.songs.find(s => s.title === songTitle);
        if (song) {
            song.toggleFavorite();
            if (song.isFavorite) {
                this.favorites.add(songTitle);
            } else {
                this.favorites.delete(songTitle);
            }
        }
    }

    // Get favorite songs
    getFavorites() {
        return this.songs.filter(song => song.isFavorite);
    }

    // Get song by title
    getSongByTitle(title) {
        return this.songs.find(song => song.title === title);
    }

    // Get total songs count
    getTotalSongs() {
        return this.songs.length;
    }

    // Get favorites count
    getFavoritesCount() {
        return this.getFavorites().length;
    }

    // Get songs count by category
    getCountByCategory(category) {
        return this.getSongsByCategory(category).length;
    }

    // Set current filter
    setFilter(filter) {
        this.currentFilter = filter;
    }

    // Set search query
    setSearchQuery(query) {
        this.searchQuery = query;
    }

    // Get filtered and searched songs
    getFilteredSongs() {
        if (this.searchQuery) {
            return this.searchSongs(this.searchQuery);
        }
        return this.getSongsByCategory(this.currentFilter);
    }
}
