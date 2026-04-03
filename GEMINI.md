# PGRI PUSPA MEKAR - Project Overview

PGRI Puspa Mekar is a digital project focused on developing a website/application for **Sekolah TK** (Kindergarten School). The project is structured with a central documentation directory and a dedicated Next.js application.

## Project Structure

- **docs/**: Contains project specifications and documentation.
  - `spec.md`: Project specification (currently in progress).
- **sekolah_tk/**: The main web application built with Next.js.
  - `app/`: Next.js App Router directory.
  - `public/`: Static assets (SVG logos, favicons, etc.).

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Runtime**: Node.js

## Getting Started (Development)

To work on the `sekolah_tk` application:

1.  Navigate to the application directory:
    ```bash
    cd sekolah_tk
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
4.  The application will be available at `http://localhost:3000`.

## Building and Testing

Available scripts in `sekolah_tk`:

- `npm run build`: Build the production-ready application.
- `npm run start`: Start the production server after building.
- `npm run lint`: Run ESLint to check for code quality issues.

## Development Conventions

- **Next.js App Router**: Use the `app/` directory for routing and components.
- **TypeScript**: Ensure all new components and logic are properly typed.
- **Tailwind CSS**: Utilize Tailwind utility classes for styling.
- **Documentation**: Keep `docs/spec.md` updated with any architectural or feature changes.
