import { apiSetup } from '@api/api.dependencies'
import Elysia, { t } from 'elysia'

export const apiProducts = new Elysia({ prefix: '/products' })
    .use(apiSetup)

    // [GET /products] - Endpoint for retrieving all products with pagination.
    .get(
        '/',
        async ({ store, query }) => {
            const pagination = { page: query.page ?? 1, pageSize: query.pageSize ?? 10 }
            const products = await store.useCases.getAllProductsUseCase.Execute(pagination)

            return products.map((prod) => ({
                id: prod.id,
                name: prod.name,
                pvp: prod.pvp,
                categoryId: prod.categoryId
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
                    pvp: t.Numeric(),
                    categoryId: t.Optional(t.Numeric())
                })
            )
        }
    )

    // [POST /products] - Endpoint for retrieving all products with pagination.
    .post(
        '/',
        async ({ body, store }) => {
            const result = await store.useCases.createProductUseCase.Execute({
                name: body.name,
                pvp: body.pvp,
                categoryId: body.categoryId
            })

            return {
                id: result.id,
                name: result.name,
                pvp: result.pvp,
                categoryId: result.categoryId
            }
        },
        {
            body: t.Object({
                name: t.String(),
                pvp: t.Numeric(),
                categoryId: t.Optional(t.Numeric())
            }),
            response: t.Object({
                id: t.Numeric(),
                name: t.String(),
                pvp: t.Numeric(),
                categoryId: t.Optional(t.Numeric())
            })
        }
    )
