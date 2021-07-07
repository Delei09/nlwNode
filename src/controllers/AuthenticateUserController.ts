
import { Request, Response } from 'express';
import { AuthenticatedUserService } from '../services/AutenticatedUserService';


class AuthenticateUserController {

    async handle(request :Request ,response: Response){ 
        const {email, password} = request.body

        const authenticateUserService = new AuthenticatedUserService

        const token = await authenticateUserService.execute({
            email,
            password
        })
        console.log(token)

        

        return response.json(token)
    }
}

export { AuthenticateUserController}