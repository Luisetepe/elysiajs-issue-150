import { IProductRepository } from '@application/interfaces/product.interfaces'

export type CreateProductRequest = {
    name: string
    pvp: number
    categoryId?: number
}

export class CreateProductUseCase {
    private readonly _repo: IProductRepository

    constructor(repo: IProductRepository) {
        this._repo = repo
    }

    Execute(newProduct: CreateProductRequest) {
        return this._repo.createProduct(newProduct)
    }
}
