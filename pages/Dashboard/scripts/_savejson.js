function saveCardDataToJson() {
  // Prompt for author and password
  const author = prompt("Enter the author's name:");
  const password = prompt("Enter the password for the account:");

  // Validate inputs
  if (!author || !password) {
    alert("Author and password are required.");
    return;
  }

  // Retrieve card data (you will need to implement the logic to get this data)
  const cardData = {
    income: document.getElementById('incomeInput').value,
    expense: document.getElementById('expenseInput').value,
    weeklyEarnings: document.getElementById('weeklyEarningsInput').value,
    monthlyEarnings: document.getElementById('monthlyEarningsInput').value,
    monthlyExpenses: document.getElementById('monthlyExpensesInput').value,
    yearlyEarnings: document.getElementById('yearlyEarningsInput').value,
    yearlyExpenses: document.getElementById('yearlyExpensesInput').value
  };

  // Prepare data for saving
  const dataToSave = {
    author: author,
    password: password,
    cardData: cardData
  };

  // Save to JSON file
  fetch('/Monances-main/pages/Dashboard/save_card_data.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataToSave)
  }).then(response => response.json())
    .then(data => {
      alert('Card data saved successfully');
    })
    .catch(error => {
      console.error('Error saving card data:', error);
    });
}
