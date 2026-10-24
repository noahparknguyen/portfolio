// The spoken half of "opens in a new tab", on every outbound link. Sighted
// users see the tab appear, and a screen-reader user would otherwise just be
// somewhere else. The leading space separates it from the link text.
function NewTabHint() {
  return <span className="sr-only"> (opens in a new tab)</span>;
}

export default NewTabHint;
