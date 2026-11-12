// Preserve historical detailed category labels as initial tags.
export const originalTags = ['Analytics', 'Bookmarks', 'Calendar & Contacts', 'Collaboration', 'Dashboard', 'Documents', 'File Sync', 'Finance', 'Home', 'Home automation', 'Infrastructure', 'Media', 'Monitoring', 'Networking', 'Notes', 'Notifications', 'Passwords', 'Photos', 'Productivity', 'Utilities'];
export const browseDefinitions = [
  { name: 'Operating systems', categories: ['Operating systems'] },
  { name: 'Home & auto', categories: ['Home', 'Home automation'] },
  { name: 'Media & photos', categories: ['Media', 'Photos', 'Creative'] },
  { name: 'Work & organize', categories: ['Finance', 'Productivity', 'Notes', 'Documents', 'Bookmarks', 'Calendar & Contacts', 'Utilities', 'Reading'] },
  { name: 'Files & sharing', categories: ['Collaboration', 'File Sync', 'Backup'] },
  { name: 'Privacy & access', categories: ['Passwords', 'Networking', 'Security', 'Communication'] },
  { name: 'Servers & monitoring', categories: ['Infrastructure', 'Dashboard', 'Monitoring', 'Notifications', 'Analytics', 'Development'] },
];
export const tagsFor = data => [...new Set([data.category, ...(data.tags ?? [])].filter(Boolean))];
export function broadCategory(category) {
  const group = browseDefinitions.find(group => group.categories.includes(category));
  if (!group) throw new Error(`No browse group for category: ${category}`);
  return group.name;
}
export function platformSearch(record) {
  return (record?.platforms ?? []).flatMap(row => [row.name, row.kind, row.name === 'iOS' ? 'iPhone' : row.name === 'macOS' ? 'Mac' : '']).join(' ');
}
