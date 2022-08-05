import Tarea from './tarea.js';

class Tareas {
  _listado = {};

  /**
   * Listar las tareas creadas usando Object.keys - Object.values
   */
  get listadoArr() {
    const listado = [...Object.values(this._listado)];
    // const listado = [];
    // Object.keys(this._listado).forEach(key => {
    //     listado.push(this._listado[key]);
    // })

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id) {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  /**
   * cargar las tareas guardadas en el archivo
   */
  cargarTareasFromArray(tareas = []) {
    //const tareasArr = Object.values(tareas);

    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  /**
   * Crear una tarea
   */
  crearTarea(desc = '') {
    const tarea = new Tarea(desc);

    this._listado[tarea.id] = tarea;
  }

  /**
   * Listar todas las tareas creadas/guardadas
   */
  listadoCompleto() {
    console.log();
    this.listadoArr.forEach((tarea, i) => {
      const indice = `${i + 1}.`.brightMagenta;
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? 'Completada'.brightGreen : 'Pendiente'.brightRed;

      console.log(`${indice} ${desc} :: ${estado}`);
    });
  }

  /**
   * Listados de tareas completadas - tareas pendientes
   */
  listadoTareasPendientesCompletadas(completadas) {
    console.log();
    let indice = 0;
    this.listadoArr.forEach((tarea) => {
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? 'Completada'.brightGreen : 'Pendiente'.brightRed;

      if (completadas) {
        //Mostrar tareas completadas
        if (completadoEn) {
          indice += 1;
          console.log(`${(indice + '.').brightMagenta} ${desc} :: ${completadoEn.brightGreen}`);
        }
      } else {
        //Mostrar tareas pendientes
        if (!completadoEn) {
          indice += 1;
          console.log(`${(indice + '.').brightMagenta} ${desc} :: ${estado}`);
        }
      }
    });
  }

  /**
   *Seleccionar tarea completada (checkbox) | tareas pendientes (checkbox)
   */
  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach(tarea => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

export default Tareas;
