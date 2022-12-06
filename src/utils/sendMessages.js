import twilio from 'twilio'
import dotenv from 'dotenv'
import logger from '../config/logger.config.js'
dotenv.config()

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)
const twilioSMSNumber = process.env.TWILIO_SMS_NUMBER
const twilioWPNumber = process.env.TWILIO_WP_NUMBER
const adminPhoneNumber = process.env.ADMIN_PHONE_NUMBER

const sendSMS = async (options) => {
    try {
        const message = await client.messages.create(options)
    }
    catch (err) {
        logger.error(err)
    }
}

export const sendSMSOnFinishOrder = async (userPhoneNumber) => {
    const options = {
        body: 'We have received your order and it is being processed. Thank you!',
        from: twilioSMSNumber,
        to: userPhoneNumber
    }
    return await sendSMS(options)
}
export const sendWPOnFinishOrder = async (orderUser) => {
    const options = {
        body: `New order(${orderUser.cart._id}) from ${orderUser.name} - ${orderUser.email}`,
        from: `whatsapp:${twilioWPNumber}`,
        to: `whatsapp:${adminPhoneNumber}`,
    }
    return await sendSMS(options)
}