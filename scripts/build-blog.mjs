import { marked } from "marked";
import {
    globSync,
    mkdirSync,
    readFileSync,
    watch,
    writeFileSync,
} from "node:fs";
import { basename } from "node:path";

const postsDir = "src/blog/posts";
const blogDir = "src/blog";

// The blog list has no Markdown file, so its search result summary lives
// here. Lowercase, like the other pages' descriptions.
const listDescription =
    "a space to talk about the tech world, personal interests, and the occasional hot take.";

// The OG image's alt text, the same on every page. The hand-written pages
// have their own copy in their heads.
const ogImageAlt =
    '"npn" logo centered on a background split diagonally between dark mode on the top left and light mode on the bottom right.';

const watching = process.argv.includes("--watch");

// Also escapes double quotes, so the text is safe inside an attribute like
// content="…" as well as between tags.
function escapeHtml(text) {
    return text
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
}

function slugify(name) {
    return (
        name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-") || "untitled"
    );
}

// A post's date, written the same way everywhere on the blog: muted and in
// parentheses, like the dates on the other pages.
const postDate = (date) =>
    `<small>(<time datetime="${date}">${date}</time>)</small>`;

// Every page shares this shell, copied from the home page like the other
// pages: the same head, nav and footer. Paths start with "/" so they work at
// any folder depth. `description` is the page's search result summary,
// `path` and `type` fill in the link preview (OG) tags, and `current` is the
// nav link to mark as the page you're on.
function layout({ title, description, path, type, content, current }) {
    const link = (href, label) =>
        `<a href="${href}"${href === current ? ' aria-current="page"' : ""}>${label}</a>`;

    return `
        <!doctype html>
        <html lang="en-CA">
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width" />
                <title>${title} – noah park-nguyen</title>
                <meta name="description" content="${description}" />
                <meta property="og:type" content="${type}" />
                <meta property="og:url" content="https://noahpn.dev${path}" />
                <meta property="og:title" content="${title} – noah park-nguyen" />
                <meta property="og:description" content="${description}" />
                <meta property="og:image" content="https://noahpn.dev/assets/images/og.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="${escapeHtml(ogImageAlt)}" />
                <link href="/assets/css/output.css" rel="stylesheet" />
                <link rel="icon" href="/favicon.ico" sizes="32x32" />
                <link rel="icon" href="/icon.svg" type="image/svg+xml" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <script src="/assets/js/theme.js"></script>
            </head>
            <body>
                <header>
                    <nav>
                        ${link("/", "Home")}
                        ${link("/now/", "Now")}
                        ${link("/blog/", "Blog")}
                        ${link("/colophon/", "Colophon")}
                    </nav>
                </header>
                <main>
                    ${content}
                </main>

                ${footer}
            </body>
        </html>
    `;
}

// A copy of the home page's footer, with the dark mode toggle.
const footer = `
    <hr />

    <footer class="flex items-center justify-between">
        <ul role="list" class="flex gap-5 text-sm">
            <li>
                <a href="mailto:noahparknguyen@gmail.com">Gmail</a>
            </li>
            <li>
                <a
                    href="https://github.com/noahparknguyen"
                    target="_blank"
                    rel="noopener noreferrer"
                    >GitHub</a
                >
            </li>
            <li>
                <a
                    href="https://www.linkedin.com/in/noahparknguyen"
                    target="_blank"
                    rel="noopener noreferrer"
                    >LinkedIn</a
                >
            </li>
        </ul>
        <label
            class="inline-flex cursor-pointer items-center select-none has-focus-visible:outline-2 has-focus-visible:outline-offset-2 noscript:hidden"
        >
            <input
                type="checkbox"
                id="theme-toggle"
                role="switch"
                aria-label="Dark mode"
                class="peer sr-only"
            />
            <!-- Sun and moon from the Solar Icon Set (Bold) by 480 Design, CC BY 4.0. Copies of src/assets/images/sun.svg and moon.svg. -->
            <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                class="size-6 peer-checked:hidden"
            >
                <path
                    d="M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12Z"
                    fill="currentColor"
                />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V3C12.75 3.41421 12.4142 3.75 12 3.75C11.5858 3.75 11.25 3.41421 11.25 3V2C11.25 1.58579 11.5858 1.25 12 1.25ZM4.39861 4.39861C4.6915 4.10572 5.16638 4.10572 5.45927 4.39861L5.85211 4.79145C6.145 5.08434 6.145 5.55921 5.85211 5.85211C5.55921 6.145 5.08434 6.145 4.79145 5.85211L4.39861 5.45927C4.10572 5.16638 4.10572 4.6915 4.39861 4.39861ZM19.6011 4.39887C19.894 4.69176 19.894 5.16664 19.6011 5.45953L19.2083 5.85237C18.9154 6.14526 18.4405 6.14526 18.1476 5.85237C17.8547 5.55947 17.8547 5.0846 18.1476 4.79171L18.5405 4.39887C18.8334 4.10598 19.3082 4.10598 19.6011 4.39887ZM1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H3C3.41421 11.25 3.75 11.5858 3.75 12C3.75 12.4142 3.41421 12.75 3 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12ZM20.25 12C20.25 11.5858 20.5858 11.25 21 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H21C20.5858 12.75 20.25 12.4142 20.25 12ZM18.1476 18.1476C18.4405 17.8547 18.9154 17.8547 19.2083 18.1476L19.6011 18.5405C19.894 18.8334 19.894 19.3082 19.6011 19.6011C19.3082 19.894 18.8334 19.894 18.5405 19.6011L18.1476 19.2083C17.8547 18.9154 17.8547 18.4405 18.1476 18.1476ZM5.85211 18.1479C6.145 18.4408 6.145 18.9157 5.85211 19.2086L5.45927 19.6014C5.16638 19.8943 4.6915 19.8943 4.39861 19.6014C4.10572 19.3085 4.10572 18.8336 4.39861 18.5407L4.79145 18.1479C5.08434 17.855 5.55921 17.855 5.85211 18.1479ZM12 20.25C12.4142 20.25 12.75 20.5858 12.75 21V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V21C11.25 20.5858 11.5858 20.25 12 20.25Z"
                    fill="currentColor"
                />
            </svg>
            <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                class="hidden size-6 peer-checked:block"
            >
                <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    fill="currentColor"
                />
            </svg>
        </label>
    </footer>
`;

