import { z } from 'zod'

const productValidationSchema = z.object({
    id: z.number(),
    name: z.string().max(100),
    pvp: z.number(),
    categoryId: z.number().optional()
})

/**
 * Represents a product in the system.
 */
export class Product {
    /**
     * The product's unique identifier.
     */
    public readonly id: number

    /**
     * The product's name.
     */
    public get name(): string {
        return this._name
    }
    private _name: string

    /**
     * The product's PVP.
     */
    public get pvp(): number {
        return this._pvp
    }
    private _pvp: number

    /**
     * The product's category unique identifier.
     */
    public get categoryId(): number | undefined {
        return this._categoryId
    }
    private _categoryId?: number

    /**
     * @param id The new product's unique identifier.
     * @param name The new product's name.
     * @param pvp The new product's PVP.
     * @param categoryId The new product's category unique identifier.
     */
    constructor(id: number, name: string, pvp: number, categoryId?: number) {
        const validation = productValidationSchema.parse({
            id,
            name,
            pvp,
            categoryId
        })

        this.id = validation.id
        this._name = validation.name
        this._pvp = validation.pvp
        this._categoryId = validation.categoryId
    }
}
