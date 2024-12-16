// Select DOM elements
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const addTransactionBtn = document.getElementById("add-transaction");
const transactionList = document.getElementById("transaction-list");
const balanceDisplay = document.getElementById("balance");

// Variables
let transactions = [];

// Event listener for adding transactions
addTransactionBtn.addEventListener("click", addTransaction);

// Add a new transaction
function addTransaction() {
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (!description || isNaN(amount)) {
        alert("Please enter a valid description and amount.");
        return;
    }

    // Create transaction object
    const transaction = {
        id: generateID(),
        description,
        amount
    };

    transactions.push(transaction);

    // Update UI
    updateUI();

    // Clear input fields
    descriptionInput.value = "";
    amountInput.value = "";
}

// Generate unique ID
function generateID() {
    return Math.floor(Math.random() * 100000);
}

// Update the UI
function updateUI() {
    // Clear existing list
    transactionList.innerHTML = "";

    // Calculate balance
    let balance = 0;

    transactions.forEach((transaction) => {
        // Create list item
        const listItem = document.createElement("li");
        listItem.classList.add(transaction.amount < 0 ? "negative" : "positive");

        listItem.innerHTML = `
            ${transaction.description} 
            <span>${transaction.amount < 0 ? "-" : "+"}?${Math.abs(transaction.amount)}</span>
        `;

        // Append list item to the list
        transactionList.appendChild(listItem);

        // Update balance
        balance += transaction.amount;
    });

    // Update balance display
    balanceDisplay.textContent = `?${balance.toFixed(2)}`;
}
