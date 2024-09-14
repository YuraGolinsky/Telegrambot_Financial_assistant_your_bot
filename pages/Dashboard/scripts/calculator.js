function openCalculatorModal() {
  document.getElementById('calculatorModal').style.display = 'block';
}

function closeCalculatorModal() {
  document.getElementById('calculatorModal').style.display = 'none';
}

function appendToCalculator(value) {
  document.getElementById('calculatorInput').value += value;
}

function clearCalculator() {
  document.getElementById('calculatorInput').value = '';
}

function calculateResult() {
  const input = document.getElementById('calculatorInput').value;
  try {
    const result = eval(input); // Note: eval can be dangerous if not used properly
    document.getElementById('calculatorInput').value = result;
  } catch {
    document.getElementById('calculatorInput').value = 'Error';
  }
}
// Function to open the calculator modal
function openCalculatorModal() {
  document.getElementById('calculatorModal').style.display = 'block';
}

// Function to close the calculator modal
function closeCalculatorModal() {
  document.getElementById('calculatorModal').style.display = 'none';
}

// Add event listeners to the calculator button and close button
document.getElementById('calculatorButton').addEventListener('click', openCalculatorModal);
document.querySelector('.close-calculator').addEventListener('click', closeCalculatorModal);
