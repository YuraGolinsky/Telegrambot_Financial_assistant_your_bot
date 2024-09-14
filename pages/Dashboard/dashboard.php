<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Money Manager Pro</title>

  <!-- External Stylesheets -->
  <link rel="stylesheet" href="./styles/global.css">
  <link rel="stylesheet" href="./styles/style.css">
  <link rel="stylesheet" href="./styles/modal.css">
  <link rel="stylesheet" href="./styles/media.css">
  <link rel="stylesheet" href="./styles/Form.css">
  <link rel="stylesheet" href="./styles/import-exportmenu.css">

  <!-- Material Icons -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

  <!-- Roboto Font -->
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
  
  <!-- Chart.js Library -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

  <!-- Flatpickr Stylesheet -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">

  <!-- Flatpickr JavaScript -->
  <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
</head>
<body>
  <div class="container">
    <aside>
      <div class="top">
        <div class="logo">
          <img src="assets/Financial services.png" alt="Logo">
          <h3>Finance Manager</h3>
        </div>
      </div>
      <div class="sidebar">
        <a href="#dashboard" class="active">
          <span class="icon">📊</span>
          <span>Dashboard</span>
        </a>
        <a href="/Monances-main/pages/Accumulations/accumulations.php">
          <span class="icon">💰</span>
          <span>Accumulations</span>
        </a>
        <a href="/Monances-main/pages/Рrofile/profile.php">
          <span class="icon">👤</span>
          <span>Setting up a profile</span>
        </a>
        <a href="https://t.me/Yura_Golinsky">
          <span class="icon">📞</span>
          <span>Contact</span>
        </a>
        <a href="/Monances-main/index.php">
          <span class="icon">🚪</span>
          <span>Exit</span>
        </a>
      </div>
    </aside>
    
    <main>
      <div class="topMenu">
        <h2 id="date-display"></h2>
        <div class="import-export-dropdown">
          <button class="dropbtn">Import/Export</button>
          <div class="dropdown-content">
            <a href="#save-excel" onclick="saveToExcel()">Save to Excel</a>
            <a href="#save-json" onclick="saveCardDataToJson()">Save cards to JSON file</a>
            <a href="#load-json" onclick="loadDataFromJson()">Load Data from JSON</a>
          </div>
        </div>
      </div>

      <!-- Balance Section -->
      <section id="balance" class="balance-section">
        <div class="theme-toggler">
          <span class="material-icons active" id="toggle-light" onclick="ThemeToggler.Light()">light_mode</span>
          <span class="material-icons" id="toggle-dark" onclick="ThemeToggler.Dark()">dark_mode</span>
          <h2 class="sr-only">Balance</h2>
        
        </div>
       
        <div class="card">
          <h3>
            <span>Incomes</span>
            <img src="assets/Incomes.png" alt="Income Image">
          </h3>
          <p id="incomeDisplay">R$ 0.00</p>
        </div>
        <div class="card">
          <h3>
            <span>Expenses</span>
            <img src="assets/Expenses.png" alt="Expense Image">
          </h3>
          <p id="expenseDisplay">R$ 0.00</p>
        </div>
        <div class="card total">
          <h3>
            <span>Total</span>
            <img class="total" src="assets/Total.png" alt="Total Image">
          </h3>
          <p id="totalDisplay">R$ 0.00</p>
        </div>
        <div class="card">
          <h3>
            <span>Weekly Earnings</span>
            <img src="assets/weekly-icon.png" alt="Weekly Earnings Icon">
          </h3>
          <p id="weeklyEarningsDisplay">R$ 0.00</p>
        </div>
        <div class="card">
          <h3>
            <span>Monthly Earnings</span>
            <img src="assets/monthly-icon.png" alt="Monthly Earnings Icon">
          </h3>
          <p id="monthlyEarningsDisplay">R$ 0.00</p>
        </div>
        <div class="card">
          <h3>
            <span>Expenses for the month</span>
            <img src="assets/monthly-icon1.png" alt="Monthly Expenses Icon">
          </h3>
          <p id="monthlyExpensesDisplay">R$ 0.00</p>
        </div>
        <div class="card">
          <h3>
            <span>Yearly Earnings</span>
            <img src="assets/yearly-icon.png" alt="Yearly Earnings Icon">
          </h3>
          <p id="yearlyEarningsDisplay">R$ 0.00</p>
        </div>
        <div class="card">
          <h3>
            <span>Yearly Expenses</span>
            <img src="assets/yearly-icon1.png" alt="Yearly Expenses Icon">
          </h3>
          <p id="yearlyExpensesDisplay">R$ 0.00</p>
        </div>
      </section>

  <!-- New Transaction Button -->
