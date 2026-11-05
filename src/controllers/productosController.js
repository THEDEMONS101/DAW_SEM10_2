// src/controllers/productosController.js
import pool from "../config/db.js";

// GET /api/productos
export const listarProductos = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, nombre, precio, stock, created_at FROM productos ORDER BY id DESC"
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error("[listarProductos]", err);
    res.status(500).json({ error: "Error interno al listar productos" });
  }
};

// GET /api/productos/:id
export const obtenerProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.execute(
      "SELECT id, nombre, precio, stock, created_at FROM productos WHERE id = ?",
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: `Producto ${id} no encontrado` });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error("[obtenerProducto]", err);
    res.status(500).json({ error: "Error interno al obtener producto" });
  }
};

// POST /api/productos
export const crearProducto = async (req, res) => {
  const { nombre, precio, stock } = req.body;

  // Validación básica (400)
  if (!nombre || typeof precio !== "number" || precio < 0) {
    return res
      .status(400)
      .json({ error: "Datos inválidos: se requiere nombre y precio >= 0" });
  }

  try {
    const [result] = await pool.execute(
      "INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)",
      [nombre.trim(), precio, Number.isInteger(stock) ? stock : 0]
    );
    const [rows] = await pool.execute(
      "SELECT id, nombre, precio, stock, created_at FROM productos WHERE id = ?",
      [result.insertId]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("[crearProducto]", err);
    res.status(500).json({ error: "Error interno al crear producto" });
  }
};

// PUT /api/productos/:id
export const actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, stock } = req.body;

  if (!nombre || typeof precio !== "number" || precio < 0) {
    return res.status(400).json({ error: "Datos inválidos para actualizar" });
  }

  try {
    const [result] = await pool.execute(
      "UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?",
      [nombre.trim(), precio, Number.isInteger(stock) ? stock : 0, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: `Producto ${id} no encontrado` });
    }
    const [rows] = await pool.execute(
      "SELECT id, nombre, precio, stock, created_at FROM productos WHERE id = ?",
      [id]
    );
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error("[actualizarProducto]", err);
    res.status(500).json({ error: "Error interno al actualizar producto" });
  }
};

// DELETE /api/productos/:id
export const eliminarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.execute(
      "DELETE FROM productos WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: `Producto ${id} no encontrado` });
    }
    res.status(204).send(); // 204 No Content
  } catch (err) {
    console.error("[eliminarProducto]", err);
    res.status(500).json({ error: "Error interno al eliminar producto" });
  }
};