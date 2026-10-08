# 🌸 Cycle Together

> A couples-first menstrual cycle tracking app designed to help partners understand, support, and grow together.

**Cycle Together** is a mobile application built to make menstrual health tracking more inclusive by involving both partners. The goal is to help couples understand cycle patterns, moods, symptoms, fertility windows, and everyday changes — while making communication and support easier.

🚧 **Status:** Early Development / MVP

---

## 💡 Vision

Menstrual cycle tracking is usually designed for an individual.

**Cycle Together** takes a different approach:

> **Understand the cycle. Understand the person. Support each other.**

The app is designed around couples, allowing a partner to better understand what their significant other may be experiencing without turning the experience into a purely clinical tracking tool.

---

## ✨ Planned Features

### 🩸 Cycle Tracking
- Track period start and end dates
- Predict upcoming periods
- Track cycle length
- View cycle history
- Calendar-based cycle visualization

### ❤️ Couple Mode
- Connect two partners
- Share relevant cycle information with your partner
- Partner-friendly cycle insights
- Relationship-focused support suggestions

### 😊 Mood & Symptoms
- Daily mood tracking
- Track common symptoms
- Identify patterns across cycles
- Simple mood insights

### 🤰 Fertility & Pregnancy
- Fertile window estimation
- Ovulation estimation
- Pregnancy-related calculations
- Cycle-based insights

> ⚠️ Fertility and pregnancy calculations will be provided as informational estimates and should not be treated as medical advice or contraception.

### 🔔 Smart Notifications
- Upcoming period reminders
- Cycle phase notifications
- Partner support reminders
- Daily motivational messages

### 🤖 AI Companion
Future versions may include AI-powered features such as:

- Personalized cycle insights
- Mood-based suggestions
- Partner communication suggestions
- Educational explanations
- Personalized daily messages

---

## 🛠️ Tech Stack

### Mobile App

- **React Native**
- **Expo**
- **TypeScript**
- **Expo Router**

### Backend / Services

Planned:

- **Firebase**
- **Firebase Authentication**
- **Cloud Firestore**
- **Firebase Cloud Messaging / Notifications**

### Development Tools

- **VS Code**
- **Git**
- **GitHub**
- **ESLint**
- **Prettier**

---

## 📱 Project Architecture

The project follows Expo Router's file-based navigation architecture.

```text
cycle-together/
│
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   │
│   ├── (auth)/
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   └── register.tsx
│   │
│   └── (tabs)/
│       ├── _layout.tsx
│       ├── index.tsx
│       ├── calendar.tsx
│       ├── insights.tsx
│       └── profile.tsx
│
├── src/
│   ├── components/
│   ├── features/
│   ├── services/
│   ├── types/
│   └── utils/
│
├── assets/
│
├── package.json
├── tsconfig.json
└── README.md
```

### Architecture Philosophy

`app/` is responsible primarily for **routing and navigation**.

`src/` contains the application's **business logic and reusable code**.

For example:

```text
src/features/cycle/
```

will contain cycle-related functionality, while:

```text
app/(tabs)/calendar.tsx
```

represents the calendar screen.

This separation keeps navigation independent from the application's core logic.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git
- VS Code
- Expo CLI / Expo tooling
- Expo Go on your mobile device

### Clone the repository

```bash
git clone https://github.com/piyushkdas0611/cycle-together.git
```

### Navigate to the project

```bash
cd cycle-together
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npx expo start
```

You can then run the application using:

- Expo Go
- Android Emulator
- iOS Simulator
- Web browser

---

## 🗺️ Development Roadmap

### Phase 1 — Foundation

- [x] Initialize Expo project
- [x] Configure TypeScript
- [x] Configure Expo Router
- [x] Create navigation structure
- [ ] Create design system
- [ ] Create reusable UI components

### Phase 2 — Authentication

- [ ] Login
- [ ] Registration
- [ ] Firebase Authentication
- [ ] Forgot password
- [ ] User profile

### Phase 3 — Cycle Tracking

- [ ] Period tracking
- [ ] Cycle calendar
- [ ] Cycle history
- [ ] Cycle predictions
- [ ] Symptoms tracking

### Phase 4 — Couple System

- [ ] Create couple
- [ ] Invite partner
- [ ] Accept invitation
- [ ] Couple dashboard
- [ ] Partner permissions
- [ ] Privacy controls

### Phase 5 — Insights

- [ ] Cycle insights
- [ ] Mood insights
- [ ] Symptom patterns
- [ ] Fertility window estimation
- [ ] Personalized recommendations

### Phase 6 — Notifications

- [ ] Period reminders
- [ ] Daily reminders
- [ ] Partner support notifications
- [ ] Personalized messages

### Phase 7 — AI

- [ ] AI-powered insights
- [ ] Partner support suggestions
- [ ] Conversational assistant
- [ ] Personalized daily messages

---

## 🔐 Privacy

Cycle Together deals with **sensitive personal and reproductive health information**.

Privacy will therefore be a core part of the application's design.

Planned principles include:

- Minimal data collection
- Secure authentication
- Explicit partner-sharing permissions
- User-controlled data visibility
- Secure storage of sensitive information
- No unnecessary sharing of personal health information

---

## 🎯 Long-Term Vision

Cycle Together aims to become more than a period tracker.

The long-term vision is to build a **relationship-aware health companion** that helps couples understand each other better through:

**Tracking → Understanding → Communication → Support**

---

## 🤝 Contributing

The project is currently in early development.

Contributions, ideas, feedback, and discussions are welcome as the project evolves.

If you have an idea for improving Cycle Together:

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/your-feature
```

3. Make your changes
4. Commit your changes

```bash
git commit -m "feat: add your feature"
```

5. Push your branch

```bash
git push origin feature/your-feature
```

6. Open a Pull Request

---

## 📌 Project Status

Cycle Together is currently being developed as an **MVP**.

The project is being built incrementally with a focus on:

- Clean architecture
- Maintainable React Native code
- Privacy-first design
- Simple UX
- Couple-centric features
- Learning and experimentation

---

## 👨‍💻 Author

**Piyush Kumar Das**

GitHub: [@piyushkdas0611](https://github.com/piyushkdas0611)

---

## ⭐ Support

If you find the idea interesting, consider giving the repository a ⭐ on GitHub.

More features are coming as the project evolves.

**Cycle Together — Track better. Understand better. Support each other. ❤️**
