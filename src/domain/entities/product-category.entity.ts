export class ProductCategory {
    public readonly id: number

    public get name(): string {
        return this._name
    }
    private _name: string

    public get isService(): boolean {
        return this._isService
    }
    private _isService: boolean

    constructor(id: number, name: string, isService: boolean) {
        this.id = id
        this._name = name
        this._isService = isService
    }
}
