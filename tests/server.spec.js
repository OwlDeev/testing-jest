const request = require('supertest')
const app = require('../index')

describe('Operaciones CRUD de cafes', () => {
  it('Validar que GET de cafes retorne un 200 como statusCode', async () => {
    const resultado = await request(app).get('/cafes').send()
    expect(resultado.statusCode).toBe(200)
  })

  it('Se obtiene un código 404 al intentar eliminar un café con un id que no existe', async () => {
    const resultado = await request(app).delete('/cafes/5').send().auth(true)
    expect(resultado.statusCode).toBe(404)
  })

  it('Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201', async () => {
    const newCafe = {
      id: 5,
      nombre: 'Latte',
    }
    const resultado = await request(app).post('/cafes').send(newCafe)
    expect(resultado.statusCode).toBe(201)
  })

  it(' Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload', async () => {
    const newCafe = {
        id: 5
      }

    const resultado = await request(app).put('/cafes/4').send(newCafe)
    expect(resultado.statusCode).toBe(400)
  })
})
