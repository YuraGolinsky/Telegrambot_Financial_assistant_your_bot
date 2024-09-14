function saveCardDataToJson() {
  // Collect data for saving to JSON
  const dataToSave = {
      incomes: document.getElementById('incomeDisplay').innerText,
      expenses: document.getElementById('expenseDisplay').innerText,
      weeklyEarnings: document.getElementById('weeklyEarningsDisplay').innerText,
      monthlyEarnings: document.getElementById('monthlyEarningsDisplay').innerText,
      monthlyExpenses: document.getElementById('monthlyExpensesDisplay').innerText,
      yearlyEarnings: document.getElementById('yearlyEarningsDisplay').innerText,
      yearlyExpenses: document.getElementById('yearlyExpensesDisplay').innerText,
      dateSaved: new Date().toLocaleString() // Date and time of data saving
  };

  // Convert the object to JSON
  const jsonData = JSON.stringify(dataToSave, null, 2);

  // Create an <a> element for downloading the JSON file
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'money_manager_data.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
