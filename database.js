const BollywoodSongsDB = {
    songs: [
        // Happy Songs
        { 
            id: 1, 
            title: "Badtameez Dil", 
            movie: "Yeh Jawaani Hai Deewani", 
            singer: "Benny Dayal", 
            year: 2013, 
            mood: "happy", 
            duration: "4:12",
            audioUrl: "https://example.com/audio/badtameez-dil.mp3" 
        },
        // Add all other songs with audioUrl
        // Example of another song:
        { 
            id: 2, 
            title: "Tum Hi Ho", 
            movie: "Aashiqui 2", 
            singer: "Arijit Singh", 
            year: 2013, 
            mood: "sad", 
            duration: "4:22",
            audioUrl: "https://example.com/audio/tum-hi-ho.mp3" 
        },
        // Continue with all other songs...
    ],

    validateSong(song) {
        const required = ['title', 'movie', 'singer', 'year', 'mood', 'audioUrl'];
        const validMoods = ['happy', 'sad', 'romantic', 'energetic'];
        
        for (let field of required) {
            if (!song[field]) {
                console.warn(`Missing required field: ${field} in song:`, song);
                return false;
            }
        }
        
        if (!validMoods.includes(song.mood.toLowerCase())) {
            console.warn(`Invalid mood: ${song.mood} in song:`, song);
            return false;
        }
        
        if (song.year < 1950 || song.year > new Date().getFullYear()) {
            console.warn(`Invalid year: ${song.year} in song:`, song);
            return false;
        }
        
        return true;
    },

    getAllSongs() {
        return this.songs.filter(song => this.validateSong(song));
    }
};
