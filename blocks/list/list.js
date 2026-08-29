export default async function decorate(block) {
  // Get the folder/path configured in DA.live
  const path = block.textContent.trim();

  console.log('Configured path:', path);

  if (!path) {
    block.innerHTML = '<p>List path is not configured.</p>';
    return;
  }

  // Load the index
  const response = await fetch('/list-index.json');

  if (!response.ok) {
    block.innerHTML = '<p>Unable to load list index.</p>';
    return;
  }

  const data = await response.json();

  console.log('List index:', data);

  // Get indexed pages under the configured path
  const items = (data.data || []).filter((item) => {
    return item.path && item.path.startsWith(path);
  });

  console.log('Matching paths:', items);

  if (!items.length) {
    block.innerHTML = '<p>No paths found.</p>';
    return;
  }

  // Display the paths
  block.innerHTML = `
    <ul class="path-list">
      ${items.map((item) => `
        <li class="path-list-item">
          <a href="${item.path}">
            ${item.path}
          </a>
        </li>
      `).join('')}
    </ul>
  `;
}