import {generarId} from './funciones.js';

let editando = {
    value: false
}


const citaObj = {
    id: generarId(),
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    horario: '',
    sintomas: '',
    estado: ''
}

export {
    editando,
    citaObj
}