// Le fichier principal de l'application, initialise le jeu lorsque la page est chargé
import { Game } from './game.js';

window.onload = () => {
    fetch('https://randomuser.me/api/?nat=fr&results=1000')
        .then(response => response.json())
        .then(data => {
            const highScores = data.results.map(user => ({
                name: `${user.name.first}${user.name.last}`,
                score: Math.floor(Math.random() * 100) + 1
            })).sort((a, b) => b.score - a.score).slice(0, 20);
            localStorage.setItem('highScores', JSON.stringify(highScores));
            const game = new Game();
            game.showHighScores();

            document.querySelectorAll('.difficulty').forEach(button => {
                button.addEventListener('click', () => {
                    const level = button.dataset.level;
                    game.difficulty = level;
                    document.getElementById('currentDifficulty').innerText = `Difficulté : ${level.charAt(0).toUpperCase() + level.slice(1)}`;
                    game.restartGame();
                });
            });
        });
};