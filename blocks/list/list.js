export default async function decorate(block) {
  const rows = [...block.children];

  const path = rows[1]?.textContent.trim();
  console.log("path",path);

  if (!path) {
    block.innerHTML = '<p>List path is not configured.</p>';
    return;
  }

  const response = await fetch('/list-index.json');

  if (!response.ok) {
    block.innerHTML = '<p>Unable to load content.</p>';
    return;
  }

  const data = await response.json();

  const items = (data.data || []).filter((item) => {
    return item.path.startsWith(path);
  });

  if (!items.length) {
    block.innerHTML = '<p>No content found.</p>';
    return;
  }

  block.innerHTML = `
    <div class="list-grid">
      ${items.map((item) => `
        <article class="list-card">

          ${item.image
            ? `<img src="${item.image}" alt="${item.title || ''}">`
            : ''}

          <div class="list-card-content">

            <h3>
              ${item.title || 'Untitled'}
            </h3>

            ${item.description
              ? `<p>${item.description}</p>`
              : ''}

            <a href="${item.path}">
              View
            </a>

          </div>
        </article>
      `).join('')}
    </div>
  `;
}