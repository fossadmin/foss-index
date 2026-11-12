// Authored text only. Never collect arbitrary page HTML or fetched content.
export function matchingMethod(method, titles) {
  return titles.findIndex(title => title.trim() === method.trim());
}
export async function copyPrompt(text, writeText) {
  if (!text || typeof writeText !== 'function') return false;
  try { await writeText(text); return true; } catch { return false; }
}
export function mountSetupPrompts(root = document) {
  root.querySelectorAll('[data-setup-prompt]').forEach(box => {
    const method = box.dataset.method;
    const tabs = [...root.querySelectorAll('.qs-tablist [role="tab"]')];
    const index = matchingMethod(method, tabs.map(tab => tab.textContent));
    if (index >= 0) {
      const panel = root.getElementById(tabs[index].getAttribute('aria-controls'));
      if (!panel) return;
      // End of the method's quick start: the steps come first, AI help last.
      panel.append(box);
    } else {
      // Progressive fallback for a single-method page with no generated tabs:
      // end of that method's section, before the next heading (e.g. First use).
      const headings = [...root.querySelectorAll('.prose h3')];
      const heading = headings.find(h => h.textContent.trim() === method);
      if (!heading) return; // Do not show a copy action for an unmatched method.
      let next = heading.nextElementSibling;
      while (next && !/^H[23]$/.test(next.tagName)) next = next.nextElementSibling;
      if (next) next.before(box); else heading.parentElement.append(box);
    }
    const button = box.querySelector('[data-copy-setup]');
    const textarea = box.querySelector('[data-setup-text]');
    const status = box.querySelector('[data-setup-status]');
    const fallback = box.querySelector('[data-setup-fallback]');
    button.hidden = false;
    button.addEventListener('click', async () => {
      button.disabled = true;
      status.textContent = 'Copying...';
      const write = globalThis.navigator?.clipboard?.writeText;
      const copied = await copyPrompt(textarea.value, write ? text => navigator.clipboard.writeText(text) : null);
      button.disabled = false;
      if (copied) {
        status.textContent = 'Copied. Paste into your AI assistant and review the plan before changes.';
      } else {
        status.textContent = 'Clipboard unavailable. Select and copy the prompt below.';
        fallback.open = true;
        textarea.focus(); textarea.select();
      }
    });
  });
}
