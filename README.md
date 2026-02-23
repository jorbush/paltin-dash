# Paltín Dash 🥑

Paltín Dash is a 3D endless runner web game built with React, Three.js, React Three Fiber, and Tailwind CSS. Play as Paltín the avocado or unlock friends as you dash through diverse, culturally rich Latin American environments!

## Features 🎮

- **Endless Action:** Run, jump, and dodge incoming obstacles!
- **Dynamic Zones:** The game dynamically swaps themes (e.g., Amazon Jungle to Atacama Desert) every 20 segments seamlessly.
- **In-Game Store:** Collect coins to unlock new characters like Calabacín and Patty Joe!
- **High Scores Leaderboard:** Compete against yourself and track your top 5 best runs.
- **Multilingual Support:** Fully translated into English, Spanish, and Catalan.
- **Responsive & Touch:** Play on desktop with your keyboard or on mobile with swipe gestures!

## Tech Stack 🛠

- **Framework:** Astro (for routing/build) & React 18
- **3D Graphics:** Three.js, `@react-three/fiber`, `@react-three/drei`
- **State Management:** Zustand (with LocalStorage persistence)
- **Styling:** Tailwind CSS
- **Testing:** Vitest & React Testing Library

## Getting Started 🚀

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Start the local development server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to the localhost port provided (usually `http://localhost:4321`).

## Available Scripts 📜

- `npm run dev`: Starts the local development server.
- `npm run build`: Builds the production-ready site to `./dist/`.
- `npm run test`: Runs the Vitest test suites.
- `npm run preview`: Previews the local build before deploying.

## Controls 🕹

### Desktop
- **A / Left Arrow:** Move Left
- **D / Right Arrow:** Move Right
- **W / Up Arrow / Space:** Jump

### Mobile
- **Swipe Left:** Move Left
- **Swipe Right:** Move Right
- **Swipe Up:** Jump

---
Enjoy your run and try to reach the Atacama Desert! 🌵
