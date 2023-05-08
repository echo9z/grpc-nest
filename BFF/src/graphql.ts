
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateCatInput {
    id?: Nullable<number>;
}

export class UpdateCatInput {
    id: number;
}

export class Cat {
    id?: Nullable<number>;
    name?: Nullable<string>;
}

export abstract class IQuery {
    abstract cats(): Nullable<Cat>[] | Promise<Nullable<Cat>[]>;

    abstract cat(id: number): Nullable<Cat> | Promise<Nullable<Cat>>;
}

export abstract class IMutation {
    abstract createCat(createCatInput: CreateCatInput): Cat | Promise<Cat>;

    abstract updateCat(updateCatInput: UpdateCatInput): Cat | Promise<Cat>;

    abstract removeCat(id: number): Nullable<Cat> | Promise<Nullable<Cat>>;
}

type Nullable<T> = T | null;
