import { apiSetup } from '@api/api.dependencies'
import Elysia, { t } from 'elysia'

export const apiProductCategories = new Elysia({ prefix: '/product-categories' })
    .use(apiSetup)

    // [GET /product-categories] - Endpoint for retrieving all product categories with pagination.
    .get(
        '/',
        async ({ store, query }) => {
            const pagination = { page: query.page ?? 1, pageSize: query.pageSize ?? 10 }
            const categories =
                await store.useCases.getAllProductCategoriesUseCase.Execute(pagination)

            return categories.map((category) => ({
                id: category.id,
                name: category.name,
                isService: category.isService
            }))
        },
        {
            query: t.Object({
                page: t.Optional(t.Numeric({ default: 1 })),
                pageSize: t.Optional(t.Numeric({ default: 10 }))
            }),
            response: t.Array(
                t.Object({
                    id: t.Numeric(),
                    name: t.String(),
                    isService: t.Boolean()
                })
            )
        }
    )

    // [POST /product-categories] - Endpoint for retrieving all product categories with pagination.
    .post(
        '/',
        async ({ body, store }) => {
            const result = await store.useCases.createProductCategoryUseCase.Execute({
                name: body.name,
                isService: body.isService
            })

            return {
                id: result.id,
                name: result.name,
                isService: result.isService
            }
        },
        {
            body: t.Object({
                name: t.String(),
                isService: t.Boolean()
            }),
            response: t.Object({
                id: t.Numeric(),
                name: t.String(),
                isService: t.Boolean()
            })
        }
    )
