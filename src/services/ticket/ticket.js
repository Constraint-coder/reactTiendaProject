import qz from 'qz-tray'
import { conectarQZ, obtenerImpresora } from './conectar'

export const imprimirTicket = async (venta) => {

  try {

    await conectarQZ();

    const printer = await obtenerImpresora();

    const config = qz.configs.create(printer, {
      copies: 1
    });

    const total = venta.detalles.reduce(
      (acc, item) => acc + parseFloat(item.subtotal),
      0
    );

    const ticket = [];

    ticket.push('\x1B\x40'); // inicializar impresora

    ticket.push('\x1B\x61\x01');
    ticket.push('MI NEGOCIO\n');

    ticket.push('\x1B\x61\x00');

    ticket.push('------------------------------\n');

    ticket.push(`Fecha: ${new Date().toLocaleString()}\n`);

    ticket.push('------------------------------\n');

    venta.detalles.forEach(item => {

      ticket.push(`${item.nombreProducto}\n`);

      ticket.push(
        `${item.cantidad} x $${item.precioUnitario}`
          .padEnd(20) +
        `$${item.subtotal}\n`
      );

      ticket.push('\n');

    });

    ticket.push('------------------------------\n');

    ticket.push(
      `TOTAL: $${total.toFixed(2)}\n`
    );

    ticket.push('------------------------------\n');

    ticket.push('\n');

    ticket.push('\x1B\x61\x01');
    ticket.push('Gracias por su compra\n');

    ticket.push('\n\n\n');

    ticket.push('\x1D\x56\x00'); // cortar papel

    await qz.print(config, ticket);

    console.log('Ticket impreso');

  } catch (error) {

    console.error('Error imprimiendo:', error);

  }

};