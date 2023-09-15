import { IProductCategoryRepository } from '@application/interfaces/product-category.interfaces'
import { PaginationOptions } from '@shared/shared.types'

export class GetAllProductCategoriesUseCase {
    private readonly _repo: IProductCategoryRepository

    constructor(repo: IProductCategoryRepository) {
        this._repo = repo
    }

    Execute(pagination?: PaginationOptions) {
        return this._repo.getAllProductCategories(pagination)
    }
}
