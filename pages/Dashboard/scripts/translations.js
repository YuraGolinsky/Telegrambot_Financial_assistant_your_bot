// translations.js

const languageSwitcher = document.querySelectorAll('.lang-switcher');
const translations = {};

// Загрузка переводов из JSON файла
async function loadTranslations() {
  const response = await fetch('C:/xampp/htdocs/Monances-main/pages/Dashboard/translations/translations.json');
  const data = await response.json();
  translations['en'] = data.en;
  translations['uk'] = data.uk;
  translations['ru'] = data.ru;
  setLanguage(localStorage.getItem('preferredLanguage') || 'en');
}

// Установка языка на странице
function setLanguage(lang) {
  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach(element => {
    const key = element.getAttribute('data-translate');
    element.textContent = translations[lang][key] || key;
  });

  // Обновление состояния переключателя языка
  languageSwitcher.forEach(button => {
    button.classList.toggle('active', button.dataset.lang === lang);
  });
}

// Добавление обработчиков событий для кнопок переключения языка
languageSwitcher.forEach(button => {
  button.addEventListener('click', () => {
    const lang = button.dataset.lang;
    setLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
  });
});

document.addEventListener('DOMContentLoaded', loadTranslations);
