
import { getCustomRepository } from 'typeorm';
import { TagsRepositories } from '../repositories/TagsRepositories';

class CreateTagService{

   async execute(name : string){

    const tagsRepositories = getCustomRepository(TagsRepositories)
    
    if(!name){
        throw new Error ("Nome Incorreto");
    }

    //Select * from Tags Where name === "name"
    const tagAlredyExists = await tagsRepositories.findOne({
        name
    });

    if(tagAlredyExists){
        throw new Error("tag já existe")
    }

    const tag = tagsRepositories.create({
        name
    })

    await tagsRepositories.save(tag)

    return tag

    }
}

export {CreateTagService}