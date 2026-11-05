import express from 'express'
import cors from 'cors'

import { userRouter } from '../routes/user.routes.js'
import { connectToMongoDB } from '../database/config.db.js'
import { authRouter } from '../routes/auth.router.js'

export default class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT

    this.usersPath = '/api/users/'
    this.authPath = '/api/auth/'

    //Conexion a base de datos
    this.conectarDB()

    //Middlewares
    this.middlewares()

    //Routes
    this.routes()
  }

  async conectarDB() {
    await connectToMongoDB()
  }

  middlewares() {
    //CORS
    this.app.use(cors())

    //READ & PARSE FROM BODY
    this.app.use(express.json())

    //PUBLIC DIRECTORY
    this.app.use(express.static('public'))
  }

  routes() {
    this.app.use(this.authPath, authRouter, (req, res) => {
      res.sendStatus(401);
    })
    this.app.use(this.usersPath, userRouter, (req, res) => {
      res.sendStatus(401);
    })
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`)
    })
  }
}