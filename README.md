<div align="center">
  <img src="./public/favicon.svg" alt="Satish.dev Logo" height="120" />
  <h1>Satish Raut — Developer Portfolio</h1>
  <p><strong>A hyper-modern, highly interactive personal portfolio showcasing full-stack development, 3D interactions, and advanced web animations.</strong></p>
  
  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#installation">Installation</a> •
    <a href="#contact">Contact</a>
  </p>
</div>

---

## 🚀 Features

- **Next-Gen UX/UI Requirements**: Features glassmorphism, dynamic glowing gradients, and complex layered layouts.
- **Advanced Animations (GSAP & Framer Motion)**:
  - ScrollTriggered "stacked deck" animation timeline for Certifications where items fan out like a hand of cards based on scroll position.
  - Page-wide staggered reveals and floating blobs on the Hero & Contact sections.
- **3D Interactions**:
  - Immersive Three.js implementation via React Three Fiber, providing interactive tilt cards and floating elements.
- **Dynamic PDF Rendering**: Features a completely custom OS-native-styled modal UI to natively stream and view the CV/Résumé PDF in the browser (`react-pdf` + `pdfjs`).
- **Live Contact Form**: No backend required. Users can securely send messages straight to your email using the integrated `EmailJS` pipeline.
- **Responsive & OS-Aware Theme Toggle**: Seamless transition between fully curated Light Mode and Dark Mode palettes with independent aesthetic variants.
- **Fluid Smooth Scrolling**: Integrated `Lenis` to provide a butter-smooth, inertia-based scroll experience overriding stock browser scrolling.

<br/>

## 🛠 Tech Stack

**Core Frameworks**

- [React 19](https://react.dev/)
- [Vite 8](https://vitejs.dev/)

**Styling & Design**

- [Tailwind CSS v4](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

**Animations & 3D**

- [Framer Motion](https://framer.com/motion/) (Micro-interactions, Mount logic)
- [GSAP](https://gsap.com/) & ScrollTrigger (Scroll-tied timelines)
- [Three.js](https://threejs.org/) / [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/) / Drei (3D Rendering)
- [Lenis](https://lenis.studiofreight.com/) (Smooth Scrolling)

**Utilities**

- [React-PDF](https://github.com/wojtekmaj/react-pdf) (PDF parsing and display)
- [EmailJS](https://www.emailjs.com/) (Contact pipeline)

<br/>

## 💻 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/my-portfolio.git
   cd my-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add your `EmailJS` credentials so the contact form functions correctly:

   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

   > App will be accessible at `http://localhost:5173`

5. **Build for Production**

   ```bash
   npm run build
   ```

<br/>

## 📂 Project Structure

```text
my-portfolio/
├── public/                 # Static assets, images, and raw PDFs
├── src/
│   ├── components/         # Modular React UI components
│   ├── context/            # React Context (e.g., ThemeProvider)
│   ├── data/               # Local JSON-like data (portfolio.js)
│   ├── App.jsx             # Main Router/Layout
│   ├── index.css           # Global Tailwind declarations
│   └── main.jsx            # Entry point
├── index.html              # HTML Shell & Head Meta
└── package.json            # Dependencies & Scripts
```

<br/>

## ⚡ Deployment

This project is perfectly optimized for automated deployment platforms like **Vercel** or **Netlify**.

Simply connect your GitHub repository to your preferred platform, set the Framework Preset to `Vite`, and provide the Environment Variables (`VITE_EMAILJS_*`) in the platform settings.

<br/>

---
<div align="center">
  <p>Designed and Developed by <a href="https://github.com/your-username">Satish Raut</a></p>
</div>
