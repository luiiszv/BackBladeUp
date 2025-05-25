


export class BarberServiceDto {
    constructor(
        public readonly name: string,
        public readonly price: Number,
        public readonly barber: string,
        public readonly imageUrl: string,

    ) { }

    static fromEntity(barberService: any): BarberServiceDto {
        return new BarberServiceDto(
            barberService.name,
            barberService.price,
            barberService.barber,
            barberService.imageUrl
        );
    }
}