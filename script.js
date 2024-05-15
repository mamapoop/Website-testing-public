// Function to add item to cart
function addToCart(name, price) {
    // Initialize cart from localStorage
    let cart = getCartFromStorage();
    cart.push({ name, price: parseFloat(price) });
    saveCartToStorage(cart);
    alert('Item added to cart!');
}

// Function to handle form submission
function FormSubmit(event) {
    event.preventDefault(); 
    alert('You have submitted the Form, Thank you!');
    // Reset the form
    event.target.reset();
}

// Function to remove item from cart
function removeFromCart(index) {
    // Initialize cart from localStorage
    let cart = getCartFromStorage();
    cart.splice(index, 1);
    saveCartToStorage(cart);
    renderCart();
}

// Function to retrieve cart from localStorage
function getCartFromStorage() {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
}

// Function to save cart to localStorage
function saveCartToStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to render cart items
function renderCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = ''; // Clear previous items
    const cart = getCartFromStorage();
    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `<h3>${item.name}</h3><p>₱${item.price}</p><button onclick="removeFromCart(${index})">Remove</button>`;
        cartItemsDiv.appendChild(itemDiv);
    });
}

// Function to calculate total price
function calculateTotal() {
    const cart = getCartFromStorage();
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('total-price').innerText = `Total Price: ₱${totalPrice}`;
}

// Function to display receipt on receipt page
function renderReceipt() {
    const cart = getCartFromStorage();
    const receiptItemsDiv = document.getElementById('receipt-items');
    receiptItemsDiv.innerHTML = ''; // Clear previous items
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `<p>${item.name}: ₱${item.price}</p>`;
        receiptItemsDiv.appendChild(itemDiv);
    });
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('receipt-total').innerText = `Total Price: ₱${totalPrice}`;
}

// Add event listeners to all add-to-cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.dataset.name;
        const price = button.dataset.price;
        addToCart(name, price);
    });
});

// Display cart items in the cart page and add event listeners for buttons
if (window.location.pathname.includes("cart.html")) {
    renderCart();
    document.getElementById('calculate-total').addEventListener('click', calculateTotal);
    document.getElementById('go-to-receipt').addEventListener('click', () => {
        window.location.href = 'receipt.html';
    });
}

// Display receipt items in the receipt page
if (window.location.pathname.includes("receipt.html")) {
    renderReceipt();
}
