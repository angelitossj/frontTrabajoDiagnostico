import { MdFavorite } from 'react-icons/md';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Formulario from './Formulario';
import Swal from 'sweetalert2';

const LadingPage = () => {
  const [tareas, setTareas] = useState([]);

  const consultarApi = async () => {
    try {
      const consultar = await fetch("http://localhost:3000/tareas");
      const respuesta = await consultar.json();
      const tareitas = respuesta.tareas.map((tareita) => ({
        id: tareita._id,
        nombre: tareita.nombre,
        estado: tareita.estado,
      }));
      setTareas(tareitas);
      console.log(tareitas)
    } catch (error) {
      console.error('Error al consultar la API', error);
    }
  };

  useEffect(() => {
    consultarApi();
  }, []);

  const handleEstadoChange = async (taskId) => {
    const updatedTareas = tareas.map((tarea) => {
      if (tarea.id === taskId) {
        return { ...tarea, estado: tarea.estado === 'Pendiente' ? 'Completada' : 'Pendiente' };
      }
      return tarea;
    });

    setTareas(updatedTareas);

    try {
      const updatedEstado = updatedTareas.find(tarea => tarea.id === taskId).estado;

      const response = await fetch(`http://localhost:3000/tareas/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: updatedEstado }),
      });

      if (!response.ok) {
        console.error('Error al actualizar el estado en el servidor');
      }

    } catch (error) {
      console.error('Error al realizar la solicitud de actualización', error);
    }
  };
  const 
  
  
  eliminar = async (taskId) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo'
      });
  
      if (result.isConfirmed) {
        const response = await fetch(`http://localhost:3000/tareas/${taskId}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          const updatedTareas = tareas.filter((tarea) => tarea.id !== taskId);
          setTareas(updatedTareas);
  
          Swal.fire(
            '¡Eliminado!',
            'Tu tarea se ha eliminado exitosamente.',
            'success'
          );
        } else {
          Swal.fire(
            '¡Error!',
            'Ha ocurrido un error al eliminar la tarea.',
            'error'
          );
        }
      }
    } catch (error) {
      console.error('Error al eliminar la tarea', error);
    }
  };
  

  return (
    <>
      <Formulario />
      <div style={{fontSize:"22px",color:"turquoise"}}>Vista de Tareas</div>
      <div className="d-flex flex-wrap">
        {tareas.map((datos) => (
          <Card className='mx-auto bg-dark my-2 p-3' key={datos.id} style={{ width: '18rem' }}>
            <Card.Header>
              <Card.Title style={{ color: "white", fontFamily: "sans-serif", fontSize: "22px" }}>{datos.nombre}</Card.Title>
            </Card.Header>
            <Card.Body className={datos.estado==="Pendiente"?'bg-warning align-items-center':'bg-success align-items-center'}>
              <MdFavorite />
              <Card.Text>{datos.estado}</Card.Text>
              <Form.Check
                type="switch"
                id={`switch-${datos.id}`}
                label="Cambiar estado"
                checked={datos.estado === 'Completada'}
                onChange={() => handleEstadoChange(datos.id)}
              />
              <button className='btn btn-dark text-primary' onClick={()=>{eliminar(datos.id)}}>
              ELIMINAR
              </button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
};

// debounce
// drag and drop (fazt code)
export default LadingPage;
