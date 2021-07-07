import {getCustomRepository} from 'typeorm'
import { UsersRespositories } from "../repositories/UsersRepositories"
import {hash } from 'bcryptjs'



interface IUserRequest {
    name: string;
    email :string;
    admin? : boolean;
    password : string
}

class CreateUserService{

    async execute( { name, email,admin, password} : IUserRequest ){
   
//Erro esta aqui...
        const usersRepository = getCustomRepository(UsersRespositories);


       

        if(!email){
            //Lançando exessao
            throw new Error("Email incorreto");
        }

        const userAlreadyExists = await usersRepository.findOne({
            email,
        })
        if(userAlreadyExists){
            throw new Error('Usuario ja existe');
        }

        const passwordHash = await hash(password , 8)
        const user = usersRepository.create({ 
            name,
            email,
            admin,
            password : passwordHash
        });
        await usersRepository.save(user)

        return user

    }
}

export {CreateUserService}