import BollywoodMoodApp from './bollywoodMoodApp.js';

document.addEventListener('DOMContentLoaded', async () => {
    const app = new BollywoodMoodApp();
    await app.initialize();
});
