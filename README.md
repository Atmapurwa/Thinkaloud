# `Thinkaloud`

AI-based reading support and real-time voice interactions web app that empower dyslexic and diverse learners to think critically through their ideas.

## The Problem

Dyslexia affects 1 in 5 learners, making reading one of the most common learning challenges worldwide. Teachers want to help, but giving one-on-one reading support and personalized feedback is time consuming and often impossible with large classrooms. The result? Students lose confidence, struggle to keep up, and miss out on reaching their full potential.

## 🧑‍💻 Team

| **Name**                     | **Role**                                  |
| ---------------------------- | ----------------------------------------- |
| Hasnat Ferdiananda           | Lead, AI/ML Engineer, Fullstack Developer |
| Muhamad Naufal Nabillansyah  | Fullstack Developer                       |
| Jessica Cheryl Ganda Atmadja | Business Development                      |

---

## 📋 Requirements

**System Requirements:**

- Node.js 18+
- npm or yarn

**API Keys Required:**

- Modelarts API (for AI features)
- Livekit API (for agent features)
- Supabase (for temporary posgreSQL)

---

### Key Features

- **🤖 SEAMLESS ACTIVITY CREATION** Upload a PDF or design an activity from scratch in just minutes.
- **💯 EFFORTLESS GRADING** Leverage AI evaluation that highlights key student responses aligned with your grading criteria.
- **👄 ENGAGING STUDENT INTERACTION** Students respond orally with AI-driven follow-ups that build critical thinking.
- **👂 READ AND LISTEN** Enhanced student reading and comprehension of material.

---

## 🚀 How to Run the App

### 1. Clone the Repository

```bash
git clone https://github.com/Atmapurwa/Thinkaloud.git
cd Thinkaloud
```

### 2. Setup Environment Variables

Create `.env` file:

```env
MODELARTS_API_TOKEN=your_modelarts_api_key_here
LIVEKIT_URL=your_livekit_url_here
LIVEKIT_API_KEY=your_livekit_api_key_here
LIVEKIT_API_SECRET=your_livekit_api_secret_here
NEXT_PUBLIC_SUPABASE_URL= your_public_supabase_url_here
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY= your_key_here
NEXT_PUBLIC_BASE_URL= http://localhost:3000
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Application

**Start Development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open `http://localhost:3000` with your browser to see the result.

## 🎥 Pitch & Demo

- **Video**: [Watch here](https://youtu.be/NwxB5zmY-8E)

---

## Authors

- [@hasnat5](https://www.github.com/hasnat5)
- [@Vastuolu](https://github.com/Vastuolu)

## 📞 Support

For questions, issues, or feedback:

- Open an issue on GitHub
- Contact the team through the repository

**Built with ❤️ for accessibility and inclusion by Atmapurwa Team**
