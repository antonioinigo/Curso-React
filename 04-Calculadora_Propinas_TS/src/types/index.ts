export type MenuItem={
    id: number,
    name: string,
    price: number,
}

export type OrderITem=MenuItem & {
    quantity: number
}