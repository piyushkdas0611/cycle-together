# 🌸 CycleTogether

> **Understand the cycle. Understand the person. Support each other.**

CycleTogether is a couples-first menstrual cycle tracking application built with React Native, Expo, TypeScript, and Firebase. It aims to help individuals understand their menstrual cycles while enabling partners to offer informed, thoughtful support—with privacy and consent at its core.

**Project status:** Early Development · MVP

---

## ✨ Vision

Traditional period trackers primarily focus on individual tracking. CycleTogether takes a relationship-centered approach by combining cycle tracking, personal insights, and partner support.

The long-term goal is to help couples move through:

**Tracking → Understanding → Communication → Support**

CycleTogether is being developed incrementally, starting with authentication and user profiles before introducing cycle tracking, partner connections, and personalized insights.

## 🚀 Current Features

- [x] Expo and React Native project foundation
- [x] TypeScript configuration
- [x] Expo Router navigation
- [x] Firebase project integration
- [x] Email/password registration
- [x] Email/password login
- [x] Authentication state management
- [x] Basic user profile creation in Cloud Firestore
- [x] Edit profile display name
- [x] Logout functionality
- [ ] Final authentication and Firestore security verification
- [ ] Cycle tracking and period history

*Completed features reflect the current implementation; security and runtime behavior still require verification.*

## 🗺️ Product Roadmap

### Phase 1 — Foundation

- [x] Initialize Expo project
- [x] Configure TypeScript
- [x] Set up Expo Router
- [x] Establish the source-code structure
- [ ] Finalize design system and reusable UI components

### Phase 2 — Authentication & User Profiles

- [x] Firebase Authentication integration
- [x] Registration and login screens
- [x] Shared authentication context
- [x] Basic Firestore user profile
- [x] Edit profile name
- [x] Logout
- [ ] Verify session persistence across app restarts
- [ ] Verify Firestore security rules
- [ ] Add password reset
- [ ] Improve authentication error handling and testing

### Phase 3 — Cycle Tracking

- [ ] Define the cycle data model
- [ ] Configure secure Firestore access for cycle records
- [ ] Record period start and end dates
- [ ] View cycle history
- [ ] Build the cycle calendar
- [ ] Validate dates and handle duplicate entries
- [ ] Estimate upcoming periods from recorded history

### Phase 4 — Couple Mode

- [ ] Design the partner connection data model
- [ ] Create partner invitations
- [ ] Accept or decline invitations
- [ ] Establish explicit sharing permissions
- [ ] Build a shared couple dashboard
- [ ] Allow users to revoke sharing access

### Phase 5 — Mood & Symptoms

- [ ] Daily mood tracking
- [ ] Symptom logging
- [ ] View mood and symptom history
- [ ] Identify recurring patterns

### Phase 6 — Insights

- [ ] Cycle insights
- [ ] Historical cycle-length summaries
- [ ] Mood and symptom insights
- [ ] Estimated fertile window and ovulation
- [ ] Personalized educational recommendations

### Phase 7 — Notifications

- [ ] Upcoming period reminders
- [ ] User-configurable daily reminders
- [ ] Partner support reminders, with appropriate consent
- [ ] Notification preferences

### Phase 8 — AI Companion

- [ ] Educational cycle assistant
- [ ] Supportive partner communication suggestions
- [ ] Personalized daily messages
- [ ] Context-aware insights with appropriate privacy safeguards

---

## 🛠️ Technology Stack

| Area | Technology |
|---|---|
| Mobile application | React Native |
| Development platform | Expo |
| Language | TypeScript |
| Navigation | Expo Router |
| Authentication | Firebase Authentication |
| Database | Cloud Firestore |
| Local persistence dependency | AsyncStorage |
| Development environment | VS Code |
| Version control | Git and GitHub |

Additional libraries and services will be introduced only when required by a feature.

## 📁 Project Structure

The project uses `src/app/` as the Expo Router route directory. Navigation screens live inside this directory, while feature logic and shared services live in `src/`.

