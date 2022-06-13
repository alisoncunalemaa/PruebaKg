import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import {
    Table,
    Button,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
  } from "reactstrap";
const cookies = new Cookies();
const data = [
    { id: 1, cedula: "23456789", nombre: "Alison" ,apellido:"cunalema",correo:"cunalema1@gmail.com",direccion:"dkkd",fechanac:"23-04-1997",telefono:"0981744633"},
    { id: 2, cedula: "23456789", nombre: "Fernando",apellido:"cunalema",correo:"cunalema2@gmail.com",direccion:"dkkd",fechanac:"23-04-1997",telefono:"0981744633" },
    { id: 3, cedula: "23456789", nombre: "Milena" ,apellido:"cunalema",correo:"cunalema3@gmail.com",direccion:"dkkd",fechanac:"23-04-1997",telefono:"0981744633"},
    { id: 4, cedula: "23456789", nombre: "Fiorella",apellido:"cunalema",correo:"cunalema4@gmail.com",direccion:"dkkd",fechanac:"23-04-1997",telefono:"0981744633" },
    { id: 5, cedula: "23456789", nombre: "Naydeline",apellido:"cunalema",correo:"cunalema5@gmail.com",direccion:"dkkd",fechanac:"23-04-1997",telefono:"0981744633"},
    { id: 6, cedula: "23456789", nombre: "Melba",apellido:"cunalema",correo:"cunalema6@gmail.com",direccion:"dkkd",fechanac:"23-04-1997",telefono:"0981744633" },
];
class Menu extends Component {
    state = {
        data: data,
        modalActualizar: false,
        modalInsertar: false,
        form: {
          id: "",
          nombre: "",
          apellido: "",
        },
      };
    
      mostrarModalActualizar = (dato) => {
        this.setState({
          form: dato,
          modalActualizar: true,
        });
      };
    
      cerrarModalActualizar = () => {
        this.setState({ modalActualizar: false });
      };
    
      mostrarModalInsertar = () => {
        this.setState({
          modalInsertar: true,
        });
      };
    
      cerrarModalInsertar = () => {
        this.setState({ modalInsertar: false });
      };
    
      editar = (dato) => {
        var contador = 0;
        var arreglo = this.state.data;
        arreglo.map((registro) => {
          if (dato.id == registro.id) {
            arreglo[contador].cedula = dato.cedula;
            arreglo[contador].nombre = dato.nombre;
            arreglo[contador].apellido = dato.apellido;
            arreglo[contador].correo = dato.correo;
            if(dato.fechanac!=null){
                arreglo[contador].fechanac = dato.fechanac;
                arreglo[contador].telefono = dato.telefono;
                arreglo[contador].direccion = dato.direccion;
            }
          }

          contador++;
        });
        this.setState({ data: arreglo, modalActualizar: false });
      };
    
