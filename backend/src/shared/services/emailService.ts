import nodemailer from 'nodemailer';

export class EmailService {

    private readonly transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
    }
    });

    async sendOrderConfirmation(
        to: string,
        orderId: number,
        items: any[],
        total: number,
        transactionId: string
    ) {

        const itemsHtml = items.map(item => `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>${item.price}</td>
                <td>${item.subtotal}</td>
            </tr>
        `).join('');

        const html = `
            <h2>Gracias por tu compra 🎉</h2>
            <p>Orden #${orderId}</p>
            <p>Transacción: ${transactionId}</p>
            
            <table border="1" cellpadding="5">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHtml}
                </tbody>
            </table>

            <h3>Total: ${total}</h3>
        `;

        await this.transporter.sendMail({
            from: '"UPB Company" <tu_correo@gmail.com>',
            to,
            subject: 'Confirmación de compra',
            html
        });
    }
}