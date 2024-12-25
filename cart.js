document.addEventListener('DOMContentLoaded', () => {
    function displayCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartList = document.getElementById('cart-list');
        cartList.innerHTML = ''; // Clear previous cart items

        if (cart.length === 0) {
            cartList.innerHTML = '<li class="list-group-item">Your cart is empty!</li>';
        } else {
            let total = 0;
            cart.forEach((item, index) => {
                const cartItem = document.createElement('li');
                cartItem.classList.add('list-group-item');

                cartItem.innerHTML = `
                    <div class="cart-item">
                        <img src="${item.imgurl}" alt="${item.title}" width="50">
                        <span>${item.title} (${item.amount}) - ₹${item.price}</span>
                        <button class="btn btn-danger btn-sm remove-item" data-index="${index}">Remove</button>
                    </div>
                `;
                cartList.appendChild(cartItem);
                total += item.price;
            });

            document.getElementById('totalBillToastBody').innerText = `Total: ₹${total}`;
        }
    }

    function removeFromCart(index) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }

    document.getElementById('cart-list').addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item')) {
            const index = parseInt(event.target.getAttribute('data-index'), 10);
            removeFromCart(index);
        }
    });

    document.getElementById('clear-cart-btn').addEventListener('click', () => {
        localStorage.removeItem('cart');
        displayCart();
    });

    document.getElementById('generate-bill-btn').addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length > 0) {
            const total = cart.reduce((sum, item) => sum + item.price, 0);
            alert(`Your total bill is ₹${total}. Thank you for your order!`);
            localStorage.removeItem('cart');
            displayCart();
        } else {
            alert('Your cart is empty.');
        }
    });

    displayCart(); // Render cart on page load
});
