
import { getCustomRepository } from 'typeorm';
import { UsersRespositories } from '../repositories/UsersRepositories';
import { compare} from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface IAuthenticateRequest{
    email : string,
    password : string
}

class AuthenticatedUserService{
    async execute( {email, password} : IAuthenticateRequest ){

///Verificaer se email exite 

const usersRepositories =  getCustomRepository(UsersRespositories)

const user = await usersRepositories.findOne({
    email
})

if(!user){
    throw new Error ("Email/ Senha Errada")
}

// verificar se a senha esta correta

   const passwordMatch = await compare(password , user.password)
 
    if(!passwordMatch){
        throw new Error ("Email/ Senha Errada")
    }

    const token = sign({
        email : user.email
    },
        "ccc2fc1c5a370e498741ecb782003a36",
        { subject : user.id ,
         expiresIn : "1d" }
        )


            return token



    }




}

export {AuthenticatedUserService}