export interface IRepository<T> {
    findAll(): Promise<T[]>;
    findById(id: number): Promise<T | null>;
    create(data: Partial<T>): Promise<number>;
    update(id: number, data: Partial<T>): Promise<void>;
    delete(id: number): Promise<void>;
}