// Function to update form data and recalculate total
function updateData() {
  const incomes = parseFloat(document.getElementById('incomeInput').value) || 0;
  const expenses = parseFloat(document.getElementById('expenseInput').value) || 0;
  const weeklyEarnings = parseFloat(document.getElementById('weeklyEarningsInput').value) || 0;
  const monthlyEarnings = parseFloat(document.getElementById('monthlyEarningsInput').value) || 0;
  const monthlyExpenses = parseFloat(document.getElementById('monthlyExpensesInput').value) || 0;
  const yearlyEarnings = parseFloat(document.getElementById('yearlyEarningsInput').value) || 0;
  const yearlyExpenses = parseFloat(document.getElementById('yearlyExpensesInput').value) || 0;

  // Calculate the total
  const total = incomes - expenses;

  // Update display values
  document.getElementById('incomeDisplay').innerText = `R$ ${incomes.toFixed(2)}`;
  document.getElementById('expenseDisplay').innerText = `R$ ${expenses.toFixed(2)}`;
  document.getElementById('totalDisplay').innerText = `R$ ${total.toFixed(2)}`;
  document.getElementById('weeklyEarningsDisplay').innerText = `R$ ${weeklyEarnings.toFixed(2)}`;
  document.getElementById('monthlyEarningsDisplay').innerText = `R$ ${monthlyEarnings.toFixed(2)}`;
  document.getElementById('monthlyExpensesDisplay').innerText = `R$ ${monthlyExpenses.toFixed(2)}`;
  document.getElementById('yearlyEarningsDisplay').innerText = `R$ ${yearlyEarnings.toFixed(2)}`;
  document.getElementById('yearlyExpensesDisplay').innerText = `R$ ${yearlyExpenses.toFixed(2)}`;
}

// Attach event listeners to input fields
document.querySelectorAll('#incomeInput, #expenseInput, #weeklyEarningsInput, #monthlyEarningsInput, #monthlyExpensesInput, #yearlyEarningsInput, #yearlyExpensesInput')
  .forEach(input => input.addEventListener('input', updateData));

// Event listener for updating data when the form is submitted
document.getElementById('updateData').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent default form submission behavior
  updateData();
});

// Event listener to save data to Excel
document.getElementById('saveExcel').addEventListener('click', function() {
  const income = document.getElementById('incomeDisplay').innerText.replace('R$ ', '');
  const expense = document.getElementById('expenseDisplay').innerText.replace('R$ ', '');
  const total = document.getElementById('totalDisplay').innerText.replace('R$ ', '');
  const weeklyEarnings = document.getElementById('weeklyEarningsDisplay').innerText.replace('R$ ', '');
  const monthlyEarnings = document.getElementById('monthlyEarningsDisplay').innerText.replace('R$ ', '');
  const yearlyEarnings = document.getElementById('yearlyEarningsDisplay').innerText.replace('R$ ', '');
  const yearlyExpenses = document.getElementById('yearlyExpensesDisplay').innerText.replace('R$ ', '');

  const data = [
      ['Incomes', income],
      ['Expenses', expense],
      ['Total', total],
      ['Weekly Earnings', weeklyEarnings],
      ['Monthly Earnings', monthlyEarnings],
      ['Yearly Earnings', yearlyEarnings],
      ['Yearly Expenses', yearlyExpenses],
  ];

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, 'Balance');
  XLSX.writeFile(wb, 'balance.xlsx');
});

// Function to clear the form and display values
function clearForm() {
  document.getElementById('incomeInput').value = '';
  document.getElementById('expenseInput').value = '';
  document.getElementById('weeklyEarningsInput').value = '';
  document.getElementById('monthlyEarningsInput').value = '';
  document.getElementById('monthlyExpensesInput').value = '';
  document.getElementById('yearlyEarningsInput').value = '';
  document.getElementById('yearlyExpensesInput').value = '';

  // Clear display cards
  document.getElementById('incomeDisplay').innerText = `R$ 0.00`;
  document.getElementById('expenseDisplay').innerText = `R$ 0.00`;
  document.getElementById('totalDisplay').innerText = `R$ 0.00`;
  document.getElementById('weeklyEarningsDisplay').innerText = `R$ 0.00`;
  document.getElementById('monthlyEarningsDisplay').innerText = `R$ 0.00`;
  document.getElementById('monthlyExpensesDisplay').innerText = `R$ 0.00`;
  document.getElementById('yearlyEarningsDisplay').innerText = `R$ 0.00`;
  document.getElementById('yearlyExpensesDisplay').innerText = `R$ 0.00`;
}

// Event listener for clearing the form
document.getElementById('clearForm').addEventListener('click', clearForm);

// Initialize flatpickr for date input field (optional, if needed)
flatpickr("#dateInput", {
  dateFormat: "Y-m-d",
});
