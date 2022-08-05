import colors from 'colors';
import { guardarInfo, leerInfo } from './helpers/guardarArchivo.js';
import { 
  inquirerMenu, 
  pausa, 
  leerInput, 
  listadoTareasBorrar, 
  confirmar,
  mostrarListadoCheckList 
} from './helpers/inquirer.js';
import Tareas from './models/tareas.js';

const main = async () => {
  let opt = '';
  const tareas = new Tareas();

  const tareasInfo = leerInfo();

  if (tareasInfo) {
    //Establecer tareas
    tareas.cargarTareasFromArray(tareasInfo);
  }

  do {
    //Muestra el menú de opciones de la aplicación y retorna la opción elegida por el usuario
    opt = await inquirerMenu();

    switch (opt) {
      case '1':
        //Crear tarea
        const desc = await leerInput('Descripción:');
        tareas.crearTarea(desc);
        //Guardar tarea en el archivo
        
        break;
      case '2':                                                        
        //Listar tareas
        tareas.listadoCompleto();
        break;
      case '3':
        //Listar tareas completadas
        tareas.listadoTareasPendientesCompletadas(true);
        break;
      case '4':
        //Listar tareas pendientes
        tareas.listadoTareasPendientesCompletadas(false);
        break;
      case '5':
        //Completar tareas
        const ids = await mostrarListadoCheckList(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;
      case '6':
        //Borrar tarea
        const id = await listadoTareasBorrar(tareas.listadoArr);
        const confirmacion = await confirmar('¿Está seguro?');
        if(confirmacion){
          tareas.borrarTarea(id);
        }
        break;
    }

    guardarInfo(tareas.listadoArr);

    await pausa();
  } while (opt !== '0');
};

main();
