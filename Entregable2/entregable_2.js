const fs = require('fs').promises;
const path = require('path');

class ProductManager{
    constructor(){
        this.products = [];
        this.path = "./products.json";
        this.initialize();
    }

    static id = 0;

    async initialize() {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            this.products = JSON.parse(data);
            console.log("Productos inicializados:", this.products);
        } catch (err) {
            console.error("Error al inicializar los productos", err);
        }
    }

    async addProduct({title, description, price, thumbnail, code, stock}){
        try{
            const fields = { title, description, price, thumbnail, code, stock, id: ProductManager.id ++ };
            const isEmpty = Object.values(fields).some(value => !value);
            const isCode =  this.products.find((product)=> product.code === code)
            
            !isCode && !isEmpty && this.products.push(
                fields 
            )
            await fs.writeFile(this.path, JSON.stringify(this.products, null, '\t'));
            console.log(`El producto: ${fields.title} agregado correctamente`)
        }catch(err){
            console.error("Error al intentar agregar el producto", err)
        }
    }
        
    async getProducts(){
        try {
            const data = await fs.readFile(this.path, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            console.error("Error al leer el archivo", error);
            return [];
        }
    }
    getProductById(id){
        const product = this.products.find((product)=> product.id === id)
        return product ? product : console.error("Producto no encontrado");
    }

    async deleteProducts(id){
        try{
            this.products = this.products.filter((product)=> product.id !== id );
            await fs.writeFile(this.path, JSON.stringify(this.products, null, '\t'));
            console.log("Producto eliminado con exito")
        }catch(err){
            console.error("Error al intentar eliminar el producto", err)
        }
    }

    async updateProduct(id, editableKey, editableValue) {
        try{
            this.products = this.products.map((product)=> {
           if(product.id === id){
               product[editableKey] = editableValue
           }
           return product
        });
       await fs.writeFile(this.path, JSON.stringify(this.products, null, '\t'));
        }catch(err){
            console.error('Error al actualizar el producto', err)
        }
        
    }
}
const ProductManager1 = new ProductManager();

(async () => {
    const productData = {
        title: "titulo",
        description: "descripcion",
        price: 9,
        thumbnail: "titulo.jpg",
        code: "code",
        stock: 5,
    };

    await ProductManager1.addProduct(productData);

    const productData2 = {
        title: "Titulo 2",
        description: "Descripcion 2",
        price: 31,
        thumbnail: "titulo2.jpg",
        code: "code 2",
        stock: 5,
    };

    await ProductManager1.addProduct(productData2);

    const productList = await ProductManager1.getProducts();
    console.log("Lista de productos:", productList);

    const getById = ProductManager1.getProductById(1);
    console.log("Producto con ID 1:", getById);

    await ProductManager1.updateProduct(1, "title", "Nuevo titulo 2");

    await ProductManager1.deleteProducts(2);

    const productData3 = {
        title: "Titulo 3",
        description: "Descripción 3",
        price: 23,
        thumbnail: "titulo3.jpg",
        code: "code3",
        stock: 3,
    }

    await ProductManager1.addProduct(productData3);
    
    const updatedProductList = await ProductManager1.getProducts();
    console.log("Lista de productos actualizada:", updatedProductList);
})();