      eliminar = (dato) => {
        var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id);
        if (opcion == true) {
          var contador = 0;
          var arreglo = this.state.data;
          arreglo.map((registro) => {
            if (dato.id == registro.id) {
              arreglo.splice(contador, 1);
            }
            contador++;
          });
          this.setState({ data: arreglo, modalActualizar: false });
        }
      };
    
      insertar= ()=>{
        var valorNuevo= {...this.state.form};
        valorNuevo.id=this.state.data.length+1;
        var lista= this.state.data;
        lista.push(valorNuevo);
        this.setState({ modalInsertar: false, data: lista });
      }
    
      handleChange = (e) => {
        this.setState({
          form: {
            ...this.state.form,
            [e.target.name]: e.target.value,
          },
        });
      };
    cerrarSesion=()=>{
        cookies.remove('id', {path: "/"});
        cookies.remove('apellido', {path: "/"});
        //cookies.remove('apellido_materno', {path: "/"});
        cookies.remove('nombre', {path: "/"});
        cookies.remove('user', {path: "/"});
        window.location.href='./';
    }

    componentDidMount() {
        if(!cookies.get('user')){
            window.location.href="./";
        }
    }

    render() {
        console.log('id: '+ cookies.get('id'));
        console.log('apellido: '+cookies.get('apellido'));
        //console.log('apellido_materno: '+cookies.get('apellido_materno'));
        console.log('nombre: '+cookies.get('nombre'));
        console.log('user: '+cookies.get('user'));
        console.log('ROLL : '+cookies.get('rol'));
        if(cookies.get('rol')=="admin"){
            return (
                <>
                <Container >
                    <br />
                    <button color="danger"  onClick={()=>this.cerrarSesion()}>Cerrar Sesión</button>
    
                    <br /><br />
                    <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Insertar Empleado</Button>
                    <br />
                    <br />
                    <Table>
                        <thead>
                        <tr>
                        <th>Numero Empleado</th>
                            <th>Cedula</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Correo</th>
                            <th>Accion</th>
                        </tr>
                        </thead>
    
                        <tbody>
                        {this.state.data.map((dato) => (
                            <tr key={dato.id}>
                            <td>{dato.id}</td>
                            <td>{dato.cedula}</td>
                            <td>{dato.nombre}</td>
                            <td>{dato.apellido}</td>
                            <td>{dato.correo}</td>
                            <td>
                                <Button
                                color="primary"
                                onClick={() => this.mostrarModalActualizar(dato)}
                                >
                                Editar
                                </Button>{" "}
                                <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Container>
    
            <Modal isOpen={this.state.modalActualizar}>
              <ModalHeader>
               <div><h3>Editar Registro</h3></div>
              </ModalHeader>
    
              <ModalBody>
                <FormGroup>
                  <label>
                   Id:
                  </label>
                
                  <input
                    className="form-control"
                    readOnly
                    type="text"
                    value={this.state.form.id}
                  />
                </FormGroup>
                <FormGroup>
                  <label>
                    Cedula: 
                  </label>
                  <input
                  required
                    className="form-control"
                    name="cedula"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.cedula}
                  />
                </FormGroup>
                <FormGroup>
                  <label>
                    Nombre: 
                  </label>
                  <input
                    className="form-control"
                    required
                    name="nombre"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.nombre}
                  />
                </FormGroup>
                
                <FormGroup>
                  <label>
                    Apellido: 
                  </label>
                  <input
                    className="form-control"
                    name="apellido"
                    required
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.apellido}
                  />
                </FormGroup>
                <FormGroup>
                  <label>
                    Correo: 
                  </label>
                  <input
                    className="form-control"
                    name="correo"
                    type="text"
                    required
                    onChange={this.handleChange}
                    value={this.state.form.correo}
                  />
                </FormGroup>
              </ModalBody>
    
              <ModalFooter>
                <Button
                  color="primary"
                  onClick={() => this.editar(this.state.form)}
                >
                  Editar
                </Button>
                <Button
                  color="danger"
                  onClick={() => this.cerrarModalActualizar()}
                >
                  Cancelar
                </Button>
              </ModalFooter>
            </Modal>
            <Modal isOpen={this.state.modalInsertar}>
              <ModalHeader>
               <div><h3>Insertar Empleado</h3></div>
              </ModalHeader>
    
              <ModalBody>
                <FormGroup>
                  <label>
                    Id: 
                  </label>
                  
                  <input
                    className="form-control"
                    readOnly
                    type="text"
                    value={this.state.data.length+1}
                  />
                </FormGroup>
                <FormGroup>
                  <label>
                    Cedula: 
                  </label>
                  <input
                    className="form-control"
                    name="cedula"
                    type="text"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <label>
                    Nombre: 
                  </label>
                  <input
                    className="form-control"
                    name="nombre"
                    type="text"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                
                <FormGroup>
                  <label>
                    Apellido: 
                  </label>
                  <input
                    className="form-control"
                    name="apellido"
                    type="text"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <label>
                    Correo: 
                  </label>
                  <input
                    className="form-control"
                    name="correo"
                    type="text"
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </ModalBody>
    
              <ModalFooter>
                <Button
                  color="primary"
                  onClick={() => this.insertar()}
                >
                  Insertar
                </Button>
                <Button
                  className="btn btn-danger"
                  onClick={() => this.cerrarModalInsertar()}
                >
                  Cancelar
                </Button>
              </ModalFooter>
            </Modal>       
          </> 
            );
        }else{
            return (
                <>
                <Container >
                    <br />
                    <button color="danger"  onClick={()=>this.cerrarSesion()}>Cerrar Sesión</button>
    
                    <br /><br />
                    <br />
                    <br />
                    <Table>
                        <thead>
                        <tr>
                        <th>Numero Empleado</th>
                            <th>Cedula</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Correo</th>
                            <th>Direccion</th>
                            <th>Fecha Nacimiento</th>
                            <th>Telefono</th>
                            <th>Accion</th>
                        </tr>
                        </thead>
    
                        <tbody>
                        {this.state.data.map((dato) => (
                            <tr key={dato.id}>
                            <td>{dato.id}</td>
                            <td>{dato.cedula}</td>
                            <td>{dato.nombre}</td>
                            <td>{dato.apellido}</td>
                            <td>{dato.correo}</td>

                            <td>{dato.direccion}</td>
                            <td>{dato.fechanac}</td>
                            <td>{dato.telefono}</td>
                            <td>
                                <Button
                                color="primary"
                                onClick={() => this.mostrarModalActualizar(dato)}
                                >
                                Actualizar Datos
                                </Button>{" "}
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Container>
    
            <Modal isOpen={this.state.modalActualizar}>
              <ModalHeader>
               <div><h3>Editar Registro</h3></div>
              </ModalHeader>
    
              <ModalBody>
                <FormGroup>
                  <label>
                   Id:
                  </label>
                
                  <input
                    className="form-control"
                    readOnly
                    type="text"
                    value={this.state.form.id}
                  />
                </FormGroup>
                <FormGroup>
                  <label>
                    Cedula: 
                  </label>
                  <input
                    className="form-control"
                    name="cedula"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.cedula}
                  />
                </FormGroup>
                <FormGroup>
                  <label>
                    Nombre: 
                  </label>
                  <input
                    className="form-control"
                    name="nombre"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.nombre}
                  />
                </FormGroup>
                
                <FormGroup>
                  <label>
                    Apellido: 
                  </label>
                  <input
                    className="form-control"
                    name="apellido"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.apellido}
                  />
                </FormGroup>
                <FormGroup>
                  <label>
                    Correo: 
                  </label>
                  <input
                    className="form-control"
                    name="correo"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.correo}
                  />
                </FormGroup>
                <FormGroup>
                  <label>
                    Fecha Nacimiento: 
                  </label>
                  <input
                    className="form-control"
                    name="fechanac"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.fechanac}
                  />
                </FormGroup>
                <FormGroup>
                  <label>
                    Direccion: 
                  </label>
                  <input
                    className="form-control"
                    name="direccion"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.direccion}
                  />
                </FormGroup>
                <FormGroup>
                  <label>
                    Telefono: 
                  </label>
                  <input
                    className="form-control"
                    name="telefono"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.telefono}
                  />
                </FormGroup>
              </ModalBody>
    
              <ModalFooter>
                <Button
                  color="primary"
                  onClick={() => this.editar(this.state.form)}
                >
                  Editar
                </Button>
                <Button
                  color="danger"
                  onClick={() => this.cerrarModalActualizar()}
                >
                  Cancelar
                </Button>
              </ModalFooter>
            </Modal>
               
          </> 
            );
        }
        
    }
}

export default Menu;