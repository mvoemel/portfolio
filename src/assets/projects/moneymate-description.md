![Money Mate Dashboard](https://raw.githubusercontent.com/mvoemel/moneymate/main/assets/dashboard-view.png)

# Money Mate

**Money Mate** is a personal finance manager designed to empower young adults embarking on their independent living journey. With a charming canine mascot and an intuitive interface, it helps users track income, expenses, and savings weekly.

> **Goal:** To foster better financial habits and informed decision-making through insightful visualizations.

## Key Features

- **Weekly Tracking:** Effortlessly monitor income, expenses, and savings.
- **Visual Analytics:** View spending patterns across categories via dynamic charts.
- **MVC Architecture:** built using the Model-View-Controller design pattern for robust code organization.

## Tech Stack

- **Language:** Java
- **Build Tool:** Gradle
- **Persistence:** SQLite (local `data.db` storage)
- **Design:** Custom Java Swing/FX UI (inferred) with strict design guidelines.

## Architecture & Design

### System Diagrams

We utilized extensive modeling to ensure a clean architecture.

- [Class Diagram (SVG)](https://raw.githubusercontent.com/mvoemel/moneymate/main/docs/diagrams/classDiagrams/MoneyMateClassDiagram.svg)
- [ER Diagram (Database)](https://raw.githubusercontent.com/mvoemel/moneymate/main/docs/diagrams/erDiagrams/er-diagram.png)

### Design System

Money Mate follows a strict visual identity including a specific color palette and typography (Source Sans Pro).

- [Design Guidelines](https://github.com/mvoemel/moneymate/blob/main/docs/design-guidelines/Design-Guidelines.md)
- [Class Architecture Descriptions](https://github.com/mvoemel/moneymate/blob/main/documentation/ClassDescriptions.md)

## Gallery

![Transactions View](https://raw.githubusercontent.com/mvoemel/moneymate/main/assets/transaction-view.png)
![Categories View](https://raw.githubusercontent.com/mvoemel/moneymate/main/assets/categories-view.png)

## Getting Started

### Prerequisites

- Java Installed
- Gradle Installed

### Installation

1.  **Clone the repository.**
2.  **Run via Gradle:**

    ```bash
    # Standard Run
    ./gradlew run

    # Development Mode
    ./gradlew dev
    ```

## Testing

Comprehensive testing documentation is available here:

- [Testing Concept (PDF/Doc)](https://github.com/mvoemel/moneymate/blob/main/docs/testing-concept/testing-concept.docx)

## License

Distributed under the [MIT License](https://github.com/mvoemel/moneymate/blob/main/LICENSE).
