document.addEventListener('DOMContentLoaded', function() {
  function updateChartData() {
    // Получение данных из всех карточек
    var incomes = parseFloat(document.getElementById('incomeDisplay').innerText.replace('R$', '').trim()) || 0;
    var expenses = parseFloat(document.getElementById('expenseDisplay').innerText.replace('R$', '').trim()) || 0;
    var weeklyEarnings = parseFloat(document.getElementById('weeklyEarningsDisplay').innerText.replace('R$', '').trim()) || 0;
    var monthlyEarnings = parseFloat(document.getElementById('monthlyEarningsDisplay').innerText.replace('R$', '').trim()) || 0;
    var monthlyExpenses = parseFloat(document.getElementById('monthlyExpensesDisplay').innerText.replace('R$', '').trim()) || 0;
    var yearlyEarnings = parseFloat(document.getElementById('yearlyEarningsDisplay').innerText.replace('R$', '').trim()) || 0;
    var yearlyExpenses = parseFloat(document.getElementById('yearlyExpensesDisplay').innerText.replace('R$', '').trim()) || 0;

    // Вычисление общего баланса
    var total = incomes - expenses + weeklyEarnings + monthlyEarnings - monthlyExpenses + yearlyEarnings - yearlyExpenses;

    // Обновление данных для круговой диаграммы
    myChart.data.datasets[0].data = [incomes, expenses, total];
    myChart.update();

    // Обновление общего баланса на странице
    document.getElementById('totalDisplay').innerText = `R$ ${total.toFixed(2)}`;
  }

  // Настройки и данные для круговой диаграммы
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Incomes', 'Expenses', 'Total'],
      datasets: [{
        label: 'Balance',
        data: [0, 0, 0],
        backgroundColor: [
          '#36A2EB',
          '#FF6384',
          '#FFCE56'
        ],
        hoverOffset: 4
      }]
    },
    options: {
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 2000,
        easing: 'easeInOutQuart'
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(tooltipItem) {
              return `${tooltipItem.label}: ${tooltipItem.raw.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
              })}`;
            }
          }
        }
      }
    }
  });

  // Обновление данных при загрузке страницы
  updateChartData();

  // Обновление данных при отправке формы
  document.getElementById('updateDataForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Получение значений из полей формы
    const incomes = parseFloat(document.getElementById('incomeInput').value) || 0;
    const expenses = parseFloat(document.getElementById('expenseInput').value) || 0;
    const weeklyEarnings = parseFloat(document.getElementById('weeklyEarningsInput').value) || 0;
    const monthlyEarnings = parseFloat(document.getElementById('monthlyEarningsInput').value) || 0;
    const monthlyExpenses = parseFloat(document.getElementById('monthlyExpensesInput').value) || 0;
    const yearlyEarnings = parseFloat(document.getElementById('yearlyEarningsInput').value) || 0;
    const yearlyExpenses = parseFloat(document.getElementById('yearlyExpensesInput').value) || 0;

    // Обновление данных на странице
    document.getElementById('incomeDisplay').innerText = `R$ ${incomes.toFixed(2)}`;
    document.getElementById('expenseDisplay').innerText = `R$ ${expenses.toFixed(2)}`;
    document.getElementById('weeklyEarningsDisplay').innerText = `R$ ${weeklyEarnings.toFixed(2)}`;
    document.getElementById('monthlyEarningsDisplay').innerText = `R$ ${monthlyEarnings.toFixed(2)}`;
    document.getElementById('monthlyExpensesDisplay').innerText = `R$ ${monthlyExpenses.toFixed(2)}`;
    document.getElementById('yearlyEarningsDisplay').innerText = `R$ ${yearlyEarnings.toFixed(2)}`;
    document.getElementById('yearlyExpensesDisplay').innerText = `R$ ${yearlyExpenses.toFixed(2)}`;

    // Обновление диаграммы и общего баланса
    updateChartData();

    // Закрыть модальное окно
    Modal.close();
  });

  // Обновление данных при изменении значений в полях формы
  document.getElementById('incomeInput').addEventListener('input', updateChartData);
  document.getElementById('expenseInput').addEventListener('input', updateChartData);
  document.getElementById('weeklyEarningsInput').addEventListener('input', updateChartData);
  document.getElementById('monthlyEarningsInput').addEventListener('input', updateChartData);
  document.getElementById('monthlyExpensesInput').addEventListener('input', updateChartData);
  document.getElementById('yearlyEarningsInput').addEventListener('input', updateChartData);
  document.getElementById('yearlyExpensesInput').addEventListener('input', updateChartData);


  function appendToCalculator(value) {
    document.getElementById('calculatorInput').value += value;
}

function clearCalculator() {
    document.getElementById('calculatorInput').value = '';
}

function calculateResult() {
    try {
        let input = document.getElementById('calculatorInput').value;
        let result = eval(input);
        document.getElementById('calculatorInput').value = result;
    } catch (error) {
        document.getElementById('calculatorInput').value = 'Error';
    }
}

});