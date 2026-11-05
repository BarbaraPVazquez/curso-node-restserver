import { response } from 'express'
import { User } from '../models/user.js'
import bcryptjs from 'bcryptjs'
import { generarJWT } from '../helpers/generarJWT.js'


export const login = async (req, res = response) => {

  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    //Verificar si el email existe
    if (!user) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - correo'
      })
    }
    //Verificar si el usuario esta activo en la BD
    if (!user.status) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - estado: false'
      })
    }
    //Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, user.password)
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - password'
      })
    }
    //Generar el JWT
    const token = await generarJWT(user.id)

    res.json({ user, token })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: 'Hable con el administrador'
    })
  }

}