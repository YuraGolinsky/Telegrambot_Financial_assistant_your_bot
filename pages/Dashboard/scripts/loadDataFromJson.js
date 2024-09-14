function loadDataFromJson() {
    const author = prompt("Enter the author's name:");
    const password = prompt("Enter the password for the account:");
  
    if (!author || !password) {
      alert("Author and password are required.");
      return;
    }
  
    // Send request to server to get the data
    fetch('/Monances-main/pages/Dashboard/load_card_data.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ author: author, password: password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        const cardData = data.cardData;
  
        // Update card displays with retrieved data
        document.getElementById('incomeDisplay').textContent = `R$ ${cardData.income || '0.00'}`;
        document.getElementById('expenseDisplay').textContent = `R$ ${cardData.expense || '0.00'}`;
        document.getElementById('weeklyEarningsDisplay').textContent = `R$ ${cardData.weeklyEarnings || '0.00'}`;
        document.getElementById('monthlyEarningsDisplay').textContent = `R$ ${cardData.monthlyEarnings || '0.00'}`;
        document.getElementById('monthlyExpensesDisplay').textContent = `R$ ${cardData.monthlyExpenses || '0.00'}`;
        document.getElementById('yearlyEarningsDisplay').textContent = `R$ ${cardData.yearlyEarnings || '0.00'}`;
        document.getElementById('yearlyExpensesDisplay').textContent = `R$ ${cardData.yearlyExpenses || '0.00'}`;
      } else {
        alert(data.message || "Failed to load data.");
      }
    })
    .catch(error => {
      console.error('Error loading card data:', error);
      alert('Error loading data.');
    });
  }
  