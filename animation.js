// Get references to the button and canvas elements
const button = document.getElementById("explosion-button");
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

// Adjust canvas to fill the window
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Particle class to manage each particle's state
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    // Random angle and speed
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 3 + 2;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    
    // Random size and rotation
    this.radius = Math.random() * 3 + 3;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.2;
    
    // Lifetime in ms (approx. 3 seconds)
    this.life = 3000;
    this.elapsed = 0;
  }
  
  update(dt) {
    // Move particle
    this.x += this.vx;
    this.y += this.vy;
    // Apply slight friction so it slows down over time
    this.vx *= 0.98;
    this.vy *= 0.98;
    // Update rotation
    this.rotation += this.rotationSpeed;
    // Update elapsed time
    this.elapsed += dt;
  }
  
  draw(ctx) {
    // Compute current alpha based on lifetime progress
    const progress = this.elapsed / this.life;
    const alpha = Math.max(1 - progress, 0);
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = alpha;
    
    // Draw a 4-point star shape.
    // We'll draw an 8-vertex star (alternating outer and inner points)
    const spikes = 4;
    const outerRadius = this.radius;
    const innerRadius = outerRadius * 0.5;
    
    ctx.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
      // Alternate between outer and inner radii
      const r = (i % 2 === 0) ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / spikes;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    // Use a bright yellow/orange color for the particle
    ctx.fillStyle = "rgb(255, 251, 0)";
    ctx.fill();
    ctx.restore();
  }
}

// Array to store active particles
let particles = [];

// Track the last frame's timestamp for proper delta time calculation
let lastTime = 0;

// The animation loop updates and draws particles
function animate(time) {
  const dt = time - lastTime;
  lastTime = time;
  
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Update and draw each particle
  particles.forEach((p) => {
    p.update(dt);
    p.draw(ctx);
  });
  
  // Remove particles that have exceeded their lifetime
  particles = particles.filter((p) => p.elapsed < p.life);
  
  // Continue animating if there are particles left
  if (particles.length > 0) {
    requestAnimationFrame(animate);
  }
}

// Function to generate explosion particles at (x, y)
function createParticles(x, y) {
  // Create between 50 to 80 particles for a balanced effect
  const count = Math.floor(Math.random() * 30) + 50;
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(x, y));
  }
  // Start the animation loop if not already running
  lastTime = performance.now();
  requestAnimationFrame(animate);
}

// Button click handler
button.addEventListener("click", function (e) {
  // Get button center coordinates
  const rect = button.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  // Add a CSS class to quickly scale up the button
  button.classList.add("active");
  
  // Remove the active class after 200ms to smoothly scale back
  setTimeout(() => {
    button.classList.remove("active");
  }, 200);
  
  // Create explosion particles from the button's center
  createParticles(centerX, centerY);
});