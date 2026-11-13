const root = document.documentElement;
const mq = window.matchMedia("(prefers-color-scheme: dark)");
const systemTheme = () => (mq.matches ? "dark" : "light");

function getStoredTheme() {
    try {
        const t = localStorage.getItem("theme");
        return t === "light" || t === "dark" ? t : null;
    } catch {
        return null;
    }
}

function setStoredTheme(theme) {
    try {
        localStorage.setItem("theme", theme);
    } catch {}
}

function clearStoredTheme() {
    try {
        localStorage.removeItem("theme");
    } catch {}
}

function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    const toggle = document.getElementById("theme-toggle");
    if (toggle) toggle.checked = theme === "dark";
}

// this file loads in the <head> without defer, so this runs before the page is drawn and a saved theme never flashes.
applyTheme(getStoredTheme() ?? systemTheme());

// the checkbox is in the footer, so wire it up once the page has loaded.
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("theme-toggle");
    if (!toggle) return;

    toggle.checked = root.getAttribute("data-theme") === "dark";

    toggle.addEventListener("change", () => {
        const next = toggle.checked ? "dark" : "light";
        applyTheme(next);

        if (next === systemTheme()) {
            clearStoredTheme(); // matches system → stop overriding
        } else {
            setStoredTheme(next); // diverges → remember it
        }
    });
});

// keep following the os, but only while there's no override.
mq.addEventListener("change", () => {
    if (getStoredTheme() === null) applyTheme(systemTheme());
});
