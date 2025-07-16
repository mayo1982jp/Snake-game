# 🐍 Snake Game

A classic Snake game with modern twists! Navigate through walls and avoid the enemy AI snake in this HTML5 browser game.

## 🎮 Features

- **Wall Wrapping**: Pass through walls and emerge from the opposite side
- **Enemy AI**: Orange enemy snake moves automatically with intelligent behavior
- **Smooth Controls**: Use arrow keys or WASD for movement
- **Score System**: Eat red food to increase your score and grow longer
- **Game Over & Restart**: Collision with enemy or yourself ends the game
- **Responsive Design**: Clean, dark theme interface

## 🕹️ How to Play

1. **Movement**: Use arrow keys (↑↓←→) or WASD keys to control your green snake
2. **Objective**: Eat the red food (🍎) to grow and increase your score
3. **Avoid**: Don't collide with the orange enemy snake or your own body
4. **Walls**: You can pass through walls - you'll appear on the opposite side
5. **Restart**: Click "もう一度プレイ" (Play Again) button when game over

## 🎯 Game Rules

- **Player Snake**: Green snake controlled by you
- **Enemy Snake**: Orange AI snake that moves randomly and avoids obstacles
- **Food**: Red squares that both snakes can eat
- **Scoring**: +10 points for each food eaten by the player
- **Game Over**: Occurs when player snake hits enemy snake or itself

## 🚀 Getting Started

### Play Online
Simply open `index.html` in any modern web browser.

### Local Setup
1. Clone this repository:
   ```bash
   git clone https://github.com/mayo1982jp/Snake-game.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Snake-game
   ```
3. Open `index.html` in your web browser

### GitHub Pages
This game is also available online at: `https://mayo1982jp.github.io/Snake-game/`

## 🛠️ Technical Details

- **HTML5 Canvas**: Game rendering using 2D canvas context
- **Vanilla JavaScript**: No external dependencies
- **Responsive CSS**: Modern styling with dark theme
- **Game Loop**: 150ms interval for smooth gameplay

### File Structure
```
Snake-game/
├── index.html          # Main HTML file with game interface
├── snake.js           # Game logic and mechanics
└── README.md          # This file
```

## 🎨 Customization

You can easily customize the game by modifying these values in `snake.js`:

- **Game Speed**: Change the interval in `setInterval(gameLoop, 150)` (lower = faster)
- **Grid Size**: Modify `gridSize = 20` for different tile sizes
- **Canvas Size**: Adjust canvas width/height in `index.html`
- **Colors**: Update the `ctx.fillStyle` values for different snake/food colors

## 🤖 Enemy AI Behavior

The enemy snake features intelligent behavior:
- **Random Movement**: 10% chance to change direction each frame
- **Collision Avoidance**: Changes direction when hitting walls or itself
- **Food Competition**: Competes for food but doesn't increase score
- **Player Avoidance**: Attempts to avoid collision with player snake

## 🎯 Future Enhancements

Potential features for future versions:
- Multiple difficulty levels
- Power-ups and special items
- Multiple enemy snakes
- Sound effects and music
- High score persistence
- Mobile touch controls

## 📱 Browser Compatibility

This game works on all modern browsers including:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Enjoy the game! 🎮**