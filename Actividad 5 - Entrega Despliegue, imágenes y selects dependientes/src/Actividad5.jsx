import { useState } from 'react'
import logoSrc from './assets/colombia.jpeg'
import './Actividad5.css'

const paises = {
  ecuador: { nombre: 'Ecuador', ciudades: ['Quito', 'Guayaquil', 'Cuenca', 'Ambato'] },
  colombia: { nombre: 'Colombia', ciudades: ['Bogotá', 'Medellín', 'Cali', 'Cartagena'] },
  peru: { nombre: 'Perú', ciudades: ['Lima', 'Arequipa', 'Cusco', 'Trujillo'] },
  mexico: { nombre: 'México', ciudades: ['CDMX', 'Guadalajara', 'Monterrey', 'Puebla'] },
}

function Actividad5() {
  const [pais, setPais] = useState('')
  const [ciudad, setCiudad] = useState('')

  const ciudadesDisponibles = pais ? paises[pais].ciudades : []

  const handlePaisChange = (e) => {
    setPais(e.target.value)
    setCiudad('')
  }

  return (
    <div className="actividad5-contenedor">
      <h1>Actividad 5: Imágenes y Selects Dependientes</h1>
      <p className="subtitulo">
        Práctic temas 18, 19 y 20
      </p>

      <section className="seccion">
        <h2>Imágenes desde la carpeta public</h2>
        <p>
          Se referencia con una ruta absoluta (<code>/images/mapa-public.svg</code>), sin
          importarla en el código. Vite la copia tal cual al build final.
        </p>
        <img
          src="public/images/mapa-public.webp"
          alt="Imagen cargada desde la carpeta public"
          className="imagen-demo"
        />
      </section>

      <section className="seccion">
        <h2>Imágenes desde la carpeta src</h2>
        <p>
          Se importa como módulo (<code>import logoSrc from './assets/coombia.jpeg'</code>).
          Vite la procesa y la incluye optimizada/con hash en el build.
        </p>
        <img src={logoSrc} alt="Imagen cargada desde la carpeta src/assets" className="imagen-demo" />
      </section>

      <section className="seccion">
        <h2>Select dependiente de otro select</h2>
        <p>Elige un país; las ciudades disponibles cambian según tu elección.</p>

        <div className="campo">
          <label htmlFor="pais">País</label>
          <select id="pais" value={pais} onChange={handlePaisChange}>
            <option value="">Selecciona un país</option>
            {Object.entries(paises).map(([clave, { nombre }]) => (
              <option key={clave} value={clave}>
                {nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label htmlFor="ciudad">Ciudad</label>
          <select
            id="ciudad"
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
            disabled={!pais}
          >
            <option value="">
              {pais ? 'Selecciona una ciudad' : 'Primero elige un país'}
            </option>
            {ciudadesDisponibles.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {pais && ciudad && (
          <p className="resultado">
            Elegiste <strong>{ciudad}</strong>, {paises[pais].nombre}.
          </p>
        )}
      </section>
    </div>
  )
}

export default Actividad5
