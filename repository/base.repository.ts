import { Context } from '@nuxt/types'
import { helpers } from "@/utils"
import { RepositoryType } from "@/interfaces"

export default class BaseRepository<T> implements RepositoryType<T> {
  protected readonly type: any
  protected readonly context: Context
  private readonly controllerName: string

  constructor(context: Context, type: any, controllerName: string) {
    this.type = type;
    this.context = context;
    this.controllerName = controllerName;
  }

  async all() {
    const response = await this.context.$axios.get(`${this.controllerName}`);
    return response.data ? response.data.map((item: any) => helpers.createInstance<T>(this.type, item)) : [];
  }

  async find(id: string): Promise<T | any> {
    if (!id) return null;
    const response = await this.context.$axios.get(`${this.controllerName}/${id}`);
    return response.data ? helpers.createInstance<T>(this.type, response.data) : null;
  }

  async findOne(query: any): Promise<T | any> {
    const response = await this.context.$axios.post(`${this.controllerName}/one`, query);
    return response.data ? helpers.createInstance<T>(this.type, response.data) : null;
  }

  async findMany(query: any): Promise<T[] | any> {
    const response = await this.context.$axios.post(`${this.controllerName}/many`, query);
    console.log(response);
    return response.data ? response.data.map((item: any) => helpers.createInstance<T>(this.type, item)) : [];
  }

  async create(document: T): Promise<T | any> {
    const response = await this.context.$axios.post(`${this.controllerName}`, document);
    return response.data ? helpers.createInstance<T>(this.type, response.data) : null;
  }

  async update(document: T): Promise<T | any> {
    const response = await this.context.$axios.put(`${this.controllerName}`, document);
    return response.data ? helpers.createInstance<T>(this.type, response.data) : null;
  }

  async delete(id: string): Promise<boolean> {
    if (!id) return false;
    const response = await this.context.$axios.put(`${this.controllerName}/delete/${id}`);
    return response.data;
  }

  async soft(id: string): Promise<T | any> {
    if (!id) return null;
    const response = await this.context.$axios.put(`${this.controllerName}/delete/${id}`);
    return response.data ? helpers.createInstance<T>(this.type, response.data) : null;
  }

  async restore(id: string): Promise<T | any> {
    if (!id) return null;
    const response = await this.context.$axios.put(`${this.controllerName}/restore/${id}`);
    return response.data ? helpers.createInstance<T>(this.type, response.data) : null;
  }

  async exists(id: string, query: any): Promise<boolean> {
    const response = await this.context.$axios.post(`${this.controllerName}/exists`, { id, ...query });
    return response.data;
  }
}
