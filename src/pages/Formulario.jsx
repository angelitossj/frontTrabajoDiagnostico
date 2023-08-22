
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Form.css';
import Swal from 'sweetalert2';

const Formulario = () => {
  const [user, setUser] = useState({ nombre: '', estado: '' });

  const handleInput = ({ target }) => {
    setUser({
      ...user,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      };

      const resp = await fetch('http://localhost:3000/tareas', options);

      if (!resp.ok) {
        throw new Error('Hubo un problema al enviar el formulario.');
      }

      const data = await resp.json();
      console.log(data);

      // Limpia los campos del formulario después de enviar
      setUser({ nombre: '', estado: '' });

      // Muestra un mensaje de éxito con SweetAlert
      Swal.fire('Éxito', 'La información se guardó correctamente', 'success');
    } catch (error) {
      console.error(error);

      // Muestra un mensaje de error con SweetAlert
      Swal.fire('Error', 'Ocurrió un error al enviar el formulario. Por favor, inténtelo nuevamente.', 'error');
    }
    window.location.reload();
  };

  return (
    <>
      <Form style={{}} className='formularcito py-2 my-3 mx-auto bg-success'>
        <Form.Group className="mb-2 mx-auto">
          <Form.Label style={{ fontSize: "22px" }}>Titulo de la Tarea</Form.Label>
          <Form.Control
            onChange={handleInput}
            type="text"
            name="nombre"
            value={user.nombre}
            placeholder="Titulo de la Tarea"
          />

        </Form.Group>

        {/* <Form.Group className="mb-3">
          <Form.Label>Estado</Form.Label>
          <Form.Control
            onChange={handleInput}
            type="text"
            name="estado"
            value={user.estado}
            placeholder="Estado de la tarea"
          />
        </Form.Group> */}

        <Button onClick={handleSubmit} variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </>
  );
};

export default Formulario;
