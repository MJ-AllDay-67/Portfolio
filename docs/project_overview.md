# Nexus Portfolio - Project Overview

## Introduction
**Nexus Portfolio** is a high-performance, interactive personal portfolio website designed for a Senior Frontend Engineer. It features a distinct futuristic / cyberpunk aesthetic (dubbed "Nexus Systems") and leverages modern web technologies to showcase skills, experience, and projects.

## Tech Stack
The project is built using the following core technologies:

*   **Frontend Framework**: React 19 (Functional Components, Hooks)
*   **Language**: TypeScript
*   **Build Tool**: Vite
*   **Styling**: Tailwind CSS (with custom animations and responsive design)
*   **Visualization Libraries**:
    *   `D3.js`: Used for the interactive "Tech Network" force-directed graph.
    *   `Recharts`: Used for the "Skill Chart" radar visualization.
    *   `HTML5 Canvas`: Used for the custom particle background effect.
*   **AI Integration**: Google Gemini API (`@google/genai`) for the chatbot assistant.

## Key Features

### 1. Single Page Application (SPA) Architecture
The application (`App.tsx`) manages navigation through a `ViewState` system, switching between:
*   **Base (Home)**: Hero section, career timeline preview, and skill matrix.
*   **Projects (Deployed Units)**: Grid view of portfolio projects.
*   **Experience (System Logs)**: Detailed career history timeline.
*   **Skills (Neural Net)**: Interactive visualizations of technical expertise.
*   **Uplink (Contact)**: Contact form.

### 2. AI-Powered Assistant ("Nexus")
*   **Component**: `AIChat.tsx`
*   **Service**: `geminiService.ts`
*   **Functionality**: A floating chat widget that connects to the Google Gemini API.
*   **Persona**: Configured as "Nexus," a witty and futuristic system interface that answers questions about the developer's experience and skills.

### 3. Interactive Data Visualization
*   **Tech Network**: A D3.js force-directed graph (`TechNetwork.tsx`) where technologies act as nodes with gravitational forces, allowing users to drag and interact with the skill stack.
*   **Skill Matrix**: A radar chart (`SkillChart.tsx`) displaying proficiency levels across key domains like React, TypeScript, and GenAI.

### 4. Immersive UI/UX
*   **Particle Background**: A custom Canvas implementation (`ParticleBackground.tsx`) that creates a moving network of connected particles, responding to window resizing.
*   **Animations**: Custom CSS animations (e.g., `animate-fade-in`, `animate-pulse`) and scroll-triggered reveals using `IntersectionObserver` in the `CareerTree` component.
*   **Theming**: Consistent use of semi-transparent backgrounds, blur effects (`backdrop-blur`), and neon color palettes (blue, purple, pink) to reinforce the sci-fi theme.

## Project Structure

```
c:\Users\micha\OneDrive\Desktop\portfolio\
├── App.tsx                 # Main application controller and layout
├── components/             # Reusable UI components
│   ├── AIChat.tsx          # Chatbot widget interface
│   ├── CareerTree.tsx      # Vertical timeline with scroll animations
│   ├── ParticleBackground.tsx # Canvas-based background effect
│   ├── SkillChart.tsx      # Recharts radar visualization
│   └── TechNetwork.tsx     # D3.js force graph visualization
├── services/
│   └── geminiService.ts    # Google Gemini API configuration and client
├── types.ts                # TypeScript type definitions
├── index.html              # Entry HTML file
├── package.json            # Dependencies and scripts
└── vite.config.ts          # Vite configuration
```

## Setup & Development
The project uses `npm` for dependency management and `vite` for development:
*   `npm run dev`: Starts the local development server.
*   `npm run build`: Builds the project for production.

