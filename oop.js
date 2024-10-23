// 1. Create a Product class
class Product {
    constructor(id, name, price) {
      this.id = id;
      this.name = name;
      this.price = price;
    }
  }
  
  // 2. Create a ShoppingCartItem class
  class ShoppingCartItem {
    constructor(product, quantity) {
      this.product = product;
      this.quantity = quantity;
    }
  
    // Method to calculate total price of the item (price * quantity)
    getTotalPrice() {
      return this.product.price * this.quantity;
    }
  }
  
  // 3. Create a ShoppingCart class
  class ShoppingCart {
    constructor() {
      this.items = []; // Array to store ShoppingCartItem instances
    }
  
    // Method to add items to the cart
    addItem(product, quantity) {
      // Check if product is already in the cart
      const existingItem = this.items.find(item => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity; // Update quantity if product exists
      } else {
        const cartItem = new ShoppingCartItem(product, quantity);
        this.items.push(cartItem); // Add new item to the cart
      }
    }
  
    // Method to remove items from the cart
    removeItem(productId) {
      this.items = this.items.filter(item => item.product.id !== productId);
    }
  
    // Method to get the total number of items in the cart
    getTotalItems() {
      return this.items.reduce((total, item) => total + item.quantity, 0);
    }
  
    // Method to calculate the total cost of items in the cart
    getTotalCost() {
      return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }
  
    // Method to display all items in the cart
    displayCart() {
      console.log("Shopping Cart:");
      this.items.forEach(item => {
        console.log(`${item.product.name} - Quantity: ${item.quantity}, Total: $${item.getTotalPrice()}`);
      });
      console.log(`Total Items: ${this.getTotalItems()}`);
      console.log(`Total Cost: $${this.getTotalCost()}`);
    }
  }
  
  // Testing the code
  
  // Create some products
  const product1 = new Product(1, "Laptop", 1000);
  const product2 = new Product(2, "Phone", 500);
  const product3 = new Product(3, "Headphones", 100);
  
  // Create a shopping cart
  const cart = new ShoppingCart();
  
  // Add items to the cart
  cart.addItem(product1, 1); // Add 1 Laptop
  cart.addItem(product2, 2); // Add 2 Phones
  cart.addItem(product3, 3); // Add 3 Headphones
  
  // Display the cart
  cart.displayCart();
  
  // Remove an item from the cart (remove product with id 2 - Phone)
  cart.removeItem(2);
  
  // Display the cart again
  cart.displayCart();
  