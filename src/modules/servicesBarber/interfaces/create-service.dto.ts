
export interface ICreateServiceDto {
    name: string;
    price: number;
    description?: string;
    category: 'Corte clásico' | 'Fade' | 'Diseño' | 'Barba' | 'Color' | 'Tratamiento' | 'Otro';
    imageUrl?: string;
}

export class CreateServiceDto {
    private constructor(
        public readonly name: string,
        public readonly price: number,
        public readonly description: string,
        public readonly category: 'Corte clásico' | 'Fade' | 'Diseño' | 'Barba' | 'Color' | 'Tratamiento' | 'Otro',
        public readonly imageUrl?: string
    ) { }

    static create(props: Partial<ICreateServiceDto>): [string | null, CreateServiceDto?] {
        if (!props) {
            return ['Data required'];
        }

        const {
            name,
            price,
            description = 'Descripción',
            category= "Otro",
            imageUrl
        } = props;

     

        // Validaciones
        if (!name || price === undefined || price === null || !category) {
            return ['Name, price and category are required'];
        }

        const validCategories = ['Corte clásico', 'Fade', 'Diseño', 'Barba', 'Color', 'Tratamiento', 'Otro'];
        if (!validCategories.includes(category)) {
            return ['Invalid category'];
        }

        if (imageUrl && typeof imageUrl !== 'string') {
            return ['Invalid image URL'];
        }

        return [
            null,
            new CreateServiceDto(
                name.trim(),
                price,
                description,
                category,
                imageUrl
            ),
        ];
    }
}
