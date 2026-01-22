# 🍎 macOS Portfolio - Aditya Raj

![Project Banner](public/images/wallpaper.jpg) 
> A fully interactive, macOS-themed developer portfolio built with **React**, **Vite**, and **AI Integration**. 
> Experience my projects, skills, and resume through a functional "Desktop" environment.

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Google%20Gemini%20AI-8E75B2?style=for-the-badge&logo=googlebard&logoColor=white)
![Arch Linux](https://img.shields.io/badge/Arch_Linux-1793D1?style=for-the-badge&logo=arch-linux&logoColor=white)

</div>

## 🚀 Features

### 🖥️ Desktop Environment
- **Draggable Windows:** Built with `react-draggable` for a real OS feel.
- **Dock System:** Animated dock with magnification effect.
- **Top Bar:** Live time (Day.js), battery status, and control center.

### 🤖 "Aditya AI" Assistant
- **Powered by Google Gemma-3-4b:** A smart, sarcastic, and helpful chatbot.
- **Context Aware:** Remembers conversation history for natural replies.
- **Telegram Logs:** Silently sends all chat logs to my Telegram for live monitoring.
- **Unfiltered Mode:** Custom instruction-tuned model for "Roast" or "Professional" modes.

### 🛠️ Apps & Tools
- **Terminal:** Zsh-style terminal to run commands like `neofetch` and `ls`.
- **VS Code:** Custom project viewer with syntax highlighting.
- **Safari:** Browser-in-browser experience for viewing live projects.
- **Music Player:** Lo-fi beats while you browse.

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React.js, Vite, Tailwind CSS |
| **Animations** | GSAP, Framer Motion |
| **State Management** | Zustand, Immer |
| **Icons** | Lucide React |
| **AI Integration** | Google Gemini API (Gemma-3-4b-it) |
| **Notifications** | Telegram Bot API |

---

## ⚡ Getting Started

Follow these steps to run the portfolio on your local machine (Arch users, I know you know this, but for the rest...):

### 1. Clone the Repository
```bash
git clone [https://github.com/yourusername/mac-os-portfolio.git](https://github.com/yourusername/mac-os-portfolio.git)
cd mac-os-portfolio
2. Install Dependencies
Bash
npm install
3. Configure Environment Variables
Create a .env file in the root directory and add your keys:

Code snippet
# Google Gemini API Key (Get from aistudio.google.com)
VITE_GEMINI_KEY=your_gemini_api_key_here

# Telegram Bot (Optional - for logs)
VITE_TELEGRAM_TOKEN=your_telegram_bot_token
VITE_TELEGRAM_CHAT_ID=your_telegram_chat_id
4. Run the Development Server
Bash
npm run dev
Open http://localhost:5173 to view it in the browser.

📂 Project Structure
Bash
src/
├── components/       # UI Components (Dock, Windows, TopBar)
├── chatService.js    # AI Logic + Telegram Logger
├── prompts.js        # The "Brain" (System Prompt for AI)
├── assets/           # Images and Icons
└── App.jsx           # Main Desktop Layout
👤 About The Developer
Aditya Raj Full Stack Developer & Systems Enthusiast

🎓 University: Bennett University (2023-2027)

💻 Daily Driver: Arch Linux (Hyprland)

🧠 Interests: OS Development, AI/ML, Low-level Systems

🛠️ Projects: RoadRunner (Logistics), Custom OS (Assembly), Speech Emotion AI

🤝 Contributing
Pull requests are welcome! If you have a cool "App" idea for this OS, feel free to fork and submit a PR.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

<div align="center">

Made with 🖤 and React by Aditya Styled like macOS, Powered by Arch Linux.

</div>
