// creo q aca es app y en app js es router.get

import express, { Router } from "express"
import ProductManager from "../components/ProductManager.js"

const productsRouter = Router()

const app = express()

const db = './db/products.json' 
const pm = new ProductManager(db)

app.use(express.static('public'));

productsRouter.get("/api/products", async (req, res)=>{
    try{
        const products = await pm.getProducts();
        const limit = req.query.limit;
        !limit ? res.send(products) : res.send(products.slice(0, Number(limit)))
        res.status(200).send("Productos encontrados")
    }catch(err){
        console.error("error", err.message)
        res.status(500).send("Error al obtener los productos")
    }
})

productsRouter.get("/api/products/:pid", async (req, res)=>{
    const pid = req.params.pid;
    try{
        const product = await pm.getProductById(parseInt(pid)) ;
        if (product) {
            res.status(200).send(product);
        }
    }catch(err){
        console.err("error", err)
        res.status(400).send("Error al obtener el producto")
    }  
})


productsRouter.post("/api/products/", async (req, res)=>{
    const  {title, description, price, thumbnail, code, stock} = req.body;
    if (!title || !description || price === undefined || !code || stock === undefined) {
        return res.status(400).send({status: 'Error', error: "Todos los campos son obligatorios excepto thumbnail" });
    }
    const status = req.body.status !== undefined ? req.body.status : true;
    try{
        const product = await pm.addProduct({ ...req.body, id: ProductManager.id ++ }) ;
        res.status(status).send(product);
    }catch(err){
        console.err("error", err)
        res.status(400).send("Error al agregar el producto")
    }  
})

productsRouter.put("/api/products/:id", async (req, res)=>{
    const pid = req.params.pid;
    try{
        const product = await pm.updateProduct( parseInt(pid), req.editableKey, req.editableValue ) ;
        res.send(product)
    }catch(err){
        console.err("error", err)
        res.status(400).send("Error al agregar el producto")
    }  
})

productsRouter.delete("/api/products/:id", async (req, res)=>{
    const pid = req.params.pid;
    try{
        await pm.deleteProducts(pid) ;
        res.status(204).send("¡Se elimino el producto con éxito!")
    }catch(err){
        console.err("error", err)
        res.status(404).send("Error al agregar el producto")
    }  
})

export default productsRouter