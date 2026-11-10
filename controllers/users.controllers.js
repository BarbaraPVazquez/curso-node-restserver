import { response, request } from "express";
import { User } from '../models/user.js'
import bcryptjs from 'bcryptjs'

//!limit se refiere a la cantidad de documentos a mostrar, no al número de elemento
export const usersGet = async (req = request, res = response) => {

  const { desde = 0, limite = 5 } = req.query
  const query = { status: true }
  /*? De esta forma el tiempo de respuesta tarde el doble, con Promise.all se reduce a la mitad
  const users = await User.find(query)
    .skip(Number(desde))
    .limit(Number(limite))
  const total = await User.countDocuments(query) */
  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
  ])
  res.json({ total, users })
}

export const usersPost = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role })

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync()
  user.password = bcryptjs.hashSync(password, salt)

  //Guardar en BD
  await user.save()

  res
    .status(201)
    .json(user)
}

export const usersPut = async (req = request, res = response) => {
  const { id } = req.params
  const { _id, password, google, ...rest } = req.body

  //TODO: VALIDAR CONTRA BASE DE DATOS
  if (password) {
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync()
    rest.password = bcryptjs.hashSync(password, salt)
  }

  const user = await User.findByIdAndUpdate(id, rest)

  res.json(user)
}

export const usersPatch = (req, res = response) => {
  res.json({
    msg: 'patch API - controlador'
  })
}

export const usersDelete = async (req, res = response) => {
  const { id } = req.params
  //const uid = req.uid
  //De esta manera se pierde toda la información de usuario
  //const user = await User.findByIdAndDelete(id)
  const user = await User.findByIdAndUpdate(id, { status: false })
  res.json({
    user
  })
}