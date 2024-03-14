//crear funciones para carrito

//crear carrito desde acá
import fs  from 'fs';

export default class CartManager{
    constructor(path){
        this.cart = [];
        this.path = path;
    }

    static id = 0;
        
    async newCart({id, products}){
        try{
            //crear carrito con id y products
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'));
        }catch(err){
            console.error("Error al intentar agregar el producto", err)
        }
    }

    async addProduct({product, quantity}){//Product (solo contiene id)
        try{
           //agregar producto a cart
           //*si un producto ya está agregado, solo se suma  su quantity*
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'));
            console.log(`El producto: ${fields.title} agregado correctamente`)
        }catch(err){
            console.error("Error al intentar agregar el producto", err)
        }
    }

    async getCartById(id){
        try{
            // const data = await fs.promises.readFile(this.path, "utf-8");
            // let productParsed = JSON.parse(data)
            // const productfiltered = productParsed.find((product)=> product.id === id)
            // return productfiltered ? productfiltered : console.error("Producto no encontrado");
        }catch(err){
            console.log(err)
        }
    }
}