// Complete Bollywood song database
const bollywoodSongs = [
    // Happy Songs
    { title: "Badtameez Dil", movie: "Yeh Jawaani Hai Deewani", singer: "Benny Dayal", year: 2013, mood: "happy" },
    { title: "Gallan Goodiyaan", movie: "Dil Dhadakne Do", singer: "Various Artists", year: 2015, mood: "happy" },
    { title: "Senorita", movie: "Zindagi Na Milegi Dobara", singer: "Vishal Dadlani", year: 2011, mood: "happy" },
    { title: "Balam Pichkari", movie: "Yeh Jawaani Hai Deewani", singer: "Vishal Dadlani", year: 2013, mood: "happy" },
    { title: "London Thumakda", movie: "Queen", singer: "Labh Janjua", year: 2014, mood: "happy" },
    { title: "Ghoomar", movie: "Padmaavat", singer: "Shreya Ghoshal", year: 2018, mood: "happy" },
    { title: "Kar Gayi Chull", movie: "Kapoor & Sons", singer: "Badshah", year: 2016, mood: "happy" },

    // Sad Songs
    { title: "Tum Hi Ho", movie: "Aashiqui 2", singer: "Arijit Singh", year: 2013, mood: "sad" },
    { title: "Channa Mereya", movie: "Ae Dil Hai Mushkil", singer: "Arijit Singh", year: 2016, mood: "sad" },
    { title: "Kabira", movie: "Yeh Jawaani Hai Deewani", singer: "Tochi Raina", year: 2013, mood: "sad" },
    { title: "Agar Tum Saath Ho", movie: "Tamasha", singer: "Alka Yagnik", year: 2015, mood: "sad" },
    { title: "Phir Le Aya Dil", movie: "Barfi!", singer: "Arijit Singh", year: 2012, mood: "sad" },
    { title: "Teri Mitti", movie: "Kesari", singer: "B Praak", year: 2019, mood: "sad" },
    { title: "Kal Ho Naa Ho", movie: "Kal Ho Naa Ho", singer: "Sonu Nigam", year: 2003, mood: "sad" },

    // Romantic Songs
    { title: "Tum Se Hi", movie: "Jab We Met", singer: "Mohit Chauhan", year: 2007, mood: "romantic" },
    { title: "Pehla Nasha", movie: "Jo Jeeta Wohi Sikandar", singer: "Udit Narayan", year: 1992, mood: "romantic" },
    { title: "Tere Bina", movie: "Guru", singer: "A.R. Rahman", year: 2007, mood: "romantic" },
    { title: "Tum Hi Aana", movie: "Marjaavaan", singer: "Jubin Nautiyal", year: 2019, mood: "romantic" },
    { title: "Raabta", movie: "Agent Vinod", singer: "Arijit Singh", year: 2012, mood: "romantic" },
    { title: "Mere Haath Mein", movie: "Fanaa", singer: "Sonu Nigam", year: 2006, mood: "romantic" },
    { title: "Ae Dil Hai Mushkil", movie: "Ae Dil Hai Mushkil", singer: "Arijit Singh", year: 2016, mood: "romantic" },

    // Energetic Songs
    { title: "Malang", movie: "Malang", singer: "Ved Sharma", year: 2020, mood: "energetic" },
    { title: "Kar Gayi Chull", movie: "Kapoor & Sons", singer: "Badshah", year: 2016, mood: "energetic" },
    { title: "Bhaag DK Bose", movie: "Delhi Belly", singer: "Ram Sampath", year: 2011, mood: "energetic" },
    { title: "Dangal", movie: "Dangal", singer: "Daler Mehndi", year: 2016, mood: "energetic" },
    { title: "Jai Ho", movie: "Slumdog Millionaire", singer: "A.R. Rahman", year: 2008, mood: "energetic" },
    { title: "Singh Is King", movie: "Singh Is Kinng", singer: "Labh Janjua", year: 2008, mood: "energetic" },
    { title: "Maston Ka Jhund", movie: "Bhaag Milkha Bhaag", singer: "Shankar Mahadevan", year: 2013, mood: "energetic" }
];

// Song recommender class
class SongRecommender {
    constructor(songs) {
        this.songs = songs;
    }

    recommend(mood) {
        return this.songs.filter(song => 
            song.mood.toLowerCase() === mood.toLowerCase()
        );
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    const recommender = new SongRecommender(bollywoodSongs);
    
    // Connect buttons
    document.querySelectorAll('.mood-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const mood = this.getAttribute('data-mood');
            showSongsForMood(mood, recommender);
        });
    });
});

function showSongsForMood(mood, recommender) {
    const results = recommender.recommend(mood);
    const container = document.getElementById('results');
    
    if (results.length === 0) {
        container.innerHTML = `<div class="error">No songs found for ${mood} mood</div>`;
        return;
    }

    container.innerHTML = results.map(song => `
        <div class="song-card">
            <div class="song-poster">${getMoodEmoji(mood)}</div>
            <div class="song-info">
                <h3>${song.title}</h3>
                <p>${song.movie} (${song.year})</p>
                <p>🎤 ${song.singer}</p>
            </div>
        </div>
    `).join('');
}

function getMoodEmoji(mood) {
    const emojis = {
        happy: '😊',
        sad: '😢',
        romantic: '❤️',
        energetic: '⚡'
    };
    return emojis[mood.toLowerCase()] || '🎵';
}
