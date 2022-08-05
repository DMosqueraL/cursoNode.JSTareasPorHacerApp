import fs from 'fs';

const archivo = './persistencia/data.json';

export const guardarInfo = (data) => {
  fs.writeFileSync(archivo, JSON.stringify(data));
};

export const leerInfo = () => {
  if (!fs.existsSync(archivo)) {
    return null;
  }

  const info = fs.readFileSync(archivo, { encoding: 'utf-8' });
  const data = JSON.parse(info);

  return data;
};


