# Quiz App

A sleek, high-performance Quiz Application built with Vanilla JavaScript, CSS3 animations, and the OpenDB API. Features a persistent leaderboard and real-time audio feedback.

## Features

- **Question Fetching through API:** Integrates with the [Open Trivia Database API](https://opentdb.com) to fetch questions based on category and difficulty.
- **Persistent Multi-Player Leaderboard:** Uses `localStorage` to save scores for multiple players, featuring a dynamic ranking system.
- **Synthesized Audio Feedback:** Implements the **Web Audio API** to generate real-time tones for correct and incorrect answers without external audio files.
- **Progressive UI:** Includes a real-time progress bar, a countdown timer with "warning" pulses, and a mobile-optimized layout.

## Technical Stack

- **Frontend:** HTML5, CSS3 (Flexbox/Grid), Vanilla JavaScript (ES6+).
- **Data Persistence:** `window.localStorage` (JSON Serialization).
- **Sound Engine:** `Web Audio API` (Oscillators and GainNodes).
- **API:** [Open Trivia DB](https://opentdb.com).

## How to Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com

2. **Open the project:**
    Simply open index.html in your browser. No local server or installation is required.
