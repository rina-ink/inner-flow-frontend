import { useEffect, useState } from "react";
import { Link } from "react-router";

import useScrolled from "../../hooks/useScrolled";
import { getMe } from "../../services/auth";

type Theme = "light" | "dark";

function Header() {
    const isScrolled = useScrolled();

    const [isMenuOpen, setIsMenuOpen] =
        useState(false);

    const [isAuthenticated, setIsAuthenticated] =
        useState(false);

    const [theme, setTheme] =
        useState<Theme>(() => {
            const savedTheme =
                localStorage.getItem(
                    "inner-flow-theme",
                );

            if (
                savedTheme === "light" ||
                savedTheme === "dark"
            ) {
                return savedTheme;
            }

            return "dark";
        });

    useEffect(() => {
        document.documentElement.dataset.theme =
            theme;

        localStorage.setItem(
            "inner-flow-theme",
            theme,
        );
    }, [theme]);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                await getMe();

                setIsAuthenticated(true);
            } catch {
                setIsAuthenticated(false);
            }
        };

        checkAuthentication();
    }, []);

    const toggleTheme = () => {
        setTheme((current) =>
            current === "light"
                ? "dark"
                : "light",
        );
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header
            className={`
                fixed inset-x-0 top-0 z-50
                transition-all duration-500
                ${
                    isScrolled || isMenuOpen
                        ? "border-b border-current/10 backdrop-blur-md"
                        : "border-b border-transparent"
                }
            `}
            style={{
                background:
                    isScrolled || isMenuOpen
                        ? "color-mix(in srgb, var(--page-bg) 92%, transparent)"
                        : "transparent",
            }}
        >
            <div
                className={`
                    mx-auto flex max-w-7xl items-center justify-between
                    px-6 transition-all duration-500 md:px-10
                    ${isScrolled ? "py-4" : "py-6"}
                `}
            >
                <Link
                    to="/"
                    onClick={closeMenu}
                    className="text-lg font-light tracking-[0.18em]"
                >
                    inner flow
                </Link>

                <nav className="hidden items-center gap-8 text-sm md:flex">
                    <Link to="/massages">
                        massage
                    </Link>

                    <Link to="/booking">
                        booking
                    </Link>

                    <Link to="/journal">
                        journal
                    </Link>

                    <Link
                        to={
                            isAuthenticated
                                ? "/member"
                                : "/login"
                        }
                    >
                        account
                    </Link>
                </nav>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label={`Switch to ${
                            theme === "light"
                                ? "dark"
                                : "light"
                        } theme`}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-current/30 transition-transform duration-300 hover:scale-105"
                    >
                        {theme === "light"
                            ? "◐"
                            : "◑"}
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            setIsMenuOpen(
                                (current) =>
                                    !current,
                            )
                        }
                        aria-expanded={
                            isMenuOpen
                        }
                        aria-label={
                            isMenuOpen
                                ? "Close navigation"
                                : "Open navigation"
                        }
                        className="flex h-9 w-9 items-center justify-center text-xl md:hidden"
                    >
                        {isMenuOpen ? "×" : "≡"}
                    </button>
                </div>
            </div>

            <div
                className={`
                    overflow-hidden px-6 transition-all duration-500 md:hidden
                    ${
                        isMenuOpen
                            ? "max-h-96 pb-10 opacity-100"
                            : "max-h-0 pb-0 opacity-0"
                    }
                `}
            >
                <nav className="flex flex-col items-end gap-6 pt-4 text-xl font-light">
                    <Link
                        to="/massages"
                        onClick={closeMenu}
                    >
                        massage
                    </Link>

                    <Link
                        to="/booking"
                        onClick={closeMenu}
                    >
                        booking
                    </Link>

                    <Link
                        to="/journal"
                        onClick={closeMenu}
                    >
                        journal
                    </Link>

                    <Link
                        to={
                            isAuthenticated
                                ? "/member"
                                : "/login"
                        }
                        onClick={closeMenu}
                    >
                        account
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;