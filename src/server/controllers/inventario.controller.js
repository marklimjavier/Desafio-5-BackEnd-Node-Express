import * as sql from '../models/inventario.model.js'
import { handleError } from '../helpers/errorHandle.js'

export const findAllHateoas = async (req, res) => {
  try {
    const result = await sql.findAllHateoas(req.query)
    const totalJewels = result.length
    const stockTotal = result.reduce((acc, jewel) => acc + jewel.stock, 0)
    const jewelsHateoas = result.map(jewel => {
      return {
        name: jewel.nombre,
        href: `/joyas/${jewel.id}`
      }
    })
    const response = { status: true, code: 200, totalJoyas: totalJewels, stock: stockTotal, data: jewelsHateoas }

    res.status(200).json(response)
  } catch (error) {
    handleError(res, error, 'Error fetching all the jewels HATEOAS')
  }
}

export const filterfindAll = async (req, res) => {
  try {
    const result = await sql.filterFindAll(req.query)

    const response = { status: true, code: 200, message: result }

    res.status(200).json(response)
  } catch (error) {
    handleError(res, error, 'Error fetching all the jewels')
  }
}

export const findById = async (req, res) => {
  try {
    const result = await sql.findById(req.params.id)
    res.status(200).json({ status: true, code: 200, message: result })
  } catch (error) {
    handleError(res, error, 'Error fetching jewel by id')
  }
}

export const createJewel = async (req, res) => {
  const { nombre, categoria, metal, precio, stock } = req.body

  if (!nombre) return res.status(422).json({ status: false, code: 400, message: 'Nombre is required' })
  if (!categoria) return res.status(422).json({ status: false, code: 400, message: 'Categoria is required' })
  if (!metal) return res.status(422).json({ status: false, code: 400, message: 'Metal is required' })
  if (!precio) return res.status(422).json({ status: false, code: 400, message: 'Precio is required' })
  if (!stock) return res.status(422).json({ status: false, code: 400, message: 'Stock is required' })

  try {
    const result = await sql.createJewel(req.body)
    res.status(201).json({ status: true, code: 201, message: result })
  } catch (error) {
    handleError(res, error, 'Error creating a jewel')
  }
}

export const updateById = async (req, res) => {
  const { nombre, categoria, metal, precio, stock } = req.body

  if (!nombre) return res.status(422).json({ status: false, code: 400, message: 'Nombre is required' })
  if (!categoria) return res.status(422).json({ status: false, code: 400, message: 'Categoria is required' })
  if (!metal) return res.status(422).json({ status: false, code: 400, message: 'Metal is required' })
  if (!precio) return res.status(422).json({ status: false, code: 400, message: 'Precio is required' })
  if (!stock) return res.status(422).json({ status: false, code: 400, message: 'Stock is required' })

  try {
    const result = await sql.updateById(req.params.id, req.body)
    res.status(200).json({ status: true, code: 200, message: result })
  } catch (error) {
    handleError(res, error, 'Error updating a jewel')
  }
}

export const deleteById = async (req, res) => {
  try {
    const result = await sql.deleteById(req.params.id)
    res.status(200).json({ status: true, code: 200, message: result })
  } catch (error) {
    handleError(res, error, 'Error deleting a jewel by id')
  }
}
