import UI from './classes/UI.js';
import Notificacion from './classes/Notificacion.js';
import { citaObj, editando } from './variables.js';
import { inputFecha, hora, horasDisponibles, formulario, formularioInput, inputSintomas, inputPaciente, inputPropietario, inputEmail } from './selectores.js';

export const ui = new UI();
//Funciones
export function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}

export function llenarFecha() {

    // Obtener la fecha actual en formato YYYY-MM-DD
    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, '0');
    const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0
    const anio = hoy.getFullYear();

    const fechaHoy = `${anio}-${mes}-${dia}`;

    // Establecer el atributo min
    inputFecha.setAttribute('min', fechaHoy);
}

export function llenarHora() {
   hora.innerHTML = '';

    const opcionDefecto = document.createElement('option');
    opcionDefecto.value = '';
    opcionDefecto.text = '--Seleccione--';
    hora.appendChild(opcionDefecto);

    horasDisponibles.forEach(horaDisponible => {
        const option = document.createElement('OPTION');
        option.value = horaDisponible;
        option.textContent = horaDisponible;
        hora.appendChild(option);
        
    });   
}

export function enviarDatos(e) {
    
    e.preventDefault();
    
    citaObj.estado = 'disponible';
    

    if( Object.values(citaObj).some(valor => valor.trim() === '' || valor.value === '--Seleccione--') ) {
        const notificacion = new Notificacion({
            texto: 'Todos los campos son obligatorios',
            tipo: 'error'
        })
        notificacion.mostrar();
        return;
    }

    if(editando.value){
        ui.comprobar(citaObj);
        if( citaObj.estado === 'reservado' ) {
            const notificacion = new Notificacion({
                texto: 'La fecha y el horario seleccionado no estan disponibles',
                tipo: 'error'
               })
               notificacion.mostrar();
            return;   
        }
        ui.editar({...citaObj});
        const notificacion = new Notificacion({
            texto: 'La cita ha sido editada correctamente',
            tipo: 'exito'
           })
           notificacion.mostrar();
           
           ui.sincronizarLocalStorage();
    } else {
        ui.comprobar(citaObj);
        console.log(citaObj);

        if( citaObj.estado === 'reservado' ) {
            const notificacion = new Notificacion({
                texto: 'La fecha y el horario seleccionado no estan disponibles',
                tipo: 'error'
               })
               notificacion.mostrar();
            return;   
        }
        ui.agregar({...citaObj});

       const notificacion = new Notificacion({
        texto: 'Cita agendada correctamente',
        tipo: 'exito'
       })
       notificacion.mostrar();
    }

    

    formulario.reset();
    limpiarObjeto();
    llenarHora();
    formularioInput.value = 'Registrar paciente';
    editando.value = false;
    ui.sincronizarLocalStorage();
    
}

export function limpiarObjeto() {
    Object.assign(citaObj, {
        id: generarId(),
        paciente: '',
        propietario: '',
        email: '',
        fecha: '',
        horario: '',
        sintomas: ''
    });
}

export function  generarId() {
    return Math.random().toString(36).substring(2) + Date.now();
}

export function cargarEdicion(cita) {
    Object.assign(citaObj, cita)

    inputPaciente.value = cita.paciente;
    inputPropietario.value = cita.propietario;
    inputEmail.value = cita.email;
    inputFecha.value = cita.fecha;
    hora.value = cita.horario;
    inputSintomas.value = cita.sintomas;

    

    editando.value = true;
    formularioInput.value = 'Guardar Cambios';
}