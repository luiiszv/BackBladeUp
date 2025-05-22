// Definición del enum para roles
export enum UserRole {
  CLIENT = 'client',
  BARBER = 'barber',
  // Agrega otros roles según necesites
}

// Interface para validación estática
export interface ICreateUserDto {
  name: string;
  lastName: string;
  email: string;
  password: string;
  role?: UserRole;
}

// Clase DTO con métodos de validación
export class CreateUserDto {
  private constructor(
    public readonly name: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role?: UserRole
  ) { }

  // Factory method con validación
  static create(props: Partial<ICreateUserDto>): [string | null, CreateUserDto?] {
    if (!props) {
      return ['Data required'];
    }
    const { name, lastName, email, password, role } = props;

    // Validaciones básicas
    if (!name || !lastName || !email || !password) {
      return ['Name, last name, email, role and password are required'];
    }

    // Validación de email simple
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return ['Invalid email format'];
    }

    // Validación de contraseña (ejemplo básico)
    if (password.length < 5) {
      return ['Password must be at least 5 characters'];
    }


    if (role && !Object.values(UserRole).includes(role)) {
      return [`Invalid role. Valid roles are: ${Object.values(UserRole).join(', ')}`];
    }

    return [
      null,
      new CreateUserDto(
        name.trim(),
        lastName.trim(),
        email.trim().toLowerCase(),
        password,
        role || UserRole.CLIENT
      )
    ];
  }
}