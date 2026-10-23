import { useEffect, useRef, useState } from "react";
import Panel from "../ui/Panel";
import Cell from "../ui/Cell";
import Eyebrow from "../ui/Eyebrow";
import ProjectLinks from "../ui/ProjectLinks";
import TextLink from "../ui/TextLink";
import Chevron from "../ui/Chevron";
import BookDevice from "./BookDevice";

// Page-turn controls live in the outer bottom corners, where a thumb turns a
// page. They're the same boxed ink arrows as the passport's pager, since they
// do the same job. 44px below md drops to 32px at md, both clear of WCAG 2.2's
// 24px minimum target size.
function NavButton({ dir, onClick, disabled, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-ink bg-white text-ink disabled:opacity-40 md:h-8 md:w-8"
    >
      <Chevron dir={dir} strokeWidth="3" />
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
        <div
          aria-hidden="true"
          className={`mx-auto mt-4 h-0.5 w-16 ${project.spineTint}`}
        />
        {/* The book's mark, where a printed title page carries the
            publisher's device. The cover's summary isn't repeated here: the
            reader has just read it. */}
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
        {/* The label is the <dt> and the number the <dd>, with `order` putting
            the number first visually, so the label is read once and the
            pairing is in the markup. */}
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
        {/* aria-labelledby ties the list to its label, so the stack is
            announced as "Printed with, list, 6 items" rather than as a bare
            list following an unrelated line of text. */}
        <Eyebrow as="p" id={`${titleId}-stack`}>
          Printed with
        </Eyebrow>
        {/* Set as a line of type, the way a printed colophon lists what made
            the book. The separators are drawn, not read. */}
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

        {/* The links repeat here from the cover on purpose. A reader who has
            just finished the book is the one most likely to want them, and by
            then the cover is no longer in front of them, so without this
            they'd have to close the book to reach a link. The back of a book
            is where production details belong anyway. */}
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
// scrolls, and only at md: see the height note on the spread below.
//
// `head` and the nav slots are passed in rather than derived here because the
// two pages follow the print convention and carry different things: the verso
// runs the book's title and the back control, the recto its chapter and forward.
function Page({ page, project, titleId, head, folio, navLeft, navRight }) {
  const bodyRef = useRef(null);
  const [scrollable, setScrollable] = useState(false);

  // A region that scrolls must be reachable by keyboard (WCAG 2.1.1), which is
  // why Devlog and the passport panel carry `tabIndex={0}`. Here it's measured
  // rather than assumed, so the tab stop only exists on a page that actually
  // overflows: copy is written to a page budget,
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
      {/* The rule belongs to the head. A title page carries neither a running
          head nor a chapter, as in print, so it gets no rule either, rather
          than one ruling nothing off. */}
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
  // follow it or it's left on a button that no longer exists. Statmon does the
  // same when you change tools. The target is the <article> so the scroll it
  // triggers lands on the top of the book.
  useEffect(() => {
    articleRef.current?.focus();
  }, []);

  // On a phone the two pages stack, so "Next" sits at the foot of the second
  // one, and a turn leaves the reader below the start of the new first page.
  // After a turn, bring the top of the book back into view, but only when it
  // has scrolled out of sight (under the scroll margin that clears the sticky
  // nav), so a turn with the whole book on screen doesn't move the page.
  // Tracked by spread rather than by a first-render flag, so React's
  // development double run of effects can't count as a turn.
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
  // numbers on the left, inverting the print convention on purpose: the title
  // page is on the verso rather than the recto, so it was never a faithful
  // opening, and a book that starts on page 2 is harder to explain than a
  // broken convention.
  const versoFolio = i * 2 + 1;
  const versoIsTitle = spread.verso.kind === "title";

  // Verso runs the book's title and recto its chapter, the print convention,
  // which also keeps the outline at exactly one h3 and one h4 per spread. On
  // the first spread the verso is the title page, so its h3 lives in the page
  // body instead and the head slot stays empty.
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
        {/* The page block, matching the closed book's: its 4px offset is the
            book's depth, so it carries no shadow of its own. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 translate-x-1 translate-y-1 border-2 border-ink bg-paper"
        />

        {/* The bookmark ribbon closes the book: it's the thing you reach for
            when you put one down. It lies between the pages, the way a
            bookmark sits in a book: over the cover's case (`z-10`), under the
            pages (`z-20` on the panel), and poking out of the top, which is why
            the article carries `mt-6` to clear the intro card above.

            The hit area is the part not under the pages: a clip-path clips hit
            testing, so 46px down its edges and 32px down the middle, where the
            notch is cut. That clears WCAG 2.2's 24px minimum.

            It takes the cover's own soft tint, so the ribbon matches its book,
            and ink on every soft tint passes AA. Its accessible name goes
            beyond the visible "Close", which is ambiguous read out alongside
            the page-turn controls. */}
        <button
          type="button"
          onClick={onClose}
          aria-label={`Close the ${project.title} book`}
          className={`eyebrow absolute -top-8 right-8 z-10 h-13.5 border-2 border-ink ${project.coverTint} px-3 pt-4 text-ink transition-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5 [clip-path:polygon(0_0,50%_25%,100%_0,100%_100%,0_100%)]`}
        >
          Close
        </button>

        {/* The cover's case, showing 12px around the pages the way a
            hardcover's case shows around its pages when it lies open. It's the
            book's own colour, so an open book still says which book it is. */}
        <div
          className={`relative border-2 border-ink ${project.coverTint} p-3`}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Panel's 2px ink seam is the gutter. md:grid-cols-2 makes it a
              vertical spine, while the passport uses the same primitive with
              md:grid-rows-2, a horizontal fold, so the two objects don't read
              as the same thing.

              Fixed height at md because a book doesn't resize when you turn a
              page. 452px of pages, inside the case's 12px and its 2px border,
              makes the open book exactly the closed cover's 480px. Auto below
              md, where a fixed height would force a scroll region inside a
              scrolling page and leave the reader unable to predict which one
              moves.

              Cell's `min-h-0` lets an over-long page scroll inside the book
              rather than grow past its border. Copy is still written to fit. */}
          <Panel as="div" className="relative z-20 md:h-113 md:grid-cols-2">
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

      {/* Announces the folios printed on the pages, not the spread index, so
          the spoken count matches the numbers a sighted reader sees. */}
      <p aria-live="polite" className="sr-only">
        {`Pages ${versoFolio} and ${versoFolio + 1} of ${spreads.length * 2}. ${spread.chapter}.`}
      </p>
    </article>
  );
}

export default BookSpread;
