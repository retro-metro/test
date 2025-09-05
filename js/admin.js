function loadServices() {
  return JSON.parse(localStorage.getItem('services') || '[]');
}

function saveServices(services) {
  localStorage.setItem('services', JSON.stringify(services));
}

function renderList() {
  const services = loadServices();
  const list = document.getElementById('service-list');
  list.innerHTML = '';
  services.forEach(svc => {
    const div = document.createElement('div');
    div.className = 'border rounded p-2 mb-2';
    div.innerHTML = `<strong>${svc.name}</strong> - ${svc.description}
    <div class="mt-2">
      <button class="btn btn-sm btn-primary me-2" data-edit="${svc.id}">Edit</button>
      <button class="btn btn-sm btn-danger" data-delete="${svc.id}">Delete</button>
    </div>`;
    list.appendChild(div);
  });
}

function addBookmarkRow(title = '', url = '') {
  const container = document.getElementById('bookmark-container');
  const row = document.createElement('div');
  row.className = 'input-group mb-1';
  row.innerHTML = `
    <input type="text" class="form-control" placeholder="Title" value="${title}">
    <input type="url" class="form-control" placeholder="URL" value="${url}">
    <button class="btn btn-outline-danger" type="button">&times;</button>`;
  row.querySelector('button').addEventListener('click', () => row.remove());
  container.appendChild(row);
}

document.getElementById('add-bookmark').addEventListener('click', () => addBookmarkRow());

document.getElementById('reset-form').addEventListener('click', () => {
  document.getElementById('service-form').reset();
  document.getElementById('service-id').value = '';
  document.getElementById('bookmark-container').innerHTML = '<label class="form-label">Bookmarks</label>';
});

document.getElementById('service-form').addEventListener('submit', e => {
  e.preventDefault();
  const id = document.getElementById('service-id').value || Date.now().toString();
  const name = document.getElementById('service-name').value;
  const description = document.getElementById('service-description').value;
  const url = document.getElementById('service-url').value;
  const icon = document.getElementById('service-icon').value;
  const bookmarks = Array.from(document.querySelectorAll('#bookmark-container .input-group')).map(group => {
    const inputs = group.querySelectorAll('input');
    return { title: inputs[0].value, url: inputs[1].value };
  }).filter(b => b.title && b.url);
  let services = loadServices();
  const index = services.findIndex(s => s.id === id);
  const service = { id, name, description, url, icon, bookmarks };
  if (index >= 0) services[index] = service; else services.push(service);
  saveServices(services);
  renderList();
  document.getElementById('reset-form').click();
});

document.getElementById('service-list').addEventListener('click', e => {
  if (e.target.dataset.edit) {
    const svc = loadServices().find(s => s.id === e.target.dataset.edit);
    if (svc) {
      document.getElementById('service-id').value = svc.id;
      document.getElementById('service-name').value = svc.name;
      document.getElementById('service-description').value = svc.description;
      document.getElementById('service-url').value = svc.url;
      document.getElementById('service-icon').value = svc.icon || '';
      const container = document.getElementById('bookmark-container');
      container.innerHTML = '<label class="form-label">Bookmarks</label>';
      (svc.bookmarks || []).forEach(b => addBookmarkRow(b.title, b.url));
      window.scrollTo(0, 0);
    }
  }
  if (e.target.dataset.delete) {
    let services = loadServices().filter(s => s.id !== e.target.dataset.delete);
    saveServices(services);
    renderList();
  }
});

document.addEventListener('DOMContentLoaded', renderList);
