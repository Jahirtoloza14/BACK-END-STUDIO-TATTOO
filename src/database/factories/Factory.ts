export abstract class Factory<T> {
    protected abstract generate(): T;

    createMany(count: number ){
    return Array.from({ length: count}, this.generate);
}

createOne(): T {
    return this.generate();
 }
}