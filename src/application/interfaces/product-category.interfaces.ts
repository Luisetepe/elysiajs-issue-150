import { CreateProductCategoryRequest } from '@application/use-cases/product-categories/create-product-category.usecase'
import { ProductCategory } from '@domain/entities/product-category.entity'
import { PaginationOptions } from 'src/shared/shared.types'

/**
 * Interface that handles persistence operations related to {@link ProductCategory}
 */
export interface IProductCategoryRepository {
    /**
     * Gets all product categories with pagination applied.
     * @param pagination Query pagination options.
     * @returns A list containing found product categories.
     */
    getAllProductCategories(pagination?: PaginationOptions): Promise<ProductCategory[]>
    /**
     * Creates a new product category in the system.
     * @param newProduct The new product category to be inserted.
     * @returns The created product category with its new identifier.
     */
    createProductCategory(newCategory: CreateProductCategoryRequest): Promise<ProductCategory>
}
