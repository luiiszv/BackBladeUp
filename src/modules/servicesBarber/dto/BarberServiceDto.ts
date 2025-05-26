
// src/interfaces/types.ts
export type ServiceCategory =
    | 'Corte clásico'
    | 'Fade'
    | 'Diseño'
    | 'Barba'
    | 'Color'
    | 'Tratamiento'
    | 'Otro';


export class BarberServiceDto {
    constructor(
        public readonly name: string,
        public readonly price: Number,
        public readonly barber: string,
        public readonly imageUrl: string,
       public readonly category: ServiceCategory

    ) { }

    static fromEntity(barberService: any): BarberServiceDto {
        return new BarberServiceDto(
            barberService.name,
            barberService.price,
            barberService.barber,
            barberService.imageUrl,
            barberService.category

        );
    }
}