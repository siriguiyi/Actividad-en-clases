import { useState } from 'react'
import './FormularioRegistro.css'

const valoresIniciales = {
  nombre: '',
  email: '',
  edad: '',
  password: '',
  confirmarPassword: '',
}

function validarCampo(nombre, valor, valores) {
  switch (nombre) {
    case 'nombre':
      if (!valor.trim()) return 'El nombre es obligatorio.'
      if (valor.trim().length < 3) return 'Debe tener al menos 3 caracteres.'
      return ''
    case 'email':
      if (!valor.trim()) return 'El email es obligatorio.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) return 'El email no es válido.'
      return ''
    case 'edad':
      if (!valor) return 'La edad es obligatoria.'
      if (Number(valor) < 18) return 'Debes ser mayor de 18 años.'
      if (Number(valor) > 120) return 'Ingresa una edad válida.'
      return ''
    case 'password':
      if (!valor) return 'La contraseña es obligatoria.'
      if (valor.length < 6) return 'Debe tener al menos 6 caracteres.'
      return ''
    case 'confirmarPassword':
      if (!valor) return 'Confirma tu contraseña.'
      if (valor !== valores.password) return 'Las contraseñas no coinciden.'
      return ''
    default:
      return ''
  }
}

function validarTodo(valores) {
  const errores = {}
  Object.keys(valores).forEach((campo) => {
    errores[campo] = validarCampo(campo, valores[campo], valores)
  })
  return errores
}

function FormularioRegistro() {
  const [valores, setValores] = useState(valoresIniciales)
  const [errores, setErrores] = useState({})
  const [tocado, setTocado] = useState({})
  const [enviado, setEnviado] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    const nuevosValores = { ...valores, [name]: value }
    setValores(nuevosValores)

    const nuevosErrores = { ...errores, [name]: validarCampo(name, value, nuevosValores) }
    if (name === 'password' && tocado.confirmarPassword) {
      nuevosErrores.confirmarPassword = validarCampo(
        'confirmarPassword',
        nuevosValores.confirmarPassword,
        nuevosValores
      )
    }
    setErrores(nuevosErrores)
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTocado({ ...tocado, [name]: true })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const erroresFinales = validarTodo(valores)
    setErrores(erroresFinales)
    setTocado({
      nombre: true,
      email: true,
      edad: true,
      password: true,
      confirmarPassword: true,
    })

    const esValido = Object.values(erroresFinales).every((error) => error === '')
    if (esValido) {
      setEnviado(true)
    }
  }

  const handleReiniciar = () => {
    setValores(valoresIniciales)
    setErrores({})
    setTocado({})
    setEnviado(false)
  }

  if (enviado) {
    return (
      <div className="formulario-contenedor">
        <h1>¡Registro exitoso!</h1>
        <p>Bienvenido/a, {valores.nombre}. Tu correo {valores.email} quedó registrado.</p>
        <button type="button" onClick={handleReiniciar}>
          Registrar otra persona
        </button>
      </div>
    )
  }

  return (
    <div className="formulario-contenedor">
      <h1>Formulario de Registro</h1>
      <p className="subtitulo">Práctica: formulario controlado con validación inmediata (useState)</p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="campo">
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={valores.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            className={tocado.nombre && errores.nombre ? 'input-error' : ''}
          />
          {tocado.nombre && errores.nombre && <span className="mensaje-error">{errores.nombre}</span>}
        </div>

        <div className="campo">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            value={valores.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={tocado.email && errores.email ? 'input-error' : ''}
          />
          {tocado.email && errores.email && <span className="mensaje-error">{errores.email}</span>}
        </div>

        <div className="campo">
          <label htmlFor="edad">Edad</label>
          <input
            id="edad"
            name="edad"
            type="number"
            value={valores.edad}
            onChange={handleChange}
            onBlur={handleBlur}
            className={tocado.edad && errores.edad ? 'input-error' : ''}
          />
          {tocado.edad && errores.edad && <span className="mensaje-error">{errores.edad}</span>}
        </div>

        <div className="campo">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            value={valores.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={tocado.password && errores.password ? 'input-error' : ''}
          />
          {tocado.password && errores.password && <span className="mensaje-error">{errores.password}</span>}
        </div>

        <div className="campo">
          <label htmlFor="confirmarPassword">Confirmar contraseña</label>
          <input
            id="confirmarPassword"
            name="confirmarPassword"
            type="password"
            value={valores.confirmarPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={tocado.confirmarPassword && errores.confirmarPassword ? 'input-error' : ''}
          />
          {tocado.confirmarPassword && errores.confirmarPassword && (
            <span className="mensaje-error">{errores.confirmarPassword}</span>
          )}
        </div>

        <button type="submit">Registrarse</button>
      </form>
    </div>
  )
}

export default FormularioRegistro
