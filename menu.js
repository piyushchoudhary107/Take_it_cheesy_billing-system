document.addEventListener('DOMContentLoaded', () => {
    const menuItems = [
        { title: "Margherita Pizza", amount: "1 piece", price: 469, imgurl: "images/pizza.jpg" },
        { title: "Caesar Salad", amount: "1 plate", price: 539, imgurl: "images/salad.jpg" },
        { title: "Grilled Chicken", amount: "1 piece", price: 399, imgurl: "images/chicken.jpg" }
    ];

    const menuTableBody = document.getElementById('menu_table_body');
    menuItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.title}</td>
            <td>${item.amount}</td>
            <td>₹${item.price}</td>
            <td><img src="${item.imgurl}" alt="${item.title}" width="50"></td>
            <td><button class="add-to-cart" 
                        data-title="${item.title}" 
                        data-price="${item.price}" 
                        data-imgurl="${item.imgurl}" 
                        data-amount="${item.amount}">
                Add to Cart
            </button></td>
        `;
        menuTableBody.appendChild(row);
    });

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const title = event.target.getAttribute('data-title');
            const price = parseFloat(event.target.getAttribute('data-price'));
            const imgurl = event.target.getAttribute('data-imgurl');
            const amount = event.target.getAttribute('data-amount');

            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push({ title, price, imgurl, amount });
            localStorage.setItem('cart', JSON.stringify(cart));

            alert(`${title} added to the cart!`);
        });
    });
});
