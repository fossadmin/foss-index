// Alternative names are explicit, reviewed search hints, not equivalence claims.
export function normalizeSearch(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

export function matchTool(searchText, alternativeNames, query) {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (terms.every((term) => searchText.includes(term))) return { matches: true, alternative: '' };
  const normalizedQuery = normalizeSearch(query);
  const normalizedText = normalizeSearch(searchText);
  // Prefer the longest complete product name, never a substring such as
  // "word" in "password" or "figma" in an unrelated invented name.
  const names = [...alternativeNames].sort((a, b) => b.length - a.length);
  for (const name of names) {
    const needle = normalizeSearch(name);
    const padded = ` ${normalizedQuery} `;
    if (!padded.includes(` ${needle} `)) continue;
    const remaining = padded.replace(` ${needle} `, ' ').trim().split(/\s+/)
      .filter((term) => term && !['alternative', 'alternatives', 'replacement', 'replacements', 'to', 'for', 'open', 'source', 'software'].includes(term));
    if (remaining.every((term) => normalizedText.includes(term))) return { matches: true, alternative: name };
  }
  return { matches: false, alternative: '' };
}
