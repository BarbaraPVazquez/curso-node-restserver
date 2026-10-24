import { response, request } from "express";

export const usersGet = (req = request, res = response) => {
  const { q, nombre = "No name", apikey, page = 1, limit } = req.query
  res.json({
    msg: 'get API - controller',
    q,
    nombre,
    apikey,
    page,
    limit
  })
}

export const usersPost = (req = request, res = response) => {
  const { nombre, edad } = req.body;
  res
    .status(201)
    .json({
      msg: 'post API - controller',
      nombre,
      edad
    })
}

export const usersPut = (req = request, res = response) => {
  const id = req.params.id
  res.json({
    msg: 'put API - controlador',
    id
  })
}

export const usersPatch = (req, res = response) => {
  res.json({
    msg: 'patch API - controlador'
  })
}

export const usersDelete = (req, res = response) => {
  res.json({
    msg: 'delete API - controller'
  })
}