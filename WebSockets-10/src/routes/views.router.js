import { Router } from "express";
import ProductManager from "../services/ProductManager.js";

const productManager = new ProductManager("./data/products.json");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const limit = 5;
    const products = await productManager.getProducts(limit);
    const limitedProducts = limit ? products.slice(0, limit) : products;
    limitedProducts.forEach((product) => {
      if (!product.thumbnails || product.thumbnails.length === 0) {
        product.thumbnails = ["img/noThumbnails.webp"];
      }
    });
    res.render("home", {
      title: "Backend / Final - Home",
      style: "styles.css",
      products: limitedProducts,
    });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    products.forEach((product) => {
      if (!product.thumbnails || product.thumbnails.length === 0) {
        product.thumbnails = ["img/noThumbnails.webp"];
      }
    });

    res.render("products", {
      title: "Backend / Final - Products",
      style: "styles.css",
      products: products,
    });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/realtimeproducts", (req, res) =>
  res.render("realTimeProducts", {
    products: [],
    style: "styles.css",
  })
);

export default router;
