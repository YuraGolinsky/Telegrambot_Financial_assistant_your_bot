// Function to open the file picker dialog
function openFilePicker() {
  document.getElementById('fileInput').click();
}

// Function to handle the selected file
function handleFileSelect(event) {
  const file = event.target.files[0];

  // Check if the file is a JSON file
  if (!file.type.match('application/json')) {
      alert('Please select a JSON file.');
      return;
  }

  const reader = new FileReader();

  reader.onload = function(event) {
      const jsonData = event.target.result;

      try {
          const data = JSON.parse(jsonData);

          // Update card data with the loaded JSON data
          document.getElementById('incomeDisplay').innerText = data.incomes;
          document.getElementById('expenseDisplay').innerText = data.expenses;
          document.getElementById('weeklyEarningsDisplay').innerText = data.weeklyEarnings;
          document.getElementById('monthlyEarningsDisplay').innerText = data.monthlyEarnings;
          document.getElementById('monthlyExpensesDisplay').innerText = data.monthlyExpenses;
          document.getElementById('yearlyEarningsDisplay').innerText = data.yearlyEarnings;
          document.getElementById('yearlyExpensesDisplay').innerText = data.yearlyExpenses;

          // Notify the user of successful data loading
          alert('Data loaded successfully from JSON file.');
      } catch (error) {
          console.error('Error parsing JSON file:', error);
          alert('Error loading data from JSON file. Please check the file format.');
      }
  };

  reader.readAsText(file);
}

// Function to load data from JSON file on button click
function loadDataFromJson() {
  openFilePicker(); // Open the file picker dialog
}
