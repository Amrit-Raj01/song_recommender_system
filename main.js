document.addEventListener('DOMContentLoaded', () => {
    const recommender = new SongRecommender(BollywoodSongsDB);
    new UIController(recommender);
});
