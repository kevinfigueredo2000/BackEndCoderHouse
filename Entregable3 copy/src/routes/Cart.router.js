// creo q aca es app y en app js es router.get

import { Router } from "express"
import ProductManager from "../components/ProductManager.js"
import CartManager from "../components/CartManager.js"

const cartsRouter = Router()

const db = './db/products.json' 
const pm = new ProductManager(db)
const carts = new CartManager

cartsRouter.post("/api/cart", async (req, res)=>{
    try {
        const newCart = await carts.addCart();
        res.status(201).json(newCart);
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
})

cartsRouter.get("/api/cart/:cid", async (req, res)=>{
    try {
        const { cid } = req.params;
        const cart = await carts.getCartById(cid);
        if (cart) {
          res.json(cart);
        }
      } catch (error) {
        res.status(404).send({ error: "carrito no existe" });
      }
})

cartsRouter.put("/api/cart/:cid", async (req, res)=>{
    try {
        const { cid, pid } = req.params;
        const productDetails = await products.getProductById(pid);  
        if(!productDetails){
          return res.status(400).send({error: 'Producto no encontrado'});
        }
        const updateCart = await carts.addProductToACart(cid, productDetails);
        res.status(201).json(updateCart);
      } catch (error) {
        res.status(500).send(
          { status: 'Error', error: error.message }
        );
      }
})


export default cartsRouter