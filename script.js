
const canvas = document.getElementById('treeCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create heart-shaped leaves
class Leaf {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 10 + 6; // Adjusted size range
        this.color = color;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 1 + 1;
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(this.x - this.size / 2, this.y - this.size / 2, this.x - this.size, this.y + this.size / 3, this.x, this.y + this.size);
        ctx.bezierCurveTo(this.x + this.size, this.y + this.size / 3, this.x + this.size / 2, this.y - this.size / 2, this.x, this.y);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y > canvas.height || this.x < 0 || this.x > canvas.width) {
            this.x = Math.random() * canvas.width;
            this.y = -10;
        }
    }
}

// Generate leaves
const leaves = [];
const colors = ['#FF69B4', '#FF1493', '#DB7093', '#C71585', '#800080'];
const leafCount = 300; // Increased leaf count

function generateLeaves() {
    for (let i = 0; i < leafCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = colors[Math.floor(Math.random() * colors.length)];
        leaves.push(new Leaf(x, y, color));
    }
}

// Animate the scene
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let leaf of leaves) {
        leaf.update();
        leaf.draw();
    }
    requestAnimationFrame(animate);
}

generateLeaves();
animate();