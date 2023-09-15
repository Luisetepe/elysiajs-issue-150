import { IProductCategoryRepository } from '@application/interfaces/product-category.interfaces'

export type CreateProductCategoryRequest = {
    name: string
    isService: boolean
}

export class CreateProductCategoryUseCase {
    private readonly _repo: IProductCategoryRepository

    constructor(repo: IProductCategoryRepository) {
        this._repo = repo
    }

    Execute(newProduct: CreateProductCategoryRequest) {
        return this._repo.createProductCategory(newProduct)
    }
}
