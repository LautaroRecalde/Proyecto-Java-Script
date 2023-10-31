class ProductManager {
    constructor() {
      this.products = [];
    }
  
    addProduct(product) {
      if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || product.stock === undefined) {
        console.log("Todos los campos son obligatorios");
        return;
      }
  
      if (this.products.some(p => p.code === product.code)) {
        console.log("Ya existe un producto con el mismo código.");
        return;
      }
  
      product.id = this.generateProductId();
      this.products.push(product);
    }
  
    generateProductId() {
      if (this.products.length === 0) {
        return 1;
      }
      const maxId = Math.max(...this.products.map(product => product.id));
      return maxId + 1;
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find(product => product.id === id);
      if (product) {
        return product;
      } else {
        console.log("Producto no encontrado");
        return null;
      }
    }
  }
  
  // Ejemplo de uso
  const productManager = new ProductManager();
  
  productManager.addProduct({
    title: "Producto 1",
    description: "Descripción del Producto 1",
    price: 19.99,
    thumbnail: "imagen1.jpg",
    code: "P1",
    stock: 10
  });
  
  productManager.addProduct({
    title: "Producto 2",
    description: "Descripción del Producto 2",
    price: 29.99,
    thumbnail: "imagen2.jpg",
    code: "P2",
    stock: 5
  });
  
  const allProducts = productManager.getProducts();
  console.log(allProducts);
  
  const product = productManager.getProductById(1);
  console.log(product);
  
  const nonExistentProduct = productManager.getProductById(3);
  