import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import dns from "node:dns/promises";
import path from "path";

import productRoutes from "./routes/product.route.js";

dns.setServers(["1.1.1.1", "8.8.8.8", "1.0.0.1", "8.8.4.4"]);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json()); // allows to accept JSON data in the req.body

app.use("/api/products", productRoutes);

console.log(process.env.MONGO_URI);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "..", "frontend", "dist");

  app.use(express.static(frontendPath));

  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});
