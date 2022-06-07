import mongoose from 'mongoose'

export default interface ModelType {
  mongooseModel: mongoose.Model<any>;
  all(): Promise<any[]>;
  find<T>(id: string): Promise<T>;
  findOne<T>(query: any): Promise<T>;
  findMany<T>(query: any): Promise<any[] | T>;
  create<T>(document: any): Promise<T>;
  update<T>(id: string, document: any): Promise<T>;
  delete(id: string): Promise<boolean>;
  soft<T>(id: string): Promise<T>;
  restore<T>(id: string): Promise<T>;
  exists(id: string, query: any): Promise<boolean>;
}