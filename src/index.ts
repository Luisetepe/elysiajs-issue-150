import { formatValidationErrors } from '@api/api.utils'
import { apiProductCategories } from '@api/controllers/product-categories.controller'
import { apiProducts } from '@api/controllers/products.controller'
import { Elysia } from 'elysia'

const app = new Elysia()
    .onError(({ code, error, set }) => {
        switch (code) {
            case 'NOT_FOUND':
                set.status = 404
                return { message: error.message }

            case 'VALIDATION':
                set.status = 400
                return formatValidationErrors(error.all)

            default:
                set.status = 500
                return { message: error.message }
        }
    })
    .use(apiProducts)
    .use(apiProductCategories)
    .get('/', () => 'Hello Elyssia')
    .listen(8080)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
