import { NavLink, Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div>
        <header>
            <nav>
                <NavLink to="/" end>All tasks</NavLink> | <NavLink to="/tasks/new">Add a task</NavLink>
            </nav>
            <div>
                <h1>Save my Life!</h1>
                <p>...Organize your everyday life...</p>
            </div>
        </header>

        <main>
            <Outlet />
        </main>

        <footer>
            {new Date().getFullYear()} @ All rights reserved
        </footer>
    </div>
  )
}

export default RootLayout;