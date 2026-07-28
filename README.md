# 🎨 AI Generate Studio — Client Portal

Welcome to the frontend repository of **AI Generate Studio**, a premium, full-stack AI-powered SaaS application built using modern web development practices. This portal provides an intuitive, high-performance, and visually stunning dashboard interface where users can interact with multiple cutting-edge AI generation tools and manage their subscriptions.

---

## 🚀 Key Features

*   **Premium Glassmorphic UI/UX**: Designed with a high-end dark mode aesthetic, vibrant HSL gradients, custom animated page transitions, and smooth hover effects.
*   **Real-time Credit & Limit Tracking**: Dynamically counts and displays user's remaining daily generations (e.g. `2 / 3 requests used today`).
*   **Fully Responsive Sidebar Navigation**: Clean, accessible side drawer supporting desktop and mobile devices.
*   **State-of-the-Art Forms & Validation**: Built with React Hook Form and Zod to ensure prompt inputs are validated locally before dispatching API requests.
*   **Optimized Performance**: Leverages TanStack React Query v5 for lightning-fast server state caching, optimistic updates, and loading spinners.
*   **Global/Local Payment Workflows**: Implements seamless integrations with Stripe Checkout and SSLCommerz hosted checkouts.

---

## 🛠️ Main Feature Suites

The platform offers a comprehensive set of AI creation tools and payment options:

1.  **Background Remover**: Instantly isolate subjects and remove backgrounds from uploaded images with pixel-level precision.
2.  **Resume Analyzer**: Upload resumes to get automated suggestions for grammar improvements, keyword extraction, and career fit analysis.
3.  **Text to Image**: Create vivid, high-resolution pictures and artwork directly from descriptive prompts.
4.  **Text to Video**: Convert natural language descriptions into short, high-fidelity dynamic video clips.
5.  **Text to Speech**: High-fidelity, natural-sounding audio synthesis supporting multiple voice presets and language configurations.
6.  **AI Chatbot**: Context-aware, conversation-preserving assistant for queries, explanations, copywriting, and coding help.
7.  **Language Translator**: Neural machine translation across dozens of global languages, preserving formatting and tone.
8.  **Grammar & Writing Improver**: Clean up text structures, polish grammar errors, and adjust the tone of your essays or emails.
9.  **Image to Video**: Bring static photos to life by animating them into cinematic, fluid video loops.
10. **Stripe & SSLCommerz Payment Gateway**: Flexible subscriptions via **Stripe** (global credit/debit cards) and local BDT payment options (mobile banking/cards) using **SSLCommerz**.

---

## 💻 Tech Stack

*   **Framework**: Next.js 16 (App Router) & React 19
*   **Package Manager**: Bun (for supercharged installation & running speeds)
*   **Styling & Design System**: Tailwind CSS v4, shadcn/ui components, and Lucide React icons
*   **Animations**: Framer Motion
*   **Data Fetching**: TanStack React Query v5 & Axios
*   **State Management**: React Hook Form & Zod schemas

---

## 📁 Folder Structure

```
client/
├── public/                  # Static assets and icons
├── src/
│   ├── app/                 # Next.js App Router (pages and layouts)
│   │   ├── (authLayout)/    # Authentication routes (Login/Register)
│   │   ├── (commonLayout)/  # Public marketing routes (Home/Pricing/About)
│   │   └── (dashboardLayout)# Protected dashboard and generator pages
│   ├── components/          # Reusable UI component library
│   │   ├── layouts/         # Page structures (Navbar, Footer, Sidebar)
│   │   ├── modules/         # Feature-specific component structures
│   │   └── ui/              # Atomized shadcn/ui components
│   ├── config/              # App config constants
│   ├── lib/                 # Third-party integrations (API client instances)
│   ├── providers/           # Context providers (Theme, React Query)
│   ├── services/            # API call abstractions
│   ├── types/               # Type definition files
│   ├── utils/               # Shared helper functions (Auth cookies, JWT decoding)
│   └── zod-schema/          # Form schema validations
```

---

## ⚙️ Environment Variables Setup

Create a `.env` file in the root of the `client` directory:

```env
NEXT_PUBLIC_API_BASE_URL="http://localhost:5000/api/v1"
NODE_ENV="development"

# Cloudinary Integration
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="your-preset"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Auth Tokens
ACCESS_TOKEN_SECRET="your-access-secret"
REFRESH_TOKEN_SECRET="your-refresh-secret"
```

---

## 🚀 Getting Started

First, ensure you have [Bun](https://bun.sh) installed. Then run the following commands:

### 1. Install Dependencies
```bash
bun install
```

### 2. Run the Development Server
```bash
bun run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to inspect the application.

### 3. Build for Production
```bash
bun run build
```

### 4. Run Linter
```bash
bun run lint
```
