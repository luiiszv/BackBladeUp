

export interface IService extends Document {
    name: string;
    description?: string;
    price: number;
    barber: object;
    imageUrl?: string
}
