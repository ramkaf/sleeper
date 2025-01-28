import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const documentSchema = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await documentSchema.save()).toJSON() as unknown as TDocument;
  }

  async findOne(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument | null> {
    const document = await this.model.findOne(filterQuery).lean<TDocument>();
    if (!document) {
      this.logger.warn(
        `Document not found for query: ${JSON.stringify(filterQuery)}`,
      );
    }
    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    updateQuery: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndUpdate(filterQuery, updateQuery, { new: true })
      .lean<TDocument>(true);

    if (!document) {
      const errorMessage = `Document not found for filter: ${JSON.stringify(filterQuery)}`;
      this.logger.warn(errorMessage);
      throw new NotFoundException(errorMessage);
    }

    return document;
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument | null> {
    const document = await this.model
      .findOneAndDelete(filterQuery)
      .lean<TDocument>(true);

    if (!document) {
      const errorMessage = `Document not found for filter: ${JSON.stringify(filterQuery)}`;
      this.logger.warn(errorMessage);
      throw new NotFoundException(errorMessage);
    }

    return document;
  }

  async find(filterQuery: FilterQuery<TDocument> | {}): Promise<TDocument[]> {
    return (await this.model
      .find(filterQuery)
      .lean<TDocument>(true)) as unknown as TDocument[];
  }
}
