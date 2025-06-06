import EnhancedSongRecommender from '../services/recommender.js';
import UIController from '../ui/uiController.js';
import BollywoodSongsDB from '../database/bollywoodSongsDB.js';

export default class BollywoodMoodApp {
    constructor() {
        this.recommender = null;
        this.ui = null;
        this.isInitialized = false;
    }

    async initialize() {
        try {
            console.log('Initializing Bollywood Mood Magic...');
            
            this.recommender = new EnhancedSongRecommender(BollywoodSongsDB);
            this.ui = new UIController(this.recommender);
            
            this.setupErrorHandlers();
            await this.loadUserPreferences();
            
            this.isInitialized = true;
            console.log('App initialized successfully!');
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.showCriticalError('Failed to load the application. Please refresh the page.');
        }
    }

    setupErrorHandlers() {
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
        });
    }

    async loadUserPreferences() {
        console.log('Loading user preferences...');
    }

    showCriticalError(message) {
        document.body.innerHTML = `
            <div class="critical-error">
                <h1>Application Error</h1>
                <p>${message}</p>
                <button onclick="location.reload()">Reload Application</button>
            </div>
        `;
    }
}
