import { useState } from 'react'
import './FormularioEncuesta.css'

const categorias = [
  { valor: '', etiqueta: 'Selecciona una categoría' },
  { valor: 'soporte', etiqueta: 'Soporte técnico' },
  { valor: 'ventas', etiqueta: 'Ventas' },
  { valor: 'sugerencia', etiqueta: 'Sugerencia' },
  { valor: 'otro', etiqueta: 'Otro' },
]

const calificaciones = [
  { valor: 'excelente', etiqueta: 'Excelente' },
  { valor: 'bueno', etiqueta: 'Bueno' },
  { valor: 'regular', etiqueta: 'Regular' },
  { valor: 'malo', etiqueta: 'Malo' },
]

function FormularioEncuesta() {
  const [categoria, setCategoria] = useState('')
  const [calificacion, setCalificacion] = useState('')
  const [comentario, setComentario] = useState('')
  const [resumen, setResumen] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setResumen({ categoria, calificacion, comentario })
  }

  const handleReiniciar = () => {
    setCategoria('')
    setCalificacion('')
    setComentario('')
    setResumen(null)
  }

  const etiquetaCategoria = categorias.find((c) => c.valor === resumen?.categoria)?.etiqueta
  const etiquetaCalificacion = calificaciones.find((c) => c.valor === resumen?.calificacion)?.etiqueta

  return (
    <div className="encuesta-contenedor">
      <h1>Encuesta de Satisfacción</h1>
      <p className="subtitulo">
        Práctica: select, radio y textarea controlados con useState
      </p>

      <form onSubmit={handleSubmit}>
        <div className="campo">
          <label htmlFor="categoria">Categoría de tu consulta</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          >
            {categorias.map((c) => (
              <option key={c.valor} value={c.valor} disabled={c.valor === ''}>
                {c.etiqueta}
              </option>
            ))}
          </select>
        </div>

        <div className="campo">
          <span className="etiqueta-grupo">¿Cómo calificarías nuestro servicio?</span>
          <div className="grupo-radio">
            {calificaciones.map((c) => (
              <label key={c.valor} className="opcion-radio">
                <input
                  type="radio"
                  name="calificacion"
                  value={c.valor}
                  checked={calificacion === c.valor}
                  onChange={(e) => setCalificacion(e.target.value)}
                  required
                />
                {c.etiqueta}
              </label>
            ))}
          </div>
        </div>

        <div className="campo">
          <label htmlFor="comentario">Comentarios adicionales</label>
          <textarea
            id="comentario"
            rows={4}
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Cuéntanos más sobre tu experiencia..."
          />
        </div>

        <button type="submit">Enviar encuesta</button>
      </form>

      {resumen && (
        <div className="resumen">
          <h2>Resumen enviado</h2>
          <p>
            <strong>Categoría:</strong> {etiquetaCategoria}
          </p>
          <p>
            <strong>Calificación:</strong> {etiquetaCalificacion}
          </p>
          <p>
            <strong>Comentario:</strong> {resumen.comentario || '(sin comentarios)'}
          </p>
          <button type="button" onClick={handleReiniciar}>
            Enviar otra respuesta
          </button>
        </div>
      )}
    </div>
  )
}

export default FormularioEncuesta
