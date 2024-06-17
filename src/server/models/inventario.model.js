import format from 'pg-format'
import db from '../database/db_connect.js'

export const findAllHateoas = ({
  limits = 4,
  page = 1,
  order_by: orderBy = 'id_ASC'
}) => {
  const [column, sort] = orderBy.split('_')
  const offset = (page - 1) * limits
  const queryFormatted = format('SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s;', column, sort, limits, offset)
  return db(queryFormatted)
}

export const filterFindAll = ({
  precio_max: precioMax,
  precio_min: precioMin,
  categoria,
  metal
}) => {
  let query = 'SELECT * FROM inventario WHERE 1=1'
  if (precioMax) {
    query += format(' AND precio <= %L', precioMax)
  }
  if (precioMin) {
    query += format(' AND precio >= %L', precioMin)
  }
  if (categoria) {
    query += format(' AND categoria = %L', categoria)
  }
  if (metal) {
    query += format(' AND metal = %L', metal)
  }
  return db(query)
}

export const findById = (id) => db('SELECT * FROM inventario WHERE id = $1;', [id])

export const createJewel = ({ nombre, categoria, metal, precio, stock }) =>
  db('INSERT INTO inventario (nombre, categoria, metal, precio, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *;', [nombre, categoria, metal, precio, stock])

export const updateById = (id, { nombre, categoria, metal, precio, stock }) =>
  db('UPDATE inventario SET nombre = $2, categoria = $3, metal = $4, precio = $5, stock = $6 WHERE id = $1 RETURNING *;', [id, nombre, categoria, metal, precio, stock])

export const deleteById = (id) => db('DELETE FROM inventario WHERE id = $1 RETURNING *;', [id])
