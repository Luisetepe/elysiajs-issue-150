import { ValueError } from '@sinclair/typebox/value'

// export type ApiHandlerParams<Schema> = Context<
//     Omit<
//         {
//             [Property in keyof Schema]: Schema[Property] extends TSchema
//                 ? Static<Schema[Property]>
//                 : Schema[Property]
//         },
//         'response'
//     >,
//     ApiStore
// >

export function formatValidationErrors(errors: ValueError[]) {
    const resultMap = new Map<string, string[]>()
    for (const error of errors) {
        const key = error.path.slice(1)
        const tempValue = resultMap.get(key) ?? []

        tempValue.push(error.message)
        resultMap.set(key, tempValue)
    }

    return {
        error: 'validation error',
        status: 400,
        message: 'Request contained one or more validation errors',
        detail: Object.fromEntries(resultMap)
    }
}