```text
cycle-together/
├── assets/
│   └── images/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login.tsx
│   │   │   └── signup.tsx
│   │   ├── (tab)/
│   │   │   ├── _layout.tsx
│   │   │   ├── home.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── insights.tsx
│   │   │   └── profile.tsx
│   │   ├── _layout.tsx
│   │   └── index.tsx
│   ├── features/
│   │   ├── auth/
│   │   │   └── AuthContext.tsx
│   │   └── profile/
│   │       └── profileService.ts
│   ├── hooks/
│   ├── services/
│   │   └── firebase.tsx
│   ├── types/
│   └── utils/
├── scripts/
├── .gitignore
├── app.json
├── package.json
├── tsconfig.json
├── AGENTS.md
└── README.md
```

*The tree shows the current core structure. Feature directories for cycle tracking, moods, partners, and AI can be added as those modules are implemented.*

### Architecture Principles

- **Routing:** `src/app/` contains file-based screens and navigation layouts.
- **Feature logic:** `src/features/` organizes functionality by domain.
- **Services:** `src/services/` contains integrations such as Firebase.
- **Shared utilities:** `src/hooks/`, `src/types/`, and `src/utils/` hold reusable code.
- **Separation of concerns:** UI screens should delegate data operations to feature services where practical.

## ⚙️ Getting Started

### Prerequisites

Install the following:

- [Node.js](https://nodejs.org/)
- npm
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Expo Go](https://expo.dev/go/) or a compatible development environment

### 1. Clone the repository

```bash
git clone https://github.com/piyushkdas0611/cycle-together.git
cd cycle-together
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Firebase

Create or select a project in the [Firebase Console](https://console.firebase.google.com/).

Enable **Email/Password** authentication and create a Cloud Firestore database.

Register a Firebase app and configure the following environment variables in a local `.env` file:

```dotenv
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Replace the example values with your project's Firebase configuration.

> **Security:** Expo public environment variables are bundled into the client application. Never put service-account credentials, private API secrets, or administrative keys in `EXPO_PUBLIC_*` variables. Configure appropriate Firestore Security Rules before storing personal or reproductive-health data.

### 4. Start the application

```bash
npx expo start
```

Use the Expo CLI instructions to open the app on a compatible device, emulator, or supported web environment.

### 5. Run project checks

```bash
npx expo lint
npx tsc --noEmit
npx expo-doctor
```

Resolve reported issues before merging changes.

## 🔐 Privacy & Security

CycleTogether is intended to handle sensitive personal and reproductive-health information. Privacy must be designed into the application from the beginning.

Core principles:

- Collect only information needed for the feature.
- Require authentication for private user data.
- Enforce access controls through Firestore Security Rules.
- Keep users' personal records private by default.
- Require explicit, revocable consent before sharing information with a partner.
- Do not expose private cycle information through public links or unrestricted database queries.
- Treat predictions as estimates, not medical diagnoses.

Authentication alone does not secure Firestore documents. Database permissions must be enforced independently using security rules and, where appropriate, trusted backend logic.

## 🩺 Health Disclaimer

CycleTogether is intended for tracking, education, and supportive communication. Cycle predictions, fertile-window estimates, and ovulation estimates may be inaccurate, especially when cycle patterns vary.

The application must not present predictions as a reliable method of contraception or as a substitute for professional medical advice.

## 🤝 Development Workflow

Use feature branches for development:

```bash
git checkout -b feature/feature-name
```

After implementing a feature:

```bash
npx expo lint
npx tsc --noEmit
git add .
git commit -m "feat: describe the feature"
git push -u origin feature/feature-name
```

Open a pull request when the changes are ready for review.

Keep changes small and focused, and avoid committing `.env` files, credentials, or other sensitive information.

## 🎯 Long-Term Vision

CycleTogether aims to become a relationship-aware cycle companion that combines reliable personal tracking with consent-based partner support.

The development priorities are:

1. Establish secure, reliable foundations.
2. Build accurate and understandable cycle-tracking workflows.
3. Introduce partner sharing with explicit consent.
4. Add insights and notifications that users control.
5. Explore AI-powered educational and supportive experiences.

## 👨‍💻 Author

**Piyush Kumar Das**

GitHub: [@piyushkdas0611](https://github.com/piyushkdas0611)

Repository: [piyushkdas0611/cycle-together](https://github.com/piyushkdas0611/cycle-together)

---

**CycleTogether — Track better. Understand better. Support each other. ❤️**
