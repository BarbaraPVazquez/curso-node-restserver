import { Router } from 'express'
import { check } from 'express-validator';

import { login } from '../controllers/auth.controller.js';
import { validarCampos } from '../middlewares/validar_campos.js';

export const authRouter = Router()

authRouter.post('/login', [
  check('email', 'El correo es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  validarCampos
], login)