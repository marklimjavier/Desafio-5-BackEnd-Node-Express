export const handleError = (res, error, customMessage) => {
  console.error(customMessage, error)
  res.status(500).json({ status: false, code: 500, message: customMessage })
}
