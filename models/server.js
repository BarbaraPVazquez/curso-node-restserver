import express from 'express'
import cors from 'cors'

import { router } from '../routes/user.routes.js'

export default class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.usersPath = '/api/users/'

    //Middlewares
    this.middlewares()
    //Routes
    this.routes()
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
    this.app.use(this.usersPath, router, (req, res) => {
      res.sendStatus(401);
    })
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`)
    })
  }
}