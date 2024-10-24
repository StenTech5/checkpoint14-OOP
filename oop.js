// Product class
class Product {
    constructor(id, name, price, image) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.image = image; // Add image property
    }
  }
  
  // ShoppingCartItem class
  class ShoppingCartItem {
    constructor(product, quantity) {
      this.product = product;
      this.quantity = quantity;
    }
  
    getTotalPrice() {
      return this.product.price * this.quantity;
    }
  }
  
  // ShoppingCart class
  class ShoppingCart {
    constructor() {
      this.items = [];
    }
  
    addItem(product, quantity) {
      const existingItem = this.items.find(item => item.product.id === product.id);
  
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        const cartItem = new ShoppingCartItem(product, quantity);
        this.items.push(cartItem);
      }
  
      this.displayCartWithIcons();
    }
  
    removeItem(productId) {
      this.items = this.items.filter(item => item.product.id !== productId);
      this.displayCartWithIcons();
    }
  
    increaseQuantity(productId) {
      const item = this.items.find(item => item.product.id === productId);
      if (item) {
        item.quantity++;
        this.displayCartWithIcons();
      }
    }
  
    decreaseQuantity(productId) {
      const item = this.items.find(item => item.product.id === productId);
      if (item && item.quantity > 1) {
        item.quantity--;
        this.displayCartWithIcons();
      } else {
        this.removeItem(productId);
      }
    }
  
    getTotalPrice() {
      return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }
  
    displayCartWithIcons() {
      const cartDiv = document.getElementById('cart');
      cartDiv.innerHTML = '';
  
      if (this.items.length === 0) {
        cartDiv.innerHTML = `<p class="text-center text-gray-600">Your cart is empty.</p>`;
        return;
      }
      
  
      this.items.forEach(item => {
        cartDiv.innerHTML += `
          <div class="cart-item flex justify-between items-center p-4 border-b">
            <div class="flex items-center">
              <img src="${item.product.image}" alt="${item.product.name}" class="w-16 h-16 rounded-full mr-4" />
              <div>
                <p class="text-lg font-semibold">${item.product.name}</p>
                <p>$${item.product.price} x ${item.quantity} = $${item.getTotalPrice()}</p>
              </div>
            </div>
            <div class="flex items-center">
              <button onclick="cart.decreaseQuantity(${item.product.id})" class="text-xl text-red-500 mx-2">
                <i class="fas fa-minus-circle"></i>
              </button>
              <button onclick="cart.increaseQuantity(${item.product.id})" class="text-xl text-green-500 mx-2">
                <i class="fas fa-plus-circle"></i>
              </button>
              <button onclick="cart.removeItem(${item.product.id})" class="text-xl text-gray-500 mx-2">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        `;
      });
  
      cartDiv.innerHTML += `
        <div class="cart-total text-right mt-4">
          <p class="text-lg font-semibold">Total: $${this.getTotalPrice().toFixed(2)}</p>
        </div>
      `;
    }
  }
  
  // Create product instances
  const product1 = new Product(1, 'Laptop', 1500, 'https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/32/5062291/1.jpg?5973');
  const product2 = new Product(2, 'Phone', 800, 'https://i0.wp.com/nextcashandcarry.com.ng/wp-content/uploads/2023/01/6384936d412d6.jpeg?fit=1500%2C1500&ssl=1');
  const product3 = new Product(3, 'Headphones', 150, 'https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/32/5062291/1.jpg?5973');
  
  // Create cart instance
  const cart = new ShoppingCart();
  