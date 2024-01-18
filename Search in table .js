//Функція пошуку в таблиці по ключовому слові
// Створення MutationObserver для відслідковування змін у таблиці
var observer = new MutationObserver(function(mutations) {
    // Перебір всіх змін у DOM
    mutations.forEach(function(mutation) {
        // Якщо тип зміни - зміна дочірніх елементів childList-все listCompensation
        if (mutation.type === 'childList') {
            // Виклик функції фільтрації таблиці
            filterTable();
        }
    });
});
// Конфігурація для MutationObserver
var config = { childList: true, subtree: true };
// Вибір цільового вузла (елемента) для спостереження - наша таблиця
var targetNode = document.getElementById('listCompensation');
// Запуск спостереження за змінами у таблиці
observer.observe(targetNode, config);
// Функція для фільтрації рядків таблиці
function filterTable() {
    // Отримання тексту з поля вводу та перетворення його в нижній регістр
    var searchWord = document.getElementById('world').value.toLowerCase();
    // Отримання всіх рядків таблиці
    var rows = document.querySelectorAll('#listCompensation tbody tr');

    // Якщо поле вводу порожнє, показати всі рядки таблиці
    if (searchWord.trim() === '') {
        rows.forEach(function(row) {
            row.style.display = '';
        });
    } else {
        // Перебір кожного рядка таблиці
        rows.forEach(function(row) {
            var cells = row.querySelectorAll('td');
            var found = false;

            // Перебір кожної комірки в рядку
            cells.forEach(function(cell) {
                // Перевірка, чи текст комірки містить шуканий текст
                if (cell.textContent.toLowerCase().indexOf(searchWord) > -1) {
                    found = true;
                }
            });
            // Якщо шуканий текст знайдено у рядку, залишаємо його видимим
            if (found) {
                row.style.display = '';
            } else {
                // Якщо шуканий текст не знайдено, ховаємо рядок
                row.style.display = 'none';
            }
        });
    }
}

// Додавання слухача подій до поля вводу для виклику функції фільтрації під час вводу
document.getElementById('world').addEventListener('input', filterTable);
