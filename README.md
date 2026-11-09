# Save My Life

## Description
Save My Life is a personal organizing app built with React and TypeScript. Instead of a game backlog, this app helps me organize my daily life with categories like School, LIA, Career, and Personal tasks. The app connects to an external API (Shelf API) to fetch, create, update, and delete tasks.

## Tech Stack
* **React** (Component structure and logic)
* **TypeScript** (Type safety for the code)
* **React Router** (Navigation between pages)
* **Vite** (Build tool)
* **Custom Hooks** (To separate fetch logic from components)
* **LocalStorage** (To save the filter state)
* **Shelf API** (The database backend)

## Features
* **Create tasks** (POST request with form validation)
* **View all tasks** (GET request on the main page)
* **View task details** (GET ONE request for a specific task page)
* **Edit tasks** (PATCH request to update information)
* **Delete tasks** (DELETE request to remove a task)
* **Filter tasks** (Filter the list by category, status, and priority)
* **Save filters** (Filters stay active even if you reload the page)

---

## My Custom Hooks (VG Requirement)
To keep the code clean and structured, I have moved the API calls and fetch logic away from the page components into dedicated custom hooks. 

* `useTasks`: Fetches all items from the API and handles the sorting and filtering logic for the list.
* `useTask`: Fetches data for one specific task based on its ID to show it on the details page.
* `useSaveTasks`: Collects the functions to add, edit, and delete tasks (`addTask`, `editTask`, `deleteTask`).
* `useLocalStorage`: A custom hook that saves the selected filters in the browser memory.

**Why this structure?**
By separating the fetch logic from the visual components, the code becomes much easier to read, fix, and update. The components can focus on showing the UI, while the hooks handle the data.

---

## Development Status
* ✅ **Task List** (Done and working with filters)
* ✅ **Task Details** (Done and showing full task details)
* ✅ **Create Task** (Done with form validation)
* 🔄 **Edit Task (PATCH)** (In progress)
* 🔄 **LocalStorage Filters** (Planned)
* 🔄 **Deployment & README** (Planned)

---

## How to run the project locally

### Installation
1. Clone the repository from GitHub:
   ```bash
   git clone https://github.com
   ```
2. Go into the project folder:
   ```bash
   cd Save-My-Life
   ```
3. Install all dependencies:
   ```bash
   npm install
   ```
4. Start the local server to view the app:
   ```bash
   npm run dev
   ```
