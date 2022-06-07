export default interface DbType<T> {
  all(): Promise<T[] | []>;
  find<T>(id: string): Promise<T | null>;
  findOne<T>(query: any): Promise<T | null>;
  findMany<T>(query: any): Promise<T[] | []>;
  create<T>(document: any): Promise<T | null>;
  update<T>(document: any): Promise<T | null>;
  delete(id: string): Promise<boolean>;
  soft<T>(id: string): Promise<T | null>;
  restore<T>(id: string): Promise<T | null>;
  exists(id: string, query: any): Promise<boolean>;
  set(prop: any): void;
  clear(): void;
}