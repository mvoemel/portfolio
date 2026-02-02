# DropIn

[![Database CI](https://github.com/PM4-FS25-DropIn/dropin/actions/workflows/ci-database.yml/badge.svg)](https://github.com/PM4-FS25-DropIn/dropin/actions/workflows/ci-database.yml) [![Swift iOS Client CI](https://github.com/PM4-FS25-DropIn/dropin/actions/workflows/ci-client-swift.yml/badge.svg)](https://github.com/PM4-FS25-DropIn/dropin/actions/workflows/ci-client-swift.yml) [![SonarQube Build](https://github.com/PM4-FS25-DropIn/dropin/actions/workflows/sonarqube.yml/badge.svg)](https://github.com/PM4-FS25-DropIn/dropin/actions/workflows/sonarqube.yml)

**DropIn** is a social app designed for spontaneous meetups and short-term events. Users can create personal or business events, chat in real-time, and share media to stay connected.

> **Availability:** Currently exclusive to iOS (SwiftUI).

[Visit Landing Page](https://dropinwith.me) | [App Documentation](https://pm4-fs25-dropin.github.io/dropin-docs/documentation/dropin/)

---

## Tech Stack

- **Frontend:** Swift 6, SwiftUI (Optimized for iPhone)
- **Backend:** [Supabase](https://supabase.com/) (Realtime chat, SQL functions, Database)
- **CI/CD:** GitHub Actions, Xcode Cloud

## Key Features

- **Spontaneous Events:** "Drop in" to events happening nearby via a swipe or map interface.
- **Real-time Interaction:** Integrated chat and media sharing for every event.
- **Hybrid Content:** Supports both personal meetups and business-promoted events.

## Development & Testing

We utilized a robust testing strategy to ensure reliability across the stack:

- **CI/CD Pipeline:** Automated via GitHub Actions (Backend) and Xcode Cloud (iOS).
- **iOS Testing:** Unit tests for critical services (`AuthService`, `ChatService`) and E2E UI tests.
- **Manual QA:** Automated deployment to **TestFlight** for real-device testing.

### Detailed Documentation

- [Team](https://github.com/PM4-FS25-DropIn/dropin/blob/main/docs/Team.md)
- [Feature Specifications](https://github.com/PM4-FS25-DropIn/dropin/blob/main/docs/FeatureSpecifications.md)
- [Server Architecture](https://github.com/PM4-FS25-DropIn/dropin/blob/main/docs/server/Architecture.md)
- [Visual Concept](https://github.com/PM4-FS25-DropIn/dropin/blob/main/docs/client/VisualConcept.md)

## Getting Started

To run the project locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/PM4-FS25-DropIn/dropin.git
    ```
2.  **Backend:** Install the [Supabase CLI](https://supabase.com/docs/guides/local-development) and run `supabase start` in the `./client` directory.
3.  **iOS Client:** Open the client directory in **Xcode** and build the project.
