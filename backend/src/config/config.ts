import dotenv from 'dotenv'

dotenv.config()


const MONGO_USERNAME =process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD =process.env.MONGO_PASSWORD || '';
const MONGO_URL =`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.fvgdj.mongodb.net`;
export const TOKEN_SECRECT=process.env.TOKEN_SECRECT||'wateveris'

const SERVER_PORT =process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) :1337;

export const config ={

    mongo:{
        url:MONGO_URL
    },
    server:{
        port:SERVER_PORT
    }
}