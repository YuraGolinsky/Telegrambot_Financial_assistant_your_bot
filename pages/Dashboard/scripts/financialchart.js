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

  // Function to extract data from cards
  function extractCardData() {
    const income = parseFloat(document.getElementById('incomeDisplay').innerText.replace('R$', '').replace(',', '').trim());
    const expense = parseFloat(document.getElementById('expenseDisplay').innerText.replace('R$', '').replace(',', '').trim());
    const weeklyEarnings = parseFloat(document.getElementById('weeklyEarningsDisplay').innerText.replace('R$', '').replace(',', '').trim());
    const monthlyEarnings = parseFloat(document.getElementById('monthlyEarningsDisplay').innerText.replace('R$', '').replace(',', '').trim());
    const monthlyExpenses = parseFloat(document.getElementById('monthlyExpensesDisplay').innerText.replace('R$', '').replace(',', '').trim());
    const yearlyEarnings = parseFloat(document.getElementById('yearlyEarningsDisplay').innerText.replace('R$', '').replace(',', '').trim());
    const yearlyExpenses = parseFloat(document.getElementById('yearlyExpensesDisplay').innerText.replace('R$', '').replace(',', '').trim());

    return {
      income,
      expense,
      weeklyEarnings,
      monthlyEarnings,
      monthlyExpenses,
      yearlyEarnings,
      yearlyExpenses
    };
  }

  // Chart.js Setup
// Chart.js Setup for Pie Chart
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
type: 'pie',
data: {
  labels: ['Incomes', 'Expenses', 'Weekly Earnings', 'Monthly Earnings', 'Monthly Expenses', 'Yearly Earnings', 'Yearly Expenses'],
  datasets: [{
    label: 'Financial Data',
    data: [], // Populate this dynamically with your data
    backgroundColor: [
      'rgba(255, 99, 132, 0.6)',
      'rgba(54, 162, 235, 0.6)',
      'rgba(255, 206, 86, 0.6)',
      'rgba(75, 192, 192, 0.6)',
      'rgba(153, 102, 255, 0.6)',
      'rgba(255, 159, 64, 0.6)',
      'rgba(255, 99, 132, 0.6)'
    ],
    borderWidth: 1
  }]
},
options: {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    tooltip: {
      callbacks: {
        label: function(tooltipItem) {
          return tooltipItem.label + ': R$ ' + tooltipItem.raw.toFixed(2);
        }
      }
    }
  }
}
});

function updateChart() {
const cardData = extractCardData();
myChart.data.datasets[0].data = [
  cardData.income,
  cardData.expense,
  cardData.weeklyEarnings,
  cardData.monthlyEarnings,
  cardData.monthlyExpenses,
  cardData.yearlyEarnings,
  cardData.yearlyExpenses
];
myChart.update();
}

// Call updateChart initially to populate the pie chart with data from cards
updateChart();


  // Function to update the card data and chart on form submission
  function updateData(event) {
    event.preventDefault();

    const income = parseFloat(document.getElementById('incomeInput').value) || 0;
    const expense = parseFloat(document.getElementById('expenseInput').value) || 0;
    const weeklyEarnings = parseFloat(document.getElementById('weeklyEarningsInput').value) || 0;
    const monthlyEarnings = parseFloat(document.getElementById('monthlyEarningsInput').value) || 0;
    const monthlyExpenses = parseFloat(document.getElementById('monthlyExpensesInput').value) || 0;
    const yearlyEarnings = parseFloat(document.getElementById('yearlyEarningsInput').value) || 0;
    const yearlyExpenses = parseFloat(document.getElementById('yearlyExpensesInput').value) || 0;

    document.getElementById('incomeDisplay').innerText = `R$ ${income.toFixed(2)}`;
    document.getElementById('expenseDisplay').innerText = `R$ ${expense.toFixed(2)}`;
    document.getElementById('weeklyEarningsDisplay').innerText = `R$ ${weeklyEarnings.toFixed(2)}`;
    document.getElementById('monthlyEarningsDisplay').innerText = `R$ ${monthlyEarnings.toFixed(2)}`;
    document.getElementById('monthlyExpensesDisplay').innerText = `R$ ${monthlyExpenses.toFixed(2)}`;
    document.getElementById('yearlyEarningsDisplay').innerText = `R$ ${yearlyEarnings.toFixed(2)}`;
    document.getElementById('yearlyExpensesDisplay').innerText = `R$ ${yearlyExpenses.toFixed(2)}`;

    // Update the chart after updating card data
    updateChart();
    Modal.close();
  }