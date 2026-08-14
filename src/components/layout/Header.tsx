import { useEffect, useState } from "react";
import { Link } from "react-router";

type Theme = "light" | "dark";

function Header() {
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem("inner-flow-theme");
        
        return savedTheme === "dark" ? "dark" : "light";
    });

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem("inner-flow-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((current) =>
            current === "light" ? "dark" : "light",
        );
    };

    return (
        <header className="fixed inset-x-0 top-0 z-50">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10">
                <Link
                    to="/"
                    className="text-lg font-light tracking-[0.18em]"
                >
                    inner flow
                </Link>

                <nav className="hidden items-center gap-8 text-sm md:flex">
                    <Link to="/massages">massage</Link>
                    <Link to="/booking">booking</Link>
                    <Link to="/journal">journal</Link>
                    <Link to="/login">account</Link>
                </nav>

                <button
                    type="button"
                    onClick={toggleTheme}
                    aria-label={`Switch to ${
                        theme === "light" ? "dark" : "light"
                    } theme`}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-current/30 transition-transform duration-300 hover:scale-105"
                >
                    {theme === "light" ? "◐" : "◑"}
                </button>
            </div>
        </header>
    );
}

export default Header;