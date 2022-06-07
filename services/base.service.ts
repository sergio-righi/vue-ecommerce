import { Context } from '@nuxt/types'
import { ServiceType } from "@/interfaces"

export default class BaseService<T> implements ServiceType<T> {
  protected readonly store: any
  protected readonly repository: any
  private readonly storeName: string

  constructor({ store }: Context, repository: any, storeName: string) {
    this.store = store;
    this.storeName = storeName;
    this.repository = repository;
  }

  async all(): Promise<T[] | []> {
    const response = await this.repository.all();
    this.store.dispatch(`${this.storeName}/all`, response);
    return response;
  }

  async find(id: string): Promise<T | any> {
    const response = await this.repository.find(id);
    this.store.dispatch(`${this.storeName}/find`, response);
    return response;
  }

  async findOne(query: any): Promise<T | any> {
    return await this.repository.findOne(query);
  }

  async findMany(query: any): Promise<T[] | any> {
    return await this.repository.findMany(query);
  }

  async create(document: T): Promise<T | any> {
    const response = await this.repository.create(document);
    this.store.dispatch(`${this.storeName}/create`, document);
    return response;
  }

  async update(document: T): Promise<T | any> {
    const response = await this.repository.update(document);
    this.store.dispatch(`${this.storeName}/update`, document);
    return response;
  }

  async delete(id: string): Promise<T | any> {
    const response = await this.repository.delete(id);
    this.store.dispatch(`${this.storeName}/delete`, id);
    return response;
  }

  async soft(id: string): Promise<T | any> {
    const response = await this.repository.soft(id);
    this.store.dispatch(`${this.storeName}/soft`, id);
    return response;
  }

  async restore(id: string): Promise<T | any> {
    const response = await this.repository.restore(id);
    this.store.dispatch(`${this.storeName}/restore`, id);
    return response;
  }

  async exists(id: string, query: string): Promise<boolean> {
    return await this.repository.exists(id, query);
  }

  set(prop: any): void {
    this.store.dispatch(`${this.storeName}/set`, prop);
  }

  clear(): void {
    this.store.dispatch(`${this.storeName}/clear`);
  }
}