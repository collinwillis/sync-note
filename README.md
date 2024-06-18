# SyncNote

[![SyncNote](https://img.shields.io/badge/SyncNote-Google%20Docs%20Alternative-brightgreen)](https://www.sync-note.com)


![React](https://img.shields.io/badge/React-17.0.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-4.4.3-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-2.2.16-blue)
![Firebase](https://img.shields.io/badge/Firebase-9.1.2-orange)
![Bun](https://img.shields.io/badge/Bun-0.1.3-yellow)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4.1.3-black)

Welcome to **SyncNote**, your collaborative note-taking app designed for seamless document collaboration. SyncNote allows multiple users to work on documents simultaneously, with real-time updates and a clean, intuitive interface.

![SyncNote Preview](https://source.unsplash.com/random/800x600?technology,notebook)

## 📑 Table of Contents

- [Features](#-features)
- [Live Demo](#-live-demo)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Technologies Used](#-technologies-used)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

## ✨ Features

- **Real-time Collaboration**: Edit documents together with live updates.
- **User Authentication**: Secure sign-up and login with Firebase Authentication.
- **Document Management**: Create, edit, and delete notes easily.
- **User Presence**: See who is currently viewing and editing a document.
- **Dark Mode**: Switch between light and dark themes for comfortable viewing.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## 🌐 Live Demo

Check out the live demo: [SyncNote](https://www.sync-note.com)

## 🛠️ Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

Ensure you have the following installed:

| Prerequisite | Icon |
|--------------|------|
| Node.js      | <img width="50" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js"/> |
| Bun          | <img width="50" src="https://github.com/marwin1991/profile-technology-icons/assets/136815194/7e9599e9-0570-4bb6-b17f-676ed589912f" alt="Bun.js" title="Bun.js"/> |
| npm          | <img width="50" src="https://user-images.githubusercontent.com/25181517/121401671-49102800-c959-11eb-9f6f-74d49a5e1774.png" alt="npm" title="npm"/> |
| Firebase     | <img width="50" src="https://user-images.githubusercontent.com/25181517/189716855-2c69ca7a-5149-4647-936d-780610911353.png" alt="Firebase" title="Firebase"/> |

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/sync-note.git
    cd sync-note
    ```

2. Install frontend dependencies using Bun:

    ```sh
    bun install
    ```

3. Install server dependencies using npm:

    ```sh
    cd server
    npm install
    cd ..
    ```

4. Configure Firebase:

   Create a `firebaseConfig.ts` file in the `src` directory with your Firebase configuration:

    ```typescript
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID"
    };

    export default firebaseConfig;
    ```

5. Start the development server:

    ```sh
    bun run dev
    ```

6. Start the server:

    ```sh
    cd server
    npm run dev
    ```

## 🗂️ Project Structure

- **src**: Contains the main source code for the application.
- **server**: Contains server-side code.

## 🔧 Technologies Used

- **Frontend**: React, TypeScript, TailwindCSS, Bun
- **Backend**: Node.js, Express, Socket.IO, npm
- **Database**: Firebase Firestore
- **Authentication**: Firebase Authentication
- **State Management**: Zustand
- **Realtime Updates**: Socket.IO

## 🤝 Contributing

I welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit them: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📬 Contact

If you have any questions or feedback, feel free to reach out:

- [Collin Willis](https://collinwillis.dev)
- Email: collin@tidybrackets.com
- LinkedIn: [Collin Willis](https://www.linkedin.com/in/collinwillis)

---

**SyncNote** - Your collaborative note-taking app.
