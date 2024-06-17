export const notFound = (req, res) => {
  res.status(404).json({
    status: false,
    code: 404,
    message: 'The requested resource was not found on this server, try using http://localhost:3000/joyas'
  })
}
