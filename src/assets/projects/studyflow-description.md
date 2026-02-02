![StudyFlow Dashboard](https://raw.githubusercontent.com/mvoemel/studyflow/dev/docs/assets/img.png)

# StudyFlow

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**StudyFlow** is a cross-platform web application designed to streamline academic management. It helps students organize their schedules, track grades, and manage study materials through a unified, user-friendly interface.

## Key Features

- **Academic Dashboard:** Centralized view of upcoming events, grades, and study materials.
- **Schedule Management:** Create, view, and edit class schedules.
- **Grade Tracking:** Monitor academic performance with statistical overviews.
- **Organization:** Manage multiple degrees and semesters efficiently.
- **Secure Access:** Full user authentication handling.

## Tech Stack

- **Frontend:** Node.js (Web Client)
- **Backend:** Java/Kotlin (Gradle-based Server)

## Documentation

For a deeper dive into the system's design and quality assurance:

- [Backend Architecture & Class Diagrams](https://github.com/mvoemel/studyflow/blob/dev/docs/backendArchitecture.md)
- [Testing Concept & Test Cases](https://github.com/mvoemel/studyflow/blob/dev/docs/testingConcept/Test_Cases.md)

## Team

Developed by **Group 3**: Shpetim Veseli, Michael Vömel, Leona Kryeziu, Tobias Kugel, and Jil Zerndt.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en) installed.

### Installation

To run the application locally, you need to start the backend server first, followed by the client.

**1. Backend (Gradle)**

```bash
cd ./studyflow/backend
./gradlew clean build
./gradlew run
# Server accessible at http://localhost:8080
```

**2. Frontend (Client)**

```bash
cd ../studyflow/client
npm install
npm run dev
# Client accessible at http://localhost:3000
```
