import express from "express";
import productsRouter from "./routes/Products.router.js";
import cartsRouter from "./routes/Cart.router.js";

const app = express();
app.use(express.json());

const PORT = 8080

app.use(express.urlencoded({extended : true}));

app.use(productsRouter)
app.use(cartsRouter)

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}/`)
})