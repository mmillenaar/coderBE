import { createTransport } from 'nodemailer';
import dotenv from 'dotenv'
import logger from '../config/logger.config.js';
dotenv.config()

const sendMail = async (mailOptions) => {
    const transporter = createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_PASS,
        }
    });

    try {
        await transporter.sendMail(mailOptions)
    } catch (err) {
        logger.error(err)
    }
}

export const sendMailOnRegister = async (registeredUser) => {
    const mailOptions = {
        from: `Nodemailer - ${process.env.ADMIN_EMAIL}`,
        to: process.env.ADMIN_EMAIL,
        subject: 'New user registered',
        html:
        `
            <h1> A new user just got registered! </h1> <br/>
            <p>Name: ${registeredUser.name}</p>
            <p>Address: ${registeredUser.address}</p>
            <p>Age: ${registeredUser.age}</p>
            <p>Phone: ${registeredUser.countryCode} ${registeredUser.phone}</p>
            <p>Email: ${registeredUser.email}</p>
        `,
    }

    return await sendMail(mailOptions)
}
export const sendMailOnFinishOrder = async (orderUser) => {
    let mailString = `
        <h1>Order ${orderUser.cart._id}:</h1>
        <br/>
        <h2>Buyer: ${orderUser.name}</h2>
        <p>Address: ${orderUser.address}</p>
        <p>Age: ${orderUser.age}</p>
        <p>Phone: ${orderUser.countryCode} ${orderUser.phone}</p>
        <p>Email: ${orderUser.email}</p>
        <br/>
    `
    let products = orderUser.cart.products
    for (let i = 0; i < products.length; i++) {
        let productInfoString =  `
            <h4>Product id: ${products[i]._id}</h4>
            <p>Title: ${products[i].title}</p>
            <p>Description: ${products[i].description}</p>
            <p>Code: ${products[i].code}</p>
            <p>Price: ${products[i].price}</p>
            <p>Quantity: ${products[i].quantity}</p>
        `
        mailString = mailString.concat('', productInfoString)
    }

    const mailOptions = {
        from: `Nodemailer - ${process.env.ADMIN_EMAIL}`,
        to: process.env.ADMIN_EMAIL,
        subject: `New order(${orderUser.cart._id}) from ${orderUser.name} - ${orderUser.email}`,
        html: mailString,
    }

    return await sendMail(mailOptions)
}