# Semana 10 - Formulario con Select, Radio y Textarea (React)

Proyecto de práctica basado en el tutorial de [tutorialesprogramacionya.com](https://tutorialesprogramacionya.com/reactya/index.php?inicio=0) (temas 14, 15 y 16: `select`, grupo de `radio` y `textarea` en React).

## Qué demuestra

- **`<select>` controlado**: la categoría elegida se guarda en `categoria` (`useState`) y el `value` del select refleja ese estado.
- **Grupo de `<input type="radio">` controlado**: la calificación se guarda en `calificacion` (`useState`); cada radio usa `checked={calificacion === valor}` y comparten el mismo `name` para formar el grupo.
- **`<textarea>` controlado**: el comentario se guarda en `comentario` (`useState`) y se actualiza en cada `onChange`.
- Al enviar el formulario se muestra un resumen con los valores seleccionados, confirmando que los tres controles están correctamente enlazados a su estado.

## Estructura relevante

- `src/FormularioEncuesta.jsx` — componente principal con el formulario y los tres `useState`.
- `src/FormularioEncuesta.css` — estilos del formulario.
- `src/App.jsx` — monta el componente del formulario.

## Cómo ejecutar

```bash
npm install
npm run dev
```

Luego abre la URL que indique la terminal (por defecto `http://localhost:5173`).
