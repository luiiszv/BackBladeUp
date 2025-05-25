export interface ICreateServiceDto {
    name: string;
    price: Number; // ✅ tipo primitivo
    description?: string;
    imageUrl?: string;
}

export class CreateServiceDto {
    private constructor(
        public readonly name: string,
        public readonly price: Number,
        public readonly description?: string,
        public imageUrl?: string
    ) { }

    // Factory method con validación
    static create(props: Partial<ICreateServiceDto>): [string | null, CreateServiceDto?] {
        if (!props) {
            return ['Data required'];
        }

        const { name, price, description = "Description", imageUrl } = props; // ✅ accede a description correctamente

        // Validaciones básicas
        if (!name || price === undefined || price === null) {
            return ['Name and price are required'];
        }

        // Opcional: validar que imageUrl sea string y no vacío si se envía
        if (imageUrl && typeof imageUrl !== 'string') {
            return ['Invalid image URL'];
        }

        return [
            null,
            new CreateServiceDto(
                name.trim(),
                price,
                description,
                imageUrl
            ),
        ];
    }
}