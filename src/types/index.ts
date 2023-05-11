export interface IBlouse {
    nome: string,
    price: number,
    promotion: number,
    img: string,
    favorite: boolean;
    cart: boolean;
    sizes: Array<string>,
    id: number
}
export interface IShoe {
    nome: string,
    price: number,
    promotion: number,
    img: string,
    favorite: boolean;
    cart: boolean;
    sizes: Array<string>,
    sex: string,
    style: string,
    id: number
}