function readPost(path) {
    const text = readFileSync(path, "utf-8").replace(/^[​‌‍‎‏﻿]/, "");

    // Front matter is everything between the first two "---".
    const end = text.indexOf("---", 3);
    const frontMatter =
        text.startsWith("---") && end !== -1 ? text.slice(3, end) : "";
    const date = frontMatter.match(/date:\s*(\d{4}-\d{2}-\d{2})/)?.[1];
    if (!date) {
        throw new Error(`${path}: needs "date: YYYY-MM-DD" in front matter`);
    }
    // The description runs to the end of its own line.
    const description = frontMatter.match(/^\s*description:\s*(.+?)\s*$/m)?.[1];
    if (!description) {
        throw new Error(
            `${path}: needs "description: ..." on its own line in front matter`,
        );
    }

    // The first "# " heading is the title. It comes out of the body because
    // the page prints it above the date.
    const tokens = marked.lexer(text.slice(end + 3));
    const heading = tokens.findIndex(
        (token) => token.type === "heading" && token.depth === 1,
    );
    if (heading === -1) {
        throw new Error(`${path}: needs a "# Title" heading`);
    }
    const title = tokens[heading].text;
    tokens.splice(heading, 1);

    return {
        path,
        date,
        title: escapeHtml(title),
        description: escapeHtml(description),
        // The URL comes from the file name, so editing a title never
        // breaks a link.
        slug: slugify(basename(path, ".md")),
        body: marked.parser(tokens),
    };
}

function build() {
    const posts = globSync(`${postsDir}/*.md`).map(readPost);

    // Newest first. YYYY-MM-DD dates sort correctly as plain text.
    posts.sort((a, b) => b.date.localeCompare(a.date));

    const slugs = new Map();
    for (const post of posts) {
        if (slugs.has(post.slug)) {
            throw new Error(
                `${post.path} and ${slugs.get(post.slug)} would both be /blog/${post.slug}/`,
            );
        }
        slugs.set(post.slug, post.path);

        // A post: the title, its date underneath, then the body.
        const article = `
            <article>
                <header>
                    <h1>${post.title}</h1>
                    <p>${postDate(post.date)}</p>
                </header>
                ${post.body}
            </article>
        `;

        mkdirSync(`${blogDir}/${post.slug}`, { recursive: true });
        writeFileSync(
            `${blogDir}/${post.slug}/index.html`,
            // The tab title and description are lowercase like the other
            // pages, since CSS can't reach them.
            layout({
                title: post.title.toLowerCase(),
                description: post.description.toLowerCase(),
                path: `/blog/${post.slug}/`,
                type: "article",
                content: article,
            }),
        );
    }

    // One post as "(date) title", used for the list and the newest post.
    const line = (post) =>
        `${postDate(post.date)} <a href="/blog/${post.slug}/">${post.title}</a>`;

    const links = posts.map((post) => `<li>${line(post)}</li>`).join("\n");

    // The list page: the same hero as the other pages, with the newest post
    // as the subtitle, then one line per post.
    const latest = posts[0] ? `<p>${line(posts[0])}</p>` : "";
    const list = `
        <div
            class="flex flex-col items-center justify-center gap-10 sm:flex-row"
        >
            <img
                src="/assets/images/silksong-hornet.webp"
                alt="Hornet from Hollow Knight: Silksong swaying back and forth"
                width="212"
                height="209"
                class="w-40"
            />
            <hgroup class="text-center sm:text-left">
                <h1>My recent ramblings</h1>
                ${latest}
            </hgroup>
        </div>
        <hr />
        <ul>
            ${links}
        </ul>
    `;

    if (!listDescription) {
        throw new Error("build-blog.mjs: the blog list needs a description");
    }
    writeFileSync(
        `${blogDir}/index.html`,
        layout({
            title: "blog",
            description: escapeHtml(listDescription),
            path: "/blog/",
            type: "website",
            content: list,
            current: "/blog/",
        }),
    );
    console.log(`Built ${posts.length} blog posts`);
}

function run() {
    try {
        build();
    } catch (error) {
        console.error(error.message);
        // A failed build stops `pnpm build`, so a broken post never deploys.
        // While watching, keep going so you can fix the post and save again.
        if (!watching) process.exitCode = 1;
    }
}

run();

if (watching) {
    // Node doesn't always pass a filename, so rebuild when it's missing.
    watch(postsDir, (eventType, filename) => {
        if (!filename || filename.endsWith(".md")) run();
    });
    console.log(`Watching ${postsDir} for changes`);
}
