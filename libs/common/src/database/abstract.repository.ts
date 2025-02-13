import { FilterQuery, Model, Types, UpdateQuery } from "mongoose";
import { AbstractDocument } from "./abstract.schema";
import { Logger, NotFoundException } from "@nestjs/common";

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
    protected abstract readonly logger : Logger
    constructor (protected readonly model: Model <TDocument>){}

    async create (document: Omit<TDocument , '_id'>):Promise<TDocument>{
        const createDocument = new this.model ({
            ...document , _id: new Types.ObjectId
        })
        return (await createDocument.save() as unknown as TDocument)
    }
    async find(filterQuery:FilterQuery<TDocument>):Promise<TDocument[]>{
        return await this.model.find(filterQuery).lean<TDocument[]>(true)
     }
    async findOne(filterQuery : FilterQuery<TDocument>):Promise<TDocument>{
        const document = await this.model.findOne(filterQuery).lean<TDocument>(true)
        if (!document){
            this.logger.warn('Document was not found with that filter Query')
            throw new NotFoundException('Document was not found')
        }
        return document
    }
    async findOneAndUpdate(filterQuery:FilterQuery<TDocument> , update: UpdateQuery<TDocument>):Promise<TDocument>{
        const document = await this.model.findOneAndUpdate(filterQuery , update , {new : true}).lean<TDocument>(true)
        if (!document){
            this.logger.warn('Document was not found with that filter Query')
            throw new NotFoundException('Document was not found')
        }
        return document
    }
    async findOneAndDelete (filterQuery : FilterQuery <TDocument>):Promise<TDocument | null>{
       return await this.model.findOneAndDelete(filterQuery).lean<TDocument>()
    }
}