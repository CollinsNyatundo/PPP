# Portfolio Website

## Table of Contents
- [Project Overview](#project-overview)
- [Purpose](#purpose)
- [Features](#features)
- [Tech Stack](#tech-stack)
  - [Languages](#languages)
  - [Frameworks and Libraries](#frameworks-and-libraries)
  - [Tools and Services](#tools-and-services)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
- [Hosting and Deployment](#hosting-and-deployment)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## Project Overview

This **Portfolio Website** is a modern, responsive, and interactive platform created by **Collins Nyagaka** to showcase expertise, projects, and achievements in data science. It is designed as a professional portfolio to attract potential employers, collaborators, and clients.

---

## Purpose

The portfolio aims to:
- Demonstrate technical skills and highlight a diverse range of projects.
- Showcase modern web development practices.
- Provide an engaging and user-friendly interface for visitors.
- Foster professional networking and career opportunities.

---

## Features

- **Responsive Design**: Fully optimized for all screen sizes (mobile, tablet, and desktop).
- **Project Showcase**: Interactive displays of projects with descriptions and links.
- **Dynamic Content**: Built with reusable React components for a modern user experience.
- **Clean UI/UX**: Minimalistic and intuitive design.
- **Contact Form**: Easy-to-access contact section for inquiries and networking.

---

## Tech Stack

### **Languages**
- **TypeScript** (76%): Ensures type safety and better code maintainability.
- **HTML** (10.7%): Structures the content.
- **MDX** (6.8%): Integrates React components in Markdown for dynamic rendering.
- **JavaScript** (3.9%): Adds interactivity.
- **CSS** (2.6%): Styles the application.

### **Frameworks and Libraries**
- **React**: v18.2.0 – For building reusable UI components.
- **Tailwind CSS**: v3.3.2 – A utility-first CSS framework for styling.
- **Vite**: v4.4.0 – For fast builds and a seamless development experience.

### **Tools and Services**
- **Firebase Hosting**: For reliable and scalable hosting services.
- **Netlify**: Alternative hosting platform with CI/CD capabilities.
- **PostCSS**: v8.4.21 – Processes CSS for compatibility and performance.
- **ESLint**: v8.49.0 – Enforces code quality and consistency.

---

## Folder Structure

The project is organized as follows:

```plaintext
project2/
├── .bolt/                     # Bolt configuration files
├── public/                    # Static assets (images, etc.)
├── src/                       # Source files
│   ├── components/            # Reusable components (e.g., buttons, cards)
│   ├── pages/                 # Page components for different sections
│   ├── styles/                # Tailwind and custom CSS files
│   └── App.tsx              # Entry point for the React app
├── .gitignore                 # Excluded files for Git tracking
├── eslint.config.js           # ESLint configuration
├── index.html                 # Main HTML file
├── package-lock.json          # NPM package lock file
├── package.json               # NPM package configuration
├── postcss.config.js          # PostCSS configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.app.json          # TypeScript application configuration
├── tsconfig.json              # Base TypeScript configuration
└── vite.config.ts             # Vite build configuration
```

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js**: v18.16.0 or higher
- **npm**: v9.7.0 or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/CollinsNyatundo/project2.git
   ```
2. Navigate to the project directory:
   ```bash
   cd project2
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Usage

To start the development server:
```bash
npm run dev
```

Open your browser and visit `http://localhost:3000` to view the application.

---

## Hosting and Deployment

The portfolio can be hosted using the following platforms:

### **Firebase Hosting**
1. Install Firebase CLI globally:
   ```bash
   npm install -g firebase-tools
   ```
2. Login to Firebase:
   ```bash
   firebase login
   ```
3. Deploy the project:
   ```bash
   firebase deploy
   ```

### **Netlify**
1. Create an account at [Netlify](https://netlify.com).
2. Drag and drop the project folder onto the Netlify dashboard, or connect your GitHub repository for automatic deployment.

---

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add detailed description of your changes"
   ```
4. Push your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request and describe your changes in detail.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments

- **React**: For powering the UI components.
- **Tailwind CSS**: For the utility-first CSS framework.
- **Vite**: For a fast and modern development experience.
- **Firebase and Netlify**: For hosting and deployment services.
- **MDX**: For enabling dynamic content with React in Markdown.

---

Feel free to reach out for questions, suggestions, or collaborations!
