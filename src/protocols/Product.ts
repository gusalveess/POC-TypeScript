export type Insert = {
    id?: number,
    product: string,
    price: number,
    userid: number
}

export type InsertBody = Omit<Insert, "id" | "userid">

export type NewName = {
    product: string
}

export type NewPrice = {
    price: string | number
}

export type Total = {
    id?: number,
    QuantityProducts: number,
    total: number
}