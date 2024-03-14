import express from 'express';
import productsRouter from './routes/Products.router.js';
import cartsRouter from './routes/Cart.router.js';

const port = 8080;
const app = express(); 

app.use(express.json());
app.use(express.urlencoded({extended: true}))

//Test de ingreso
app.get('/api', (req, res) => {
    res.send("Ingreso ok")
})

//Use routers
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

//servicio
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});