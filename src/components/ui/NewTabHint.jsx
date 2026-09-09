// The spoken half of "this link leaves the site in a new tab".
//
// Every outbound link on the site carries `target="_blank"`, which moves the
// user into a new browsing context without warning. Sighted users get no cue
// either, but they at least see the tab appear; a screen-reader user is simply
// somewhere else. WCAG 3.2.5 is AAA rather than AA, so this is a
// best-practice call, not a conformance one — but the site was already doing it
// in ONE place (ProjectLinks) and nowhere else, and an inconsistent convention
// is worse than either choice made uniformly.
//
// Kept as a component rather than a copied string so the wording can't drift
// across the ~30 call sites. The leading space matters: it separates this from
// the link text when a screen reader concatenates them.
function NewTabHint() {
  return <span className="sr-only"> (opens in a new tab)</span>;
}

export default NewTabHint;
