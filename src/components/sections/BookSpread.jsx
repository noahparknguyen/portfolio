import { useEffect, useRef, useState } from "react";
import usePager from "../../hooks/usePager";
import Panel from "../ui/Panel";
import Cell from "../ui/Cell";
import Eyebrow from "../ui/Eyebrow";
import ProjectLinks from "../ui/ProjectLinks";
import TextLink from "../ui/TextLink";
import Chevron from "../ui/Chevron";
import BookDevice from "./BookDevice";

// 44px below md and 32px at md, both above WCAG 2.2's 24px minimum target.
function NavButton({ dir, onClick, disabled, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-ink bg-white text-ink disabled:opacity-40 md:h-8 md:w-8"
    >
      <Chevron dir={dir} />
    </button>
  );
}

function NavSpacer() {
  return <span aria-hidden="true" className="h-11 w-11 md:h-8 md:w-8" />;
}

// The body of one page, by kind. The head and folio live in <Page>.
function PageBody({ page, project, titleId }) {
  if (page.kind === "title") {
    return (
      <div className="flex h-full flex-col justify-center text-center">
        {/* The title page carries the book's h3. Later spreads run it as the
            verso's head, so each spread has one h3 above its chapter's h4. */}
        <h3
          id={titleId}
          className="font-display text-3xl font-bold leading-tight text-ink"
        >
          {project.title}
        </h3>
        <div
          aria-hidden="true"
          className={`mx-auto mt-4 h-0.5 w-16 ${project.spineTint}`}
        />
        <div className="mt-6 flex justify-center">
          <BookDevice mark={project.mark} size="title" />
        </div>
        <Eyebrow as="p" className="mt-6">
          {project.imprint}
        </Eyebrow>
      </div>
    );
  }

  if (page.kind === "stats") {
    return (
      <div>
        {/* `order` shows the number first while the markup keeps the label as
            the <dt>, so each pair is read once, label then value. */}
        <dl className="flex flex-col gap-2">
          {page.items.map((s) => (
            <div
              key={s.label}
              className="flex items-baseline gap-3 border-b-2 border-ink pb-2"
            >
              <dt className="order-2 text-sm text-gray-700">{s.label}</dt>
              <dd className="order-1 font-display text-3xl font-bold leading-none text-ink">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-sm text-gray-600">{page.note}</p>
      </div>
    );
  }

  if (page.kind === "colophon") {
    return (
      <div>
        {/* Labelled, so the list is announced with its heading rather than
            as a bare list. */}
        <Eyebrow as="p" id={`${titleId}-stack`}>
          Printed with
        </Eyebrow>
        <ul
          aria-labelledby={`${titleId}-stack`}
          className="mt-2 flex flex-wrap text-sm text-gray-700"
        >
          {page.stack.map((tool, n) => (
            <li key={tool}>
              {tool}
              {n < page.stack.length - 1 && (
                <span aria-hidden="true">{"\u00a0·\u00a0"}</span>
              )}
            </li>
          ))}
        </ul>

        {/* The cover's links repeat here, so a reader who finishes the book
            can reach them without closing it. */}
        <Eyebrow as="p" className="mt-6">
          Where to find it
        </Eyebrow>
        <div className="mt-2">
          <ProjectLinks
            liveUrl={project.liveUrl}
            liveLabel={project.liveLabel}
            repoUrl={project.repoUrl}
            title={project.title}
            liveNote={project.liveNote}
          />
        </div>
      </div>
    );
  }

  // A paragraph is a string, or `{ parts }` when it carries an inline link,
  // which keeps projects.js free of JSX.
  return (
    <div className="flex flex-col gap-2">
      {page.paragraphs.map((para, n) => (
        <p key={n} className="text-sm text-gray-700">
          {typeof para === "string"
            ? para
            : para.parts.map((part, i) =>
                part.href ? (
                  <TextLink key={i} href={part.href} accent="orchid" external>
                    {part.linkText}
                  </TextLink>
                ) : (
                  <span key={i}>{part.text}</span>
                ),
              )}
        </p>
      ))}
      {page.marginNote && (
        <p className="mt-2 text-right font-hand text-xl text-label">
          {page.marginNote}
        </p>
      )}
    </div>
  );
}

// One page: a head, the body, and a foot with the folio and a page-turn control.
// Only the body scrolls, and only at md. The spread passes in the head and the
// controls, since the left and right pages carry different ones.
function Page({ page, project, titleId, head, folio, navLeft, navRight }) {
  const bodyRef = useRef(null);
  const [scrollable, setScrollable] = useState(false);

  // A region that scrolls needs a tab stop to be reachable by keyboard (WCAG
  // 2.1.1). It's measured rather than assumed, so only a page that overflows
  // gets one. Re-measured on resize and once the webfont loads, since both
  // move where the text ends.
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const check = () => setScrollable(el.scrollHeight > el.clientHeight + 1);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    document.fonts?.ready.then(check);
    return () => observer.disconnect();
  }, [page]);

  return (
    <div className="relative flex h-full w-full flex-col p-4 md:p-6">
      {head && (
        <>
          {head}
          <div className="mt-1 shrink-0 border-b-2 border-ink" />
        </>
      )}

      <div
        ref={bodyRef}
        tabIndex={scrollable ? 0 : undefined}
        className={`devlog-scroll md:min-h-0 md:flex-1 md:overflow-y-auto md:pr-1 ${head ? "mt-4" : ""}`}
      >
        <PageBody page={page} project={project} titleId={titleId} />
      </div>

      <div className="mt-2 flex shrink-0 items-center justify-between">
        {navLeft ?? <NavSpacer />}
        {/* A bare "7" read out on its own means nothing. */}
        <p className="font-mono text-xs text-label">
          <span className="sr-only">Page </span>
          {folio}
        </p>
        {navRight ?? <NavSpacer />}
      </div>
    </div>
  );
}

function BookSpread({ project, onClose }) {
  const spreads = project.spreads;
  const { index: i, go, swipe } = usePager(spreads.length);
  const spread = spreads[i];
  const articleRef = useRef(null);
  const titleId = `book-${project.id}-title`;

  // Focus follows the book, since the cover it was on no longer exists. The
  // <article> takes it so the scroll lands on the top of the book.
  useEffect(() => {
    articleRef.current?.focus();
  }, []);

  // On a phone the pages stack, so a turn from the foot of the second page
  // leaves the reader below the new first one. After a turn, scroll the top of
  // the book back into view, but only when it's under the sticky nav. Tracked
  // by spread, so React's development double run of effects isn't a turn.
  const shownSpread = useRef(i);
  useEffect(() => {
    if (shownSpread.current === i) return;
    shownSpread.current = i;
    const el = articleRef.current;
    if (!el) return;
    const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
    if (el.getBoundingClientRect().top < margin) {
      el.scrollIntoView({ block: "start" });
    }
  }, [i]);

  // The book opens on page 1, so odd numbers fall on the left, against print
  // convention on purpose.
  const versoFolio = i * 2 + 1;
  const versoIsTitle = spread.verso.kind === "title";

  // The left page runs the book's title and the right its chapter, one h3 and
  // one h4 per spread. On the title spread the h3 is in the page body instead.
  const versoHead = versoIsTitle ? null : (
    <Eyebrow id={titleId} className="shrink-0 truncate">
      {project.title}
    </Eyebrow>
  );

  const rectoHead = (
    <h4 className="shrink-0 font-display text-xl font-semibold leading-tight text-ink">
      {spread.chapter}
    </h4>
  );

  return (
    <article
      ref={articleRef}
      tabIndex={-1}
      aria-labelledby={titleId}
      className="mt-6 scroll-mt-16 md:scroll-mt-4"
    >
      <div className="relative mx-auto">
        {/* The page block. Its 4px offset is the book's depth, so it has no
            shadow. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 translate-x-1 translate-y-1 border-2 border-ink bg-paper"
        />

        {/* The bookmark ribbon closes the book. It sits over the case
            (`z-10`) and under the pages (`z-20`), and pokes out of the top,
            which is what the article's `mt-6` clears. The clip-path clips hit
            testing too, leaving 32px to 46px clickable, above WCAG 2.2's 24px
            minimum. The name says which book, since "Close" alone is
            ambiguous next to the page-turn controls. */}
        <button
          type="button"
          onClick={onClose}
          aria-label={`Close the ${project.title} book`}
          className={`eyebrow absolute -top-8 right-8 z-10 h-13.5 border-2 border-ink ${project.coverTint} px-3 pt-4 text-ink transition-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5 [clip-path:polygon(0_0,50%_25%,100%_0,100%_100%,0_100%)]`}
        >
          Close
        </button>

        {/* The cover's case, in the book's own colour. */}
        <div
          className={`relative border-2 border-ink ${project.coverTint} p-3`}
          {...swipe}
        >
          {/* Panel's 2px seam is the gutter. A fixed height at md, since a
              book doesn't resize when you turn a page: 452px of pages makes
              the open book the closed cover's 480px. Auto below md, where it
              would nest a scroll region inside the scrolling page. Cell's
              `min-h-0` lets an over-long page scroll instead of growing past
              the border. */}
          <Panel as="div" className="relative z-20 md:h-113 md:grid-cols-2">
            <Cell bg="bg-paper" padding="p-0">
              <Page
                page={spread.verso}
                project={project}
                titleId={titleId}
                head={versoHead}
                folio={versoFolio}
                navLeft={
                  <NavButton
                    dir="left"
                    onClick={() => go(i - 1)}
                    disabled={i === 0}
                    label="Previous pages"
                  />
                }
              />
            </Cell>
            <Cell bg="bg-paper" padding="p-0">
              <Page
                page={spread.recto}
                project={project}
                titleId={titleId}
                head={rectoHead}
                folio={versoFolio + 1}
                navRight={
                  <NavButton
                    dir="right"
                    onClick={() => go(i + 1)}
                    disabled={i === spreads.length - 1}
                    label="Next pages"
                  />
                }
              />
            </Cell>
          </Panel>
        </div>
      </div>

      {/* Announces the printed folios, not the spread index, so the spoken
          count matches the page. */}
      <p aria-live="polite" className="sr-only">
        {`Pages ${versoFolio} and ${versoFolio + 1} of ${spreads.length * 2}. ${spread.chapter}.`}
      </p>
    </article>
  );
}

export default BookSpread;
