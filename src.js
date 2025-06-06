// Enhanced Bollywood Songs Database with Data Validation
const BollywoodSongsDB = {
    // Validated song data with proper structure
    songs: [
        // Happy Songs
        { id: 1, title: "Badtameez Dil", movie: "Yeh Jawaani Hai Deewani", singer: "Benny Dayal", year: 2013, mood: "happy", duration: "4:12" },
        { id: 2, title: "Gallan Goodiyaan", movie: "Dil Dhadakne Do", singer: "Various Artists", year: 2015, mood: "happy", duration: "3:45" },
        // ... (all other songs from your original code)
    ],

    // Data validation methods
    validateSong(song) {
        const required = ['title', 'movie', 'singer', 'year', 'mood'];
        const validMoods = ['happy', 'sad', 'romantic', 'energetic'];
        
        for (let field of required) {
            if (!song[field]) {
                throw new Error(`Missing required field: ${field}`);
            }
        }
        
        if (!validMoods.includes(song.mood.toLowerCase())) {
            throw new Error(`Invalid mood: ${song.mood}. Must be one of: ${validMoods.join(', ')}`);
        }
        
        if (song.year < 1950 || song.year > new Date().getFullYear()) {
            throw new Error(`Invalid year: ${song.year}`);
        }
        
        return true;
    },

    // Get all songs with validation
    getAllSongs() {
        return this.songs.filter(song => {
            try {
                return this.validateSong(song);
            } catch (error) {
                console.warn(`Invalid song data:`, song, error.message);
                return false;
            }
        });
    }
};

export default BollywoodSongsDB;
