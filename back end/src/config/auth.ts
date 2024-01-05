import 'dotenv/config'

export default {
    secret: process.env.SECRET,
    expiresIn: '79d',
    stripe: process.env.STRIPE_PUBLIC_KEY
}