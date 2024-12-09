document.addEventListener("DOMContentLoaded", () => {
  const cartOverlay = document.getElementById("cart-overlay");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const addToCartButtons = document.querySelectorAll(".fa-shopping-cart");
  const maximizeCartButton = document.getElementById("maximize-cart");
  const closeCartButton = document.getElementById("close-cart");

  let cart = []; // Array to store cart items

  // Function to update cart UI
  function updateCart() {
    cartItems.innerHTML = ""; // Clear existing items
    let total = 0;

    cart.forEach((item, index) => {
      total += item.price * item.quantity;

      const cartItem = document.createElement("li");
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <span>${item.name} - ₱${item.price}</span>
        <div class="quantity-control">
          <button onclick="decreaseQuantity(${index})">-</button>
          <input type="number" value="${item.quantity}" min="1" readonly />
          <button onclick="increaseQuantity(${index})">+</button>
        </div>
        <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Remove</button>
      `;
      cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = `Total: ₱ ${total}`;
  }

  // Function to handle Add to Cart
  function addToCart(item) {
    // Check if item already exists in the cart
    const existingItemIndex = cart.findIndex(cartItem => cartItem.name === item.name);
    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push(item);
    }
    updateCart();
    cartOverlay.classList.remove("d-none"); // Show overlay
  }

  // Function to decrease quantity
  window.decreaseQuantity = function (index) {
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
      updateCart();
    }
  };

  // Function to increase quantity
  window.increaseQuantity = function (index) {
    cart[index].quantity += 1;
    updateCart();
  };

  // Function to remove item from cart
  window.removeFromCart = function (index) {
    cart.splice(index, 1);
    updateCart();
  };

  // Event listener for "Add to Cart" buttons
  addToCartButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productCard = btn.closest(".card");
      const name = productCard.querySelector(".card-title").textContent;
      const price = parseInt(productCard.querySelector(".fw-bold").textContent.replace("₱", ""));
      const image = productCard.querySelector("img").src;
      addToCart({ name, price, image, quantity: 1 });
    });
  });

  // Maximize Cart Button - Redirect to cart page
  maximizeCartButton.addEventListener("click", () => {
    window.location.href = "cart.html";
  });

  // Close Cart Button - Hide overlay
  closeCartButton.addEventListener("click", () => {
    cartOverlay.classList.add("d-none");
  });
});
