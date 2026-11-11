# Save My Life

## Description
Save My Life is a personal organizing app built with React and TypeScript. Instead of a game backlog, this app helps me organize my daily life with categories like School, LIA, Career, Home, and Personal tasks. The app connects to an external REST API (Shelf API) to fetch, create, update, and delete tasks.

* **API Handle:** `helena`
* **Target Grade:** VG

## Idea & Vision

While the underlying structure is inspired by a previous course exercise, **Save My Life** is designed and built to be a real, everyday tool that I actually want and need to use myself. 

In contrast to my more experimental portfolio projects, my main goal here was to keep the interface **clean, neutral, and distraction-free**. For a task manager to work in daily life, it cannot feel overwhelming or cluttered with unnecessary features. Everything is intentionally kept simple, readable, and easy to navigate—making it effortless to open up, filter what needs to be done right now, and get on with my day.

Alongside a calm user interface, I put a strong focus on building a **clean and scalable folder structure** behind the scenes. By organizing the codebase into dedicated folders (`components`, `pages`, `hooks`, `types`, `data`, and `utils`), every file has a clear responsibility and is easy to find, maintain, and build upon.

## Tech Stack
* **React** (Component structure and state logic)
* **TypeScript** (Type safety across components and hooks)
* **React Router** (Client-side routing, nested layouts, and 404 handling)
* **Vite** (Fast development server and build tool)
* **Custom Hooks** (Separation of API logic, timers, and LocalStorage)
* **CSS** (Custom styling with category badges and responsive filters)
* **Shelf API** (External REST backend)

## Features
* **View all tasks** (GET request on the main page with responsive cards)
* **View task details** (GET ONE request for a specific task page)
* **Create tasks** (POST request with live form validation)
* **Edit tasks** (PATCH request using a reusable, pre-filled form)
* **Delete tasks** (DELETE request to remove tasks)
* **Filter tasks** (Filter the list by category, status, and priority)
* **Form validation** (Required field checks, live error clearing, and timed error banner)
* **Timed navigation** (Automatic redirect with feedback messages after saving)
* **Save filters** (Filters stay active even if you reload the page)

---

## My Custom Hooks (VG Requirement)
To keep the code clean, reusable, and easy to maintain, I have moved all API calls, browser storage, and navigation timers out of the UI components into dedicated custom hooks.

* `useTasks`: Fetches all items from the API and handles the multi-criteria filtering logic (category, status, and priority) for the main list.
* `useTask`: Fetches data for one specific task based on its URL ID to display it on the details and edit pages.
* `useSaveTasks`: Collects all data-mutating API requests (`addTask`, `editTask`, `deleteTask`) along with loading, error, and success message states.
* `useTimedNavigate`: Handles delayed navigation after a successful save or update, giving the user time to read confirmation messages before redirecting.
* `useLocalStorage`: A generic custom hook prepared to persist selected filter states in browser storage across page reloads.

**Why this structure?**
By separating the data-fetching and business logic from the visual components, the code follows the Single Responsibility Principle. The components focus purely on rendering the interface and user interactions, while the hooks manage the state and external communication.

---

## Development Status
* ✅ **Task List** (Done and working with multi-filter support)
* ✅ **Task Details** (Done with formatted dates, priority labels, and 404 handling)
* ✅ **Create Task (POST)** (Done with timed redirect)
* ✅ **Edit Task (PATCH)** (Done with pre-filled reusable form)
* ✅ **Form Validation** (Done with live field clearing and timed error message)
* 🔄 **LocalStorage Filters** (In progress)
* 🔄 **Deployment on Vercel** (Planned)

---

## How to run the project locally

### Installation
1. Clone the repository from GitHub:
   ```bash
   git clone https://github.com/Helena-Gustafsson/save-my-life
   ```
2. Go into the project folder:
   ```bash
   cd save-my-life
   ```
3. Install all dependencies:
   ```bash
   npm install
   ```
4. Start the local server to view the app:
   ```bash
   npm run dev
   ```
