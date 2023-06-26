// Get the cart button and slider element
const cartButton = document.getElementById("cartButton");
const cartSlider = document.getElementById("cartSlider");
const cartContent = document.getElementById("cartContent");
const totalBalance = document.getElementById("totalBalance");
const cartHeader = document.getElementById("cartHeader");
let cartItems = 0;
let balance = 0;

// Load cart items from localStorage
if (localStorage.getItem("cartItems")) {
    cartItems = parseInt(localStorage.getItem("cartItems"));
    balance = parseFloat(localStorage.getItem("balance"));
    cartContent.innerHTML = localStorage.getItem("cartContent");
    cartButton.textContent = `Cart (${cartItems})`;
    totalBalance.textContent = `Total: $${balance.toFixed(2)}`;
}

// Save cart items to localStorage
function saveCartItems() {
    localStorage.setItem("cartItems", cartItems.toString());
    localStorage.setItem("balance", balance.toString());
    localStorage.setItem("cartContent", cartContent.innerHTML);
}

// Add a click event listener to the cart button
cartButton.addEventListener("click", function () {
    // Toggle the "show" class on the cart slider to slide it in/out
    cartSlider.classList.toggle("show");
});

// Add a click event listener to the cart header
cartHeader.addEventListener("click", function () {
    // Toggle the "show" class on the cart slider to slide it in/out
    cartSlider.classList.toggle("show");
});

// Add event listeners to the "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll(".product-button");
addToCartButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        // Get the product details
        const product = this.parentElement;
        const productName = product.querySelector(".product-word").textContent;
        const productPrice = parseFloat(
            product.querySelector(".product-price").textContent.slice(1)
        );

        // Create a new cart item row
        const cartRow = document.createElement("tr");
        cartRow.innerHTML = `
            <td>${productName}</td>
            <td>$${productPrice.toFixed(2)}</td>
            <td><input type="number" min="1" value="1" class="quantity-input"></td>
        `;

        // Append the cart row to the cart content
        cartContent.appendChild(cartRow);

        // Update the cart items count and calculate the balance
        cartItems++;
        balance += productPrice;
        cartButton.textContent = `Cart (${cartItems})`;

        // Update the total balance
        totalBalance.textContent = `Total: $${balance.toFixed(2)}`;

        // Add an event listener to the quantity input
        const quantityInput = cartRow.querySelector(".quantity-input");
        quantityInput.addEventListener("input", function () {
            const quantity = parseInt(this.value);
            const rowPrice = productPrice * quantity;
            const priceCell = cartRow.querySelector("td:nth-child(2)");
            priceCell.textContent = `$${rowPrice.toFixed(2)}`;

            // Recalculate the balance
            balance = 0;
            const rows = document.querySelectorAll("#cartTable tbody tr");
            rows.forEach(function (row) {
                const rowPrice = parseFloat(
                    row.querySelector("td:nth-child(2)").textContent.slice(1)
                );
                balance += rowPrice;
            });

            // Update the total balance
            totalBalance.textContent = `Total: $${balance.toFixed(2)}`;

            // Save cart items to localStorage
            saveCartItems();
        });

        // Save cart items to localStorage
        saveCartItems();
    });
});
