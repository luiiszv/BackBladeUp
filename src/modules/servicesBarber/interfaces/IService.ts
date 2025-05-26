
export interface IService extends Document {
    name: string;
    description?: string;
    price: number;
    barber: object;
    imageUrl?: string;
    category: 'Corte clásico' | 'Fade' | 'Diseño' | 'Barba' | 'Color' | 'Tratamiento' | 'Otro';
}
