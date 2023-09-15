import { CreateProductRequest } from '@application/use-cases/products/create-product.usecase'
import { Product } from '@domain/entities/product.entity'
import { PaginationOptions } from 'src/shared/shared.types'

/**
 * Interface that handles persistence operations related to {@link Product}
 */
export interface IProductRepository {
    /**
     * Gets all products with pagination applied.
     * @param pagination Query pagination options.
     * @returns A list containing found products.
     */
    getAllProducts(pagination?: PaginationOptions): Promise<Product[]>
    /**
     * Creates a new product in the system.
     * @param newProduct The new product to be inserted.
     * @returns The created product with its new identifier.
     */
    createProduct(newProduct: CreateProductRequest): Promise<Product>
}