<div class="new-transaction-container">
  <button id="newTransaction" class="button new" onclick="Modal.open()">+ New Transaction</button>
</div>



      <!-- Mobile Button for Adding Transactions -->
      <div class="addTransactionMobileButton">
        <button id="newTransactionMobile" onclick="Modal.open()">
          <span class="material-icons">add</span>
        </button>
      </div>
    </main>

    <!-- Financial Overview Chart Section -->
    <section class="chart-section">
      <h2>Financial Overview</h2>
      <canvas id="myChart"></canvas>
    </section>

    <div class="right">
      <div class="top">
        <button id="menu-btn">
          <span class="material-icons" id="mobile-menu" onclick="MobileMenu.open()">menu</span>
        </button>
      </div>
    </div>
  </div>

  <!-- External Libraries and Scripts -->
  <script src="https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js"></script>

  <!-- Modal Section -->
  <div class="modal-overlay" id="modalOverlay">
    <div class="modal">
      <div class="modalTop">
        <h2>New Transaction</h2>
        <span class="close-modal" onclick="Modal.close()">✖</span>
      </div>
      <form id="updateDataForm" onsubmit="updateData(event)">
        <label for="dateInput">Date:</label>
        <input type="text" id="dateInput" placeholder="Select date" readonly>
        <label for="incomeInput">Incomes:</label>
        <input type="number" id="incomeInput" step="0.01" placeholder="Enter income amount">
        <label for="expenseInput">Expenses:</label>
        <input type="number" id="expenseInput" step="0.01" placeholder="Enter expense amount">
        <label for="weeklyEarningsInput">Weekly Earnings:</label>
        <input type="number" id="weeklyEarningsInput" step="0.01" placeholder="Enter weekly earnings">
        <label for="monthlyEarningsInput">Monthly Earnings:</label>
        <input type="number" id="monthlyEarningsInput" step="0.01" placeholder="Enter monthly earnings">
        <label for="monthlyExpensesInput">Monthly Expenses:</label>
        <input type="number" id="monthlyExpensesInput" step="0.01" placeholder="Enter monthly expenses">
        <label for="yearlyEarningsInput">Yearly Earnings:</label>
        <input type="number" id="yearlyEarningsInput" step="0.01" placeholder="Enter yearly earnings">
        <label for="yearlyExpensesInput">Yearly Expenses:</label>
        <input type="number" id="yearlyExpensesInput" step="0.01" placeholder="Enter yearly expenses">
        <button type="submit">Save</button>
      </form>
    </div>
  </div>

  <!-- File input for loading JSON data -->
  <input type="file" id="fileInput" style="display:none" onchange="handleFileSelect(event)">

  <!-- JavaScript Files -->
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <script src="./scripts/index.js"></script>
  <script src="./scripts/theme.js"></script>
  <script src="./scripts/menuAndModal.js"></script>
  <script src="./scripts/dashboard.js"></script>
  <script src="./scripts/savejson.js"></script>
  <script src="./scripts/loadjson.js"></script>
  <script src="./scripts/financialchart.js"></script>

  <!-- Initializing Flatpickr -->
  <script>
    flatpickr("#dateInput", {
      dateFormat: "Y-m-d"
    });
  </script>

</body>
</html>

