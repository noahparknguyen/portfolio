// The spoken half of "this link leaves the site in a new tab".
//
// Every outbound link on the site carries `target="_blank"`, which moves the
// user into a new browsing context without warning. Sighted users at least see
// the tab appear, while a screen-reader user is simply somewhere else. WCAG
// 3.2.5 is AAA rather than AA, so this goes beyond conformance, and it's on
// every outbound link because a convention applied in some places is worse
// than either choice made everywhere.
//
// A component rather than a copied string, so the wording can't drift between
// call sites. The leading space separates this from the link text when a
// screen reader joins them.
function NewTabHint() {
  return <span className="sr-only"> (opens in a new tab)</span>;
}

export default NewTabHint;
