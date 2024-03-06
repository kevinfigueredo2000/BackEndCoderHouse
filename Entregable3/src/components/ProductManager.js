import fs  from 'fs';

export default class ProductManager{
    constructor(path){
        this.products = [];
        this.path = path;
    }

    static id = 0;
        
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
}