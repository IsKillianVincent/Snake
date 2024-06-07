// Fonctions utiles pour la génératon de nourriture, obstacles, et bonus
export function generateFood(canvas) {
    const x = Math.floor(Math.random() * canvas.width / 10) * 10;
    const y = Math.floor(Math.random() * canvas.height / 10) * 10;
    return { x, y };
}

export function generateObstacles(canvas) {
    const obstacles = [];
    for (let i = 0; i < 10; i++) {
        const x = Math.floor(Math.random() * canvas.width / 10) * 10;
        const y = Math.floor(Math.random() * canvas.height / 10) * 10;
        obstacles.push({ x, y });
    }
    return obstacles;
}

export function generateBonus(canvas) {
    const x = Math.floor(Math.random() * canvas.width / 10) * 10;
    const y = Math.floor(Math.random() * canvas.height / 10) * 10;
    return { x, y, type: 'speed' }; 
}
