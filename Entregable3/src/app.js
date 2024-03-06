import express from "express";
import ProductManager from "./components/ProductManager.js";

const app = express();

const PORT = 8080


// Instanciado de la base de datos
const db = './db/products.json' 

// Creación de productmanager
const pm = new ProductManager(db);

// Interpretador de datos complejos traidos desde url
app.use(express.urlencoded({extended : true}));

//si hay limite, mostrar productos por limite, sino no hacerlo
app.get("/products", async (req, res)=>{
    try{
        const products = await pm.getProducts();
        const limit = req.query.limit;
        !limit ? res.send(products) : res.send(json(products.slice(0, limit)))
        res.status(200).send("Productos encontrados")
    }catch(err){
        console.error("error", err)
        res.status(400).send("Error al obtener los productos")
    }
})

app.get("/products/:pid", async (req, res)=>{
    const pid = req.params.pid;
    try{
        const product = await pm.getProductById(parseInt(pid)) ;
        res.send(product)
    }catch(err){
        console.err("error", err)
        res.status(400).send("Error al obtener el producto")
    }
    
})

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}/`)
})