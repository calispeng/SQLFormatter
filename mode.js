document.addEventListener('DOMContentLoaded', function () {
  const body = document.body;
  const input = document.getElementById('inputSql');
  const output = document.getElementById('outputSql');
  const toggleBtn = document.getElementById('toggleTheme');
    
  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    body.classList.toggle('dark-mode');

    input.classList.toggle('light-mode');
    input.classList.toggle('dark-mode');

    output.classList.toggle('light-mode');
    output.classList.toggle('dark-mode');

    toggleBtn.textContent = body.classList.contains('light-mode') ? '☀️' : '🌙';
      
    const mode = body.classList.contains('light-mode') ? 'Light mode enabled' : 'Dark mode enabled';
    showToast(mode);
  });
});

function showToast(message) {
  let toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}
