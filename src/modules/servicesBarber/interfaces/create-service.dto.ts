export interface ICreateServiceDto {
    name: string;
    price: Number; // ✅ tipo primitivo
    description?: string;
}

export class CreateServiceDto {
    private constructor(
        public readonly name: string,
        public readonly price: Number,
        public readonly description?: string,
    ) { }

    // Factory method con validación
    static create(props: Partial<ICreateServiceDto>): [string | null, CreateServiceDto?] {
        if (!props) {
            return ['Data required'];
        }

        const { name, price, description = "Description" } = props; // ✅ accede a description correctamente

        // Validaciones básicas
        if (!name || price === undefined || price === null) {
            return ['Name and price are required'];
        }

        return [
            null,
            new CreateServiceDto(
                name.trim(),
                price,
                description,
            ),
        ];
    }
}