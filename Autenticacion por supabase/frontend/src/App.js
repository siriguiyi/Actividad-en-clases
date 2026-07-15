// Importamos hooks de React: `useState` para estado local y `useEffect` para efectos secundarios
import { useState, useEffect } from 'react';


function App() {

  // Estado que almacenará la lista de usuarios recibida desde el backend
  const [usuarios, setUsuarios] = useState([])

  // Estado para los campos del formulario. `formData` agrupa todos los inputs.
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    clave: '',
    telefono: '',
    edad: ''
  });

  // useEffect vacío se ejecuta una vez al montar el componente.
  // Aquí se hacía una llamada inicial para obtener usuarios, pero la función
  // se refactorizó a `cargarUsuarios` para reutilizarla también tras crear.
  useEffect(() => {
    fetch("http://127.0.0.1:5000/lusuarios")
      .then((response) => {
        return response.json()
      })
      .then((usuarios) => {
        setUsuarios(usuarios)
      })

  }, [])

  // Función para obtener los usuarios desde el backend y actualizar `usuarios`.
  // Se llama desde el efecto de carga inicial y después de crear un usuario.
  const cargarUsuarios = () => {
    fetch("http://127.0.0.1:5000/lusuarios")
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.error("Error cargando usuarios:", error));
  };

  // Carga inicial al montar el componente usando la función reutilizable
  useEffect(() => {
      cargarUsuarios();
    }, []);

  // Manejador para los cambios en los inputs del formulario.
  // Actualiza el campo correspondiente en `formData` según `name` del input.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Manejador para enviar el formulario.
  // Evita el refresco por defecto, envía los datos al endpoint POST y
  // en caso de éxito recarga la lista de usuarios y limpia el formulario.
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue

    fetch("http://127.0.0.1:5000/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status === 201) {
          alert("Usuario creado exitosamente");
          cargarUsuarios(); // Recarga la tabla para ver el nuevo usuario
          // Limpia el formulario
          setFormData({ nombre: '', apellido: '', correo: '', clave: '', telefono: '', edad: '' });
        } else {
          alert("error al crear usuario");
        }
      })
      .catch((error) => console.error("Error creando usuario:", error));
  };




  return (
    <div style={{ padding: '20px' }}>
      <h2>Crear Nuevo Usuario</h2>
      
      {/* --- FORMULARIO ---
          El formulario controla sus inputs mediante `value` y `onChange`.
          Al enviar se ejecuta `handleSubmit` que manda los datos al backend.
      */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
        
        <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
        <input type="text" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} required />
        <input type="email" name="correo" placeholder="Correo" value={formData.correo} onChange={handleChange} required />
        <input type="password" name="clave" placeholder="Contraseña" value={formData.clave} onChange={handleChange} required />
        <input type="text" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} />
        <input type="number" name="edad" placeholder="Edad" value={formData.edad} onChange={handleChange} />
        
        <button type="submit" style={{ padding: '8px', cursor: 'pointer' }}>Guardar Usuario</button>
      </form>

      {/* --- TABLA ---
          Muestra la lista `usuarios`. Cada fila corresponde a un usuario.
          `usuarios` se actualiza tras la carga inicial y después de crear.
      */}
      <h2>Lista de Usuarios</h2>
      <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Edad</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nombre}</td>
              <td>{user.apellido}</td>
              <td>{user.correo}</td>
              <td>{user.telefono}</td>
              <td>{user.edad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



export default App
