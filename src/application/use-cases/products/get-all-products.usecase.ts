import { IProductRepository } from '@application/interfaces/product.interfaces'
import { PaginationOptions } from 'src/shared/shared.types'

export class GetAllProductsUseCase {
    private readonly _repo: IProductRepository

    constructor(repo: IProductRepository) {
        this._repo = repo
    }

    Execute(pagination?: PaginationOptions) {
        return this._repo.getAllProducts(pagination)
    }
}
