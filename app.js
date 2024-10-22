import {llenarFecha, llenarHora, datosCita, enviarDatos} from './funciones.js';
import {ui} from './funciones.js';
import { inputPaciente, inputPropietario, inputEmail, inputFecha, hora, inputSintomas, formulario } from './selectores.js';

//Eventos 
document.addEventListener('DOMContentLoaded', () => {
    eventListeners();
    llenarFecha();
    llenarHora();
    ui.mostrarCitas();
});


function eventListeners() {
    inputPaciente.addEventListener('change', datosCita);
    inputPropietario.addEventListener('change', datosCita);
    inputEmail.addEventListener('change', datosCita);
    inputFecha.addEventListener('change', datosCita);
    hora.addEventListener('change', datosCita);
    inputSintomas.addEventListener('change', datosCita);
    formulario.addEventListener('submit', enviarDatos);
}











