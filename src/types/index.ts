export type Guitar = {
    id:number
    name: string
    image: string
    description: string
    price: number
}

//inherence guitar 
export type CartItem = Guitar&{
    quantity:number
}

//utility types to, select some of other type and add
// export type CartItem = Omit<Guitar,"id"|"name"|"price">&{
//     quantity: number
// }
// export type CartItem = Pick<Guitar,"id"|"name"|"price">&{
//     quantity: number
// }