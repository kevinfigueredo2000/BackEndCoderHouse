import fs  from 'fs';

export default class ProductManager{
    constructor(path){
        this.products = [];
        this.path = path;
    }

    static id = 0;
        
    async addProduct({title, description, price, thumbnail, code, stock}){
        try{
            // Hacer funcion middleware con verificacion de fields. *Creo q es a nivel servidor, por lo q se aplicaria en el app?
            const fields = { title, description, price, thumbnail, code, stock, id: ProductManager.id ++ };
            const isEmpty = Object.values(fields).some(value => !value);
            const isCode =  this.products.find((product)=> product.code === code)
            
            !isCode && !isEmpty && this.products.push(
                fields 
            )
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'));
            console.log(`El producto: ${fields.title} agregado correctamente`)
        }catch(err){
            console.error("Error al intentar agregar el producto", err)
        }
    }

    async getProducts(){
        try {
            const data = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            console.error("Error al leer el archivo", error);
            return [];
        }
    }
    async getProductById(id){
        try{
            const data = await fs.promises.readFile(this.path, "utf-8");
            let productParsed = JSON.parse(data)
            const productfiltered = productParsed.find((product)=> product.id === id)
            return productfiltered ? productfiltered : console.error("Producto no encontrado");
        }catch(err){
            console.log(err)
        }
    }
    async deleteProducts(id){
        try{
            const data = await fs.promises.readFile(this.path, "utf-8");
            this.products = JSON.parse(data); // Parsear los datos leídos del archivo JSON
            this.products = this.products.filter((product)=> product.id !== id );
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
            console.log("Producto eliminado con éxito");
        } catch(err){
            console.error("Error al intentar eliminar el producto", err);
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
       await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'));
        }catch(err){
            console.error('Error al actualizar el producto', err)
        }
        
    }
}