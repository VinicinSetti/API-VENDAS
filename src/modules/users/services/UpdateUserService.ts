import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";

interface IRequest{
    id: string;
    name: string;
    email: string;
    password: string;
}

class UpdateProductService {
    public async execute({id, name, email, password}: IRequest): Promise<User | undefined> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne(id);

        if(!user){
            throw new AppError('Product not found');
        }

        const userExists = await usersRepository.findByName(name);

        if (userExists && name !== user.name){
            throw new AppError('There is already on product with this name');
        }

        user.name = name;
        user.email = email;
        user.password = password;

        await usersRepository.save(user);

        return user;
    }
}

export default UpdateProductService;