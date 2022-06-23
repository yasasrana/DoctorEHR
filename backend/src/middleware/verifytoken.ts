import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRECT } from '../config/config';


interface IPayload {
    _id: string;
    
}
export const TokenValidation =(req:Request,res:Response,next:NextFunction) =>{

    const authHeader =req.headers['authorization']
    const token =authHeader && authHeader.split(' ')[1]
    if(!token) return res.status(401).json('Access denied')


console.log(TOKEN_SECRECT)
    const payload = jwt.verify(token,TOKEN_SECRECT || 'wateveris') as IPayload;
   
    req.body.userId = payload._id;

   return next();
}