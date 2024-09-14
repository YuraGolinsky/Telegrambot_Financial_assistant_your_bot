// Modal functionality
const Modal = {
    open: function() {
      document.getElementById('transactionModal').style.display = 'block';
    },
    close: function() {
      document.getElementById('transactionModal').style.display = 'none';
    }
  };
  
  // Update Total
  function updateTotal() {
    const incomes = parseFloat(document.getElementById('incomes').value) || 0;
    const expenses = parseFloat(document.getElementById('expenses').value) || 0;
    const weeklyEarnings = parseFloat(document.getElementById('weeklyEarnings').value) || 0;
    const monthlyEarnings = parseFloat(document.getElementById('monthlyEarnings').value) || 0;
    const monthlyExpenses = parseFloat(document.getElementById('monthlyExpenses').value) || 0;
    const yearlyEarnings = parseFloat(document.getElementById('yearlyEarnings').value) || 0;
    const yearlyExpenses = parseFloat(document.getElementById('yearlyExpenses').value) || 0;
  
    const total = incomes - expenses + weeklyEarnings + monthlyEarnings - monthlyExpenses + yearlyEarnings - yearlyExpenses;
    
    document.getElementById('total').value = `R$ ${total.toFixed(2)}`;
  }
  
  // Submit Form
  function submitForm() {
    // Implement form submission logic
    alert('Data saved successfully!');
    Modal.close();
  }
  