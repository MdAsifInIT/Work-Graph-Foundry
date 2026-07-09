const fs = require('fs');

const path = 'c:/Users/Primary/Documents/Code/Samruna/src/styles.css';
let css = fs.readFileSync(path, 'utf8');

// The file is currently missing lines from .apple-select up to .toolbar-button-run
// because the fuzzy matcher deleted them.

// Let's find `.apple-select {` and `.toolbar-button-run {`
const startIdx = css.indexOf('.apple-select {');
const endStr = '.toolbar-button-run {';
const endIdx = css.indexOf(endStr, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  const newContent = `.apple-select {
  appearance: none;
  -webkit-appearance: none;
  background-color: var(--surface);
  background-image:
    linear-gradient(45deg, transparent 50%, var(--ink-secondary) 50%),
    linear-gradient(135deg, var(--ink-secondary) 50%, transparent 50%);
  background-position:
    calc(100% - 16px) calc(50% - 2px),
    calc(100% - 10px) calc(50% - 2px);
  background-repeat: no-repeat;
  background-size: 6px 6px, 6px 6px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  color: var(--ink);
  cursor: pointer;
  font: inherit;
  min-height: 44px;
  min-width: 0;
  padding: 0 40px 0 14px;
  transition:
    border-color var(--duration-normal) var(--ease-out),
    box-shadow var(--duration-normal) var(--ease-out),
    background-color var(--duration-normal) var(--ease-out),
    color var(--duration-normal) var(--ease-out);
  width: 100%;
}

.apple-select:focus-visible {
  box-shadow: 0 0 0 3px rgb(0 113 227 / 18%);
  outline: none;
}

.apple-select:disabled {
  background-color: var(--surface-subtle);
  color: var(--ink-tertiary);
  cursor: not-allowed;
  opacity: 1;
}

.toolbar-inline .apple-select {
  background-color: transparent;
  border-color: transparent;
  box-shadow: none;
  color: var(--ink);
  font-size: var(--text-caption);
  font-weight: var(--weight-semibold);
  min-height: 36px;
  padding-left: 8px;
  padding-right: 30px;
}

.toolbar-inline .apple-select:focus-visible {
  box-shadow: none;
}

.review-run-version .apple-select {
  min-width: min(360px, 48vw);
}

.toolbar button,
.approve-button,
.reject-button,
.export-button,
.revision-button,
.toolbar-button-run {`;

  css = css.substring(0, startIdx) + newContent + css.substring(endIdx + endStr.length);
  fs.writeFileSync(path, css);
  console.log('Fixed styles.css successfully!');
} else {
  console.log('Could not find markers in styles.css');
}
