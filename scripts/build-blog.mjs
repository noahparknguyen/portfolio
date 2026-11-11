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
const watching = process.argv.includes("--watch");

function escapeHtml(text) {
    return text
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
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

// Every page shares this shell. The stylesheet path starts with "/" so it
// works at any folder depth.
function layout(title, content) {
    return `<!doctype html>
<html lang="en-US">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>${title}</title>
        <link href="/output.css" rel="stylesheet" />
    </head>
    <body>
${content}
    </body>
</html>
`;
}

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

        const article = `        <article>
            <h1>${post.title}</h1>
            <p><time datetime="${post.date}">${post.date}</time></p>
${post.body}
        </article>`;

        mkdirSync(`${blogDir}/${post.slug}`, { recursive: true });
        writeFileSync(
            `${blogDir}/${post.slug}/index.html`,
            layout(post.title, article),
        );
    }

    const links = posts
        .map(
            (post) =>
                `            <li><a href="/blog/${post.slug}/">${post.title}</a> <time datetime="${post.date}">${post.date}</time></li>`,
        )
        .join("\n");

    const list = `        <h1>Blog</h1>
        <ul role="list">
${links}
        </ul>`;

    writeFileSync(`${blogDir}/index.html`, layout("Blog", list));
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
