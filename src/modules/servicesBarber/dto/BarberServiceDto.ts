


export class BarberServiceDto {
    constructor(
        public readonly name: string,
        public readonly price: Number,
        public readonly barber: string,

    ) { }

    static fromEntity(barberService: any): BarberServiceDto {
        return new BarberServiceDto(
            barberService.name,
            barberService.price,
            barberService.barber
        );
    }
}