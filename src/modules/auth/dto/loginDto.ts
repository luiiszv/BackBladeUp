import { ILoginReq } from "../interfaces/ILoginUser";


// Clase DTO con métodos de validación
export class LoginDto {
    private constructor(
        public readonly email: string,
        public readonly password: string,

    ) { }

    // Factory method con validación
    static login(props: Partial<ILoginReq>): [string | null, LoginDto?] {
        const { email, password } = props;

        // Validaciones básicas
        if (!email || !password) {
            return ['email and password are required'];
        }

        // Validación de email simple
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return ['Invalid email format'];
        }

        // Validación de contraseña (ejemplo básico)
        if (password.length < 5) {
            return ['Password must be at least 5 characters'];
        }

        return [
            null,
            new LoginDto(
                email,
                password
            )
        ];
    }

    
}