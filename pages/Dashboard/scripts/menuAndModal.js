const MobileMenu = {
  open() {
    document.querySelector("aside").classList.add("active");
  },
  close() {
    document.querySelector("aside").classList.remove("active");
  },
};

const Modal = {
  open() {
    document.getElementById("modalOverlay").classList.add("active");
  },
  close() {
    document.getElementById("modalOverlay").classList.remove("active");
    Form.clearFields();
  },
};

// Функция форматирования даты в формате "November, 24"
function formatDate(dateString) {
  const parts = dateString.split("/");
  const day = parts[0];
  const month = parts[1];
  const year = "20" + parts[2];
  
  const date = new Date(year, month - 1, day);
  return date.toLocaleString("en-US", { month: "long", day: "numeric" });
}

// Получение текущей даты в формате "dd/mm/yyyy"
const today = new Date();
const formattedDate = formatDate(today.toLocaleDateString("pt-BR"));

// Функция для преобразования первой буквы строки в заглавную
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Отображение отформатированной даты на экране
const dateDisplayElement = document.getElementById("date-display");
dateDisplayElement.textContent = capitalizeFirstLetter(formattedDate);
