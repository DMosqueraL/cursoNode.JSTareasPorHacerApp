import colors from 'colors';

import inquirer from 'inquirer';

const menuOpts = [
  {
    type: 'list',
    name: 'option',
    message: '¿Qué desea hacer?',
    choices: [
      {
        value: '1',
        name: `${'1.'.cyan} Crear tarea`,
      },
      {
        value: '2',
        name: `${'2.'.cyan} Listar tarea`,
      },
      {
        value: '3',
        name: `${'3.'.cyan} Listar tareas completadas`,
      },
      {
        value: '4',
        name: `${'4.'.cyan} Listar tareas pendientes`,
      },
      {
        value: '5',
        name: `${'5.'.cyan} Completar tarea(s)`,
      },
      {
        value: '6',
        name: `${'6.'.cyan} Borrar tarea`,
      },
      {
        value: '0',
        name: `${'0.'.cyan} Salir`,
      },
    ],
  },
];

const entrada = [
  {
    type: 'input',
    name: 'pausa',
    message: `Presione ${'ENTER'.brightMagenta} para continuar`,
  },
];

const inquirerMenu = async () => {
  console.clear();

  console.log('=============================='.cyan);
  console.log('    Seleccione una opción'.white);
  console.log('==============================\n'.cyan);

  const { option } = await inquirer.prompt(menuOpts);

  return option;
};

const pausa = async () => {
  console.log('\n');
  await inquirer.prompt(entrada);
};

const leerInput = async () => {
  const question = [
    {
      type: 'input',
      name: 'Descripción',
      message: '',
      validate(value) {
        if (value.length === 0) {
          return 'Por favor ingrese un valor';
        }
        return true;
      },
    },
  ];

  const { Descripción } = await inquirer.prompt(question);
  return Descripción;
};

const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const indice = `${i + 1}.`.brightMagenta;

    return {
      value: tarea.id,
      name: `${indice} ${tarea.desc}`,
    };
  });

  choices.unshift({
    value: '0',
    name: '0.'.brightMagenta + 'Cancelar'
  })

  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices,
    },
  ];

  const { id } = await inquirer.prompt(preguntas);
  return id;
};

const confirmar = async(message) => {

  const opcion = [
    {
      type: 'confirm',
      name: 'confirmacion',
      message,
    }
  ];

  const { confirmacion } = await inquirer.prompt(opcion);
  return confirmacion;
}

const mostrarListadoCheckList = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const indice = `${i + 1}.`.brightMagenta;

    return {
      value: tarea.id,
      name: `${indice} ${tarea.desc}`,
      checked: (tarea.completadoEn) ? true : false
    };
  });

  const pregunta = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Seleccione',
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(pregunta);
  return ids;
};

export { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList };
