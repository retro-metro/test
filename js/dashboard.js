const defaultIcons = [
  'images/icons/default1.svg',
  'images/icons/default2.svg',
  'images/icons/default3.svg'
];

function loadServices() {
  const services = JSON.parse(localStorage.getItem('services') || '[]');
  const container = document.getElementById('app-container');
  container.innerHTML = '';
  services.forEach((svc, i) => {
    const card = document.createElement('div');
    card.className = 'col-md-4';
    card.innerHTML = `
      <div class="card mb-4">
        <img src="${svc.icon || defaultIcons[i % defaultIcons.length]}" class="card-img-top" alt="${svc.name}">
        <div class="card-body">
          <h5 class="card-title">${svc.name}</h5>
          <p class="card-text">${svc.description}</p>
          <p class="card-text"><strong>Status:</strong> <span data-status="${i}">Checking...</span></p>
          <div>${(svc.bookmarks||[]).map(b=>`<a href="${b.url}" class="badge bg-primary me-1" target="_blank">${b.title}</a>`).join('')}</div>
        </div>
      </div>`;
    container.appendChild(card);
    checkStatus(svc.url, i);
  });
}

function checkStatus(url, i) {
  fetch(url, {method:'HEAD'})
    .then(r => setStatus(i, r.ok ? '🟢 Online' : '🔴 Offline'))
    .catch(() => setStatus(i, '🔴 Offline'));
}

function setStatus(i, text) {
  const el = document.querySelector(`[data-status="${i}"]`);
  if (el) el.textContent = text;
}

document.addEventListener('DOMContentLoaded', loadServices);
