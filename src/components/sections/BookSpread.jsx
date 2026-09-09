import { useEffect, useRef, useState } from "react";
import Panel from "../ui/Panel";
import Cell from "../ui/Cell";
import Eyebrow from "../ui/Eyebrow";
import ProjectLinks from "../ui/ProjectLinks";
import TextLink from "../ui/TextLink";
import Chevron from "../ui/Chevron";

// Page-turn controls live in the outer bottom corners — where a thumb turns a
// page — and carry no border or fill of their own, so the book's furniture stays
// quieter than the page. 44px below md drops to 32px at md, both clear of the
// 24px floor under Accessibility → Touch targets.
function NavButton({ dir, onClick, disabled, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center text-label transition-colors hover:text-ink disabled:opacity-25 disabled:hover:text-label md:h-8 md:w-8"
    >
      <Chevron dir={dir} className="h-5 w-5" />
    </button>
  );
}

function NavSpacer() {
  return <span aria-hidden="true" className="h-11 w-11 md:h-8 md:w-8" />;
}

// The four page kinds, each rendering the body of one page. Chapter heading,
// running head and folio are furniture and live in <Page> around these.
function PageBody({ page, project, titleId }) {
  if (page.kind === "title") {
    return (
      <div className="flex h-full flex-col justify-center text-center">
        {/* The title page carries the book's h3. On every later spread that
            heading is the verso's running head instead, so each spread has
            exactly one h3 above its chapter's h4 and the outline never skips
            a level. */}
        <h3
          id={titleId}
          className="font-display text-3xl font-bold leading-tight text-ink"
        >
          {project.title}
        </h3>
        <div aria-hidden="true" className="mx-auto mt-4 h-0.5 w-16 bg-orchid" />
        <p className="mt-4 text-sm text-gray-700">{project.summary}</p>
        <Eyebrow as="p" className="mt-6">
          {project.imprint}
        </Eyebrow>
      </div>
    );
  }

  if (page.kind === "stats") {
    return (
      <div>
        {/* The label is the <dt> and the number the <dd>, with `order` putting
            the number first visually. It used to be an sr-only <dt> plus a
            visible <p> holding the same words, which read the label out twice
            and left the pairing implicit. */}
        <dl className="flex flex-col gap-3">
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
        {/* aria-labelledby ties the list to its label, so the stack is
            announced as "Printed with, list, 6 items" rather than as a bare
            list following an unrelated line of text. */}
        <Eyebrow as="p" id={`${titleId}-stack`}>
          Printed with
        </Eyebrow>
        <ul
          aria-labelledby={`${titleId}-stack`}
          className="mt-2 flex flex-wrap gap-2"
        >
          {page.stack.map((tool) => (
            <li
              key={tool}
              className="border border-ink bg-white px-2 py-0.5 text-sm text-ink"
            >
              {tool}
            </li>
          ))}
        </ul>

        {/* The links repeat here from the cover on purpose. A reader who has
            just finished the book is the one most likely to want them, and by
            then the cover is no longer in front of them — without this they
            would have to close the book to reach a link. The back of a book is
            where production details belong anyway. */}
        <Eyebrow as="p" className="mt-6">
          Where to find it
        </Eyebrow>
        <div className="mt-2">
          <ProjectLinks
            liveUrl={project.liveUrl}
            repoUrl={project.repoUrl}
            title={project.title}
            liveNote={project.liveNote}
          />
        </div>
      </div>
    );
  }

  // A paragraph is either a plain string or `{ parts: [...] }` for the rare one
  // carrying an inline link. The parts shape is the same one Credits uses, and
  // it exists so `src/lib/projects.js` can stay free of JSX (see Book.jsx) while
  // still citing a source properly.
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

// One page: a head at the top, body in the middle, and a foot carrying the folio
// with its page-turn control in the outer corner. The body is the only part that
// scrolls, and only at md — see the height note on the spread below.
//
// `head` and the nav slots are passed in rather than derived here because the
// two pages follow the print convention and carry different things: the verso
// runs the book's title and the back control, the recto its chapter and forward.
function Page({ page, project, titleId, head, folio, navLeft, navRight }) {
  const bodyRef = useRef(null);
  const [scrollable, setScrollable] = useState(false);

  // A region that scrolls must be reachable by keyboard (WCAG 2.1.1) — Devlog
  // and the passport panel both carry `tabIndex={0}` for exactly this, and this
  // one did not. It is measured rather than assumed, so the tab stop only
  // exists on a page that actually overflows: copy is written to a page budget,
  // so most pages never scroll, and a permanent stop on every page would add
  // two dead stops per spread. Re-measured on resize and after the webfont
  // swaps in, since both change where the text ends.
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
      {/* The rule belongs to the head, so a title page — which carries neither a
          running head nor a chapter, as in print — gets neither, rather than a
          rule ruling nothing off. */}
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
        {/* A bare "7" read out on its own means nothing; the prefix is
            sr-only so the printed folio stays a printed folio. */}
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
  const [i, setI] = useState(0);
  const spreads = project.spreads;
  const spread = spreads[i];
  const articleRef = useRef(null);
  const touchStart = useRef(null);
  const titleId = `book-${project.id}-title`;

  const go = (n) => setI(Math.max(0, Math.min(spreads.length - 1, n)));

  // The book has just replaced the cover the user activated, so focus has to
  // follow it or it is left on a button that no longer exists. Same move
  // Statmon itself makes on route change (its D-038). The target is the
  // <article> so the scroll it triggers lands on the top of the book.
  useEffect(() => {
    articleRef.current?.focus();
  }, []);

  // Start/end deltas only, no touchmove and no preventDefault, so a mostly
  // vertical swipe is ignored rather than stolen from the page scroll.
  const onTouchStart = (e) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) < 50 || Math.abs(dx) <= Math.abs(dy)) return;
    go(dx < 0 ? i + 1 : i - 1);
  };

  // The first thing you see when the book opens is page 1. That puts odd
  // numbers on the LEFT, inverting the print convention — deliberately: this
  // book's title page is already on the verso rather than the recto, so it was
  // never a faithful opening, and "I opened the book and it started on page 2"
  // is a worse thing to explain than a broken pedantry.
  const versoFolio = i * 2 + 1;
  const versoIsTitle = spread.verso.kind === "title";

  // Verso runs the book's title, recto its chapter — the print convention, and
  // it also keeps the outline at exactly one h3 and one h4 per spread. On the
  // first spread the verso IS the title page, so its h3 lives in the page body
  // instead and the head slot stays empty.
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
        {/* The page block, matching the closed book's. */}
        <span
          aria-hidden="true"
          className="shadow-sticker pointer-events-none absolute inset-0 translate-x-1 translate-y-1 border-2 border-ink bg-paper"
        />

        {/* The bookmark ribbon closes the book — the thing you actually reach
            for when you put one down. It sits BEHIND the pages and pokes out of
            the top, the way a bookmark actually sits in a book, which is why the
            article carries `mt-6` to clear the intro card above.

            Being behind means the visible 32px IS the hit area — a clip-path
            clips hit testing, and the covered part is unreachable. That clears
            the 24px floor under Accessibility → Touch targets, but not the 44px
            the nav and footer badges take; closing also has a swipe-free escape
            in simply scrolling past, so the smaller target is accepted here.

            It takes orchid-SOFT rather than the full orchid the decorative
            version used: ink on full orchid measures ~3.3:1 and fails AA, and
            this one has text on it. Its accessible name goes beyond the visible
            "Close", which is ambiguous read out alongside the page-turn
            controls. */}
        <button
          type="button"
          onClick={onClose}
          aria-label={`Close the ${project.title} book`}
          className="eyebrow absolute -top-8 right-8 border-2 border-ink bg-orchid-soft px-3 pb-2 pt-3.5 text-ink transition-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5 [clip-path:polygon(0_0,50%_25%,100%_0,100%_100%,0_100%)]"
        >
          Close
        </button>

        <div
          className="relative"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Panel's 2px ink seam is the gutter. md:grid-cols-2 makes it a
              VERTICAL spine — the passport uses the same primitive with
              md:grid-rows-2, a horizontal fold, so the two objects don't read
              as the same thing.

              Fixed height at md because a book doesn't resize when you turn a
              page, and the closed cover matches it; auto below md, where a fixed
              height would force a scroll region inside a scrolling page and
              leave the reader unable to predict which one moves.

              The cells carry `min-h-0` because a grid item defaults to
              `min-height: auto` and so refuses to shrink below its content.
              Without it an over-long page did not scroll — it grew the cell
              past the panel's fixed height and spilled outside the book's
              border. This is the guard; copy is still written to fit. */}
          <Panel as="div" className="md:h-120 md:grid-cols-2">
            <Cell bg="bg-paper" padding="p-0" className="min-h-0">
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
            <Cell bg="bg-paper" padding="p-0" className="min-h-0">
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

      {/* Announces the folios actually printed on the pages, not the spread
          index — "Page 1 of 5" alongside pages numbered 1 and 2 was two
          different counts for the same thing. */}
      <p aria-live="polite" className="sr-only">
        {`Pages ${versoFolio} and ${versoFolio + 1} of ${spreads.length * 2}. ${spread.chapter}.`}
      </p>
    </article>
  );
}

export default BookSpread;
