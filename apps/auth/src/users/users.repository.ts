import { AbstractRepository } from "@app/common";
import { UserDocument } from "./models/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Logger } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";

export class UserRepository extends AbstractRepository<UserDocument> {
    protected logger: Logger;
    
    async create (createUserDto:CreateUserDto){
        return this.create(createUserDto)
    }
}
