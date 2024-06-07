// Logique principale du jeu : mouvement, collision, gestion des scores, etc.
import { Snake } from './snake.js';
import { generateFood, generateObstacles, generateBonus } from './utils.js';
import { Sound } from './sound.js';

export class Game {
    constructor(difficulty = 'moyen') {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.restartButton = document.getElementById('restartButton');
        this.restartButton.addEventListener('click', this.restartGame.bind(this));

        this.difficulties = {
            facile: 150,
            moyen: 100,
            difficile: 50
        };

        this.difficulty = difficulty;

        document.querySelectorAll('.difficulty').forEach(button => {
            button.addEventListener('click', (e) => {
                this.difficulty = e.target.dataset.level;
                document.getElementById('currentDifficulty').innerText = `Difficulté : ${this.difficulty.charAt(0).toUpperCase() + this.difficulty.slice(1)}`;
                this.restartGame();
            });
        });

        this.eatSound = new Sound('sounds/eat.wav');
        this.collisionSound = new Sound('sounds/collision.wav');
        this.boostSound = new Sound('sounds/boost.wav');
        //this.teleportSound = new Sound('sounds/teleport.mp3');

        this.resetGame();
        this.loadHighScores();
        this.loadPersonalBest();
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
        this.gameLoop = setInterval(this.update.bind(this), this.difficulties[this.difficulty]);
    }

    resetGame() {
        this.snake = new Snake();
        this.food = generateFood(this.canvas);
        this.obstacles = generateObstacles(this.canvas);
        this.bonus = null;
        this.bonusTimer = 0;
        this.applesEaten = 0;
        this.bonusesCollected = 0;
        this.score = 0;
        this.isGameOver = false;
        this.updateInfoPanel();
    }

    handleKeyPress(event) {
        if (this.isGameOver) return;
        switch (event.key) {
            case 'ArrowUp': this.snake.changeDirection(0, -1); break;
            case 'ArrowDown': this.snake.changeDirection(0, 1); break;
            case 'ArrowLeft': this.snake.changeDirection(-1, 0); break;
            case 'ArrowRight': this.snake.changeDirection(1, 0); break;
        }
    }

    update() {
        if (this.isGameOver) return;
        this.snake.move();

        if (this.snake.checkCollision() || this.checkObstacleCollision()) {
            this.collisionSound.play();
            this.endGame();
        }

        if (this.snake.eatFood(this.food)) {
            this.eatSound.play();
            this.score += 10;
            this.applesEaten++;
            this.food = generateFood(this.canvas);
            if (Math.random() < 0.2) {
                this.bonus = generateBonus(this.canvas);
            }
        }

        if (this.bonus && this.snake.eatFood(this.bonus)) {
            this.boostSound.play();
            this.applyBonus(this.bonus);
            this.bonusesCollected++;
            this.bonus = null;
        }

        if (this.bonus) {
            this.bonusTimer++;
            if (this.bonusTimer > 50) {
                this.bonus = null;
                this.bonusTimer = 0;
            }
        }

        this.updateInfoPanel();
        this.render();
    }

    checkObstacleCollision() {
        const [head] = this.snake.body;
        return this.obstacles.some(obstacle => obstacle.x === head.x && obstacle.y === head.y);
    }

    endGame() {
        clearInterval(this.gameLoop);
        this.isGameOver = true;
        this.saveScore();
        this.showHighScores();
        this.updatePersonalBest();
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'green';
        this.snake.body.forEach(part => {
            this.ctx.fillRect(part.x, part.y, 10, 10);
        });

        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.food.x, this.food.y, 10, 10);

        this.ctx.fillStyle = 'gray';
        this.obstacles.forEach(obstacle => {
            this.ctx.fillRect(obstacle.x, obstacle.y, 10, 10);
        });

        if (this.bonus) {
            this.ctx.fillStyle = 'blue';
            this.ctx.fillRect(this.bonus.x, this.bonus.y, 10, 10);
        }

        this.ctx.fillStyle = 'black';
        this.ctx.font = '15px "Tiny5", sans-serif';
        this.ctx.fillText(`Score: ${this.score}`, 20, 20);

       
        if (this.isGameOver) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = 'black';
            this.ctx.font = '30px "Tiny5", sans-serif';
            this.ctx.fillText('Game Over', this.canvas.width / 2 - 65, this.canvas.height / 2);
        }
    }

    loadHighScores() {
        this.highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    }

    saveScore() {
        if (this.highScores.length < 20 || this.score > this.highScores[this.highScores.length - 1].score) {
            let name = prompt('Nouveau meilleur score ! Entrez votre pseudo (6 à 20 caractères) :');
            while (!name || name.length < 6 || name.length > 20) {
                name = prompt('Pseudo invalide. Entrez votre pseudo (6 à 20 caractères) :');
            }
            this.highScores.push({ name, score: this.score });
            this.highScores.sort((a, b) => b.score - a.score);
            if (this.highScores.length > 20) {
                this.highScores.pop();
            }
            localStorage.setItem('highScores', JSON.stringify(this.highScores));
        }
    }

    showHighScores() {
        const scoreBoard = document.getElementById('scoreBoard');
        scoreBoard.innerHTML = '<h2>Tableau des meilleurs scores</h2>';
        const list = document.createElement('ol');
        this.highScores.forEach(entry => {
            const item = document.createElement('li');
            item.textContent = `${entry.name}: ${entry.score}`;
            list.appendChild(item);
        });
        scoreBoard.appendChild(list);
    }

    loadPersonalBest() {
        this.personalBest = localStorage.getItem('personalBest') || 0;
        document.getElementById('personalBest').innerText = `Mon record personnel : ${this.personalBest}`;
    }

    updatePersonalBest() {
        if (this.score > this.personalBest) {
            this.personalBest = this.score;
            localStorage.setItem('personalBest', this.personalBest);
            document.getElementById('personalBest').innerText = `Mon record personnel : ${this.personalBest}`;
        }
    }

    restartGame() {
        clearInterval(this.gameLoop);
        this.resetGame();
        this.gameLoop = setInterval(this.update.bind(this), this.difficulties[this.difficulty]);
    }

    updateInfoPanel() {
        document.getElementById('currentDifficulty').innerText = `Difficulté : ${this.difficulty.charAt(0).toUpperCase() + this.difficulty.slice(1)}`;
        document.getElementById('applesEaten').innerText = `Pommes mangées : ${this.applesEaten}`;
        document.getElementById('bonusesCollected').innerText = `Bonus attrapés : ${this.bonusesCollected}`;
    }

    applyBonus(bonus) {
        if (bonus.type === 'speed') {
            clearInterval(this.gameLoop);
            this.gameLoop = setInterval(this.update.bind(this), 50);
            setTimeout(() => {
                clearInterval(this.gameLoop);
                this.gameLoop = setInterval(this.update.bind(this), this.difficulties[this.difficulty]);
            }, 5000);
        }
    }
}
