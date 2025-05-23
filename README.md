# FajrulIlm - Dawn of Knowledge

FajrulIlm is a modern web application designed as a platform for Islamic questions and answers. It aims to connect users seeking knowledge with verified Ulama (scholars) who can provide insightful answers. The platform also includes a browser for Hadith from Sahih al-Bukhari.

## Key Features

*   **Q&A Platform**: Users can ask questions, and Ulama can provide answers.
*   **User Profiles**: Distinct profiles for "Askers" and "Ulama."
*   **Hadith Bukhari Browser**: Browse and search a sample collection of Hadith from Sahih al-Bukhari.
    *   Client-side search by Hadith number, book name, narrator, or text.
*   **Multilingual Support (Client-Side)**:
    *   Interface translatable into English, Tajik, Russian, and Persian.
    *   Language switcher for dynamic language selection.
*   **Theme Switching**:
    *   Light mode and Dark mode.
    *   System preference detection.
*   **Color Palette Customization**:
    *   Choose between three predefined color themes: Sky (Blue - Default), Crimson (Red), and Emerald (Green).
*   **Responsive Design**: Optimized for a good user experience on both desktop and mobile devices, suitable for webview integration.
*   **Modern UI**: Built with ShadCN UI components and Tailwind CSS for a clean and professional look.

## Technology Stack

*   **Frontend**: Next.js (App Router), React
*   **Styling**: Tailwind CSS, ShadCN UI
*   **Internationalization (i18n)**: Custom client-side solution with JSON translation files.
*   **State Management**: React Context (for theming and i18n)
*   **AI (Planned/Potential)**: Genkit (for future AI-powered features)
*   **Fonts**: Geist Sans & Geist Mono

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (version 18.x or later recommended)
*   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd FajrulIlm
    ```

2.  **Install NPM packages:**
    ```bash
    npm install
    ```
    or if you use yarn:
    ```bash
    yarn install
    ```

### Running the Development Server

Once the dependencies are installed, you can run the development server:

```bash
npm run dev
```
or with yarn:
```bash
yarn dev
```

This will start the development server, typically on `http://localhost:3000` (or the port specified in your `package.json` scripts). Open this URL in your browser to see the application.

The Genkit development server (if you start working on AI features) can be run with:
```bash
npm run genkit:dev
```

## Project Structure

*   `src/app/`: Main application pages using Next.js App Router.
*   `src/components/`: Reusable UI components.
    *   `src/components/ui/`: ShadCN UI components.
    *   `src/components/layout/`: Layout components (header, sidebar, footer).
    *   `src/components/shared/`: Shared components (logo, theme switcher, etc.).
    *   `src/components/qa/`: Components related to the Q&A functionality.
    *   `src/components/auth/`: Authentication-related forms.
    *   `src/components/profile/`: User profile components.
*   `src/contexts/`: React context providers (e.g., for theming, i18n).
*   `src/lib/`: Utility functions, constants, and mock data.
*   `src/locales/`: JSON files for internationalization.
*   `src/types/`: TypeScript type definitions.
*   `src/ai/`: Directory for Genkit AI flows (currently contains basic setup).
*   `public/`: Static assets.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE.txt` for more information (if applicable).
