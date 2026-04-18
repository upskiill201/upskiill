# Team Setup & Efficiency Guide: Teyro Project

Based on the architectural analysis of the **Teyro** (monorepo-style) codebase, here are the essential VS Code extensions and configurations your team needs to move fast and maintain code quality.

## 1. Core Development (Critical)

These are non-negotiable for anyone touching the code to ensure formatting and types stay consistent.

| Extension | Purpose | Why for Teyro? |
| :--- | :--- | :--- |
| **[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)** | Static Analysis | We use **ESLint 9 (Flat Config)** in both frontend and backend to catch bugs before they reach production. |
| **[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)** | Code Formatter | The backend has a strict `.prettierrc`. This prevents "diff noise" in Git caused by different people having different tab settings. |
| **[TypeScript Nightly](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)** | TS Support | We are using **React 19** and **Next.js 16**. The latest TS engine ensures you get perfect IntelliSense for the newest features. |

---

## 2. Frontend Excellence (Tailwind v4 + Next.js)

Since we are using the cutting-edge **Tailwind CSS v4** and complex **Framer Motion** animations, these are vital.

- **[Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)**: Required for v4 CSS-first configuration. It provides autocomplete for your custom classes and brand colors.
- **[ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)**: Fast boilerplate for new components (use `rfce` or `rafce`).
- **[Console Ninja](https://marketplace.visualstudio.com/items?itemName=WallabyJs.console-ninja)**: (Highly Recommended) Displays logs directly in your code editor as you develop. Great for debugging the Tally webhook responses.

---

## 3. Backend & Database (NestJS + Prisma)

The backend is a robust NestJS 11 application powered by Prisma ORM.

- **[Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)**: Essential for the `schema.prisma` file. It gives you syntax highlighting and formats your database schema on save.
- **[Nestjs Snippets](https://marketplace.visualstudio.com/items?itemName=mikael.angular-es6-snippets)**: (Or similar) Speeds up the creation of Controllers, Services, and Modules.
- **[Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)**: A lightweight alternative to Postman that lives inside VS Code. Use it to test the `/webhook/count` and auth endpoints.

---

## 4. Operational & Visual Productivity

- **[GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)**: Essential for "Building in Public." It shows you who changed what line and when, helping the team coordinate on the `feat/teyro-waitlist-header` style branches.
- **[Path IntelliSense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)**: Autocompletes filenames for imports and images in the `public/` folder.
- **[Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)**: Makes the file tree much easier to navigate by adding distinct icons for Next.js, NestJS, and Prisma files.

---

## 5. GLSL / Three.js (Optional)

Since we have high-end cinematic components like `TubesBackground.tsx` and `Hyperspeed.tsx`:
- **[Shader languages support](https://marketplace.visualstudio.com/items?itemName=slevesque.shader)**: If any dev needs to tweak the raw WebGL/Shader code in the UI components.

---

> [!TIP]
> **Pro Tip for the Team:**
> The repository now includes `.vscode/extensions.json` and `.vscode/settings.json`. When a new developer joins and opens the folder, VS Code will automatically pop up a message saying: *"This workspace has recommended extensions. Do you want to install them?"* and "Format on Save" will be enabled by default.
