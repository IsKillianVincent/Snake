// La logique du serpent, mouvement, collision, etc.
export class Snake {
    constructor() {
        this.body = [{ x: 250, y: 250 }];
        this.direction = { x: 1, y: 0 };
        this.newDirection = { x: 1, y: 0 };
    }

    move() {
        const head = { x: this.body[0].x + this.newDirection.x * 10, y: this.body[0].y + this.newDirection.y * 10 };
        head.x = (head.x + 500) % 500;
        head.y = (head.y + 500) % 500;
        this.body.unshift(head);
        this.body.pop();
        this.direction = this.newDirection;
    }

    changeDirection(x, y) {
        if (x !== -this.direction.x && y !== -this.direction.y) {
            this.newDirection = { x, y };
        }
    }

    eatFood(food) {
        if (this.body[0].x === food.x && this.body[0].y === food.y) {
            this.body.push({});
            return true;
        }
        return false;
    }

    checkCollision() {
        const [head, ...body] = this.body;
        return body.some(part => part.x === head.x && part.y === head.y);
    }
}
