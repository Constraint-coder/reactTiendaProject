import qz from 'qz-tray'

let conectado = false;

export const conectarQZ = async () => {

  try {

    if (!qz.websocket.isActive()) {

      await qz.websocket.connect();

      conectado = true;

      console.log('QZ conectado');
    }

  } catch (error) {

    console.error('Error conectando QZ:', error);

  }

};

export const desconectarQZ = async () => {

  if (qz.websocket.isActive()) {
    await qz.websocket.disconnect();
  }

};

export const obtenerImpresora = async () => {

  try {

    const printer = await qz.printers.find();

    console.log('Impresora encontrada:', printer);

    return printer;

  } catch (error) {

    console.error(error);

  }

};