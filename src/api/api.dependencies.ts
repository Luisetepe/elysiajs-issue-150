import { IProductCategoryRepository } from '@application/interfaces/product-category.interfaces'
import { IProductRepository } from '@application/interfaces/product.interfaces'
import { CreateProductCategoryUseCase } from '@application/use-cases/product-categories/create-product-category.usecase'
import { GetAllProductCategoriesUseCase } from '@application/use-cases/product-categories/get-all-product-categories.usecase'
import { CreateProductUseCase } from '@application/use-cases/products/create-product.usecase'
import { GetAllProductsUseCase } from '@application/use-cases/products/get-all-products.usecase'
import { getDatabaseConnectionPool } from '@infrastructure/persistence/persistence.utils'
import { ProductCategoryRepository } from '@infrastructure/persistence/repositories/product-category.repository'
import { ProductRepository } from '@infrastructure/persistence/repositories/product.repository'
import Elysia from 'elysia'

/* Build dependencies and inject them into shared state */
const dbPool = getDatabaseConnectionPool()

// Products

const productRepository: IProductRepository = new ProductRepository(dbPool)
const getAllProductsUseCase = new GetAllProductsUseCase(productRepository)
const createProductUseCase = new CreateProductUseCase(productRepository)

// ProductCategories

const productCategoryRepository: IProductCategoryRepository = new ProductCategoryRepository(dbPool)
const getAllProductCategoriesUseCase = new GetAllProductCategoriesUseCase(productCategoryRepository)
const createProductCategoryUseCase = new CreateProductCategoryUseCase(productCategoryRepository)

// Inject all dependencies
export const apiSetup = new Elysia({ name: 'apiSetup' }).state('useCases', {
    getAllProductsUseCase,
    getAllProductCategoriesUseCase,
    createProductUseCase,
    createProductCategoryUseCase
})

/********************************************************/
