import { Role } from '../models/roles.js';
import { User } from '../models/user.js';

export const esRoleValido = async (role = "") => {
  const existeRole = await Role.findOne({ role })
  if (!existeRole) {
    throw new Error(`El rol ${role} no esta registrado ne la base de datos`)
  }
}

export const emailExiste = async (email = "") => {
  //Verificar si el correo existe
  const existeEmail = await User.findOne({ email })
  if (existeEmail) {
    throw new Error(`El correo ${email} ya esta registrado, coloque uno nuevo o reingrese`)
  }
}

export const existeUsuarioPorId = async (id) => {
  //Verificar si el usuario existe
  const existeUsuario = await User.findById(id)
  if (!existeUsuario) {
    throw new Error(`El id no existe ${id}`)
  }
}