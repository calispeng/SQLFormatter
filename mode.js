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
    });
});
