import jwt from "jsonwebtoken"

export const authMiddleware = (req, res, next) => {

  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" })
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET)

  req.user = { _id: decoded.id }

  next()

}