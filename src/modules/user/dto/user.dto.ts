export class UserDto {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly lastName: string,
        public readonly email: string,
        public readonly role: string,
        public readonly creationDate: Date,
        public readonly active: boolean
    ) {}

    static fromEntity(user: any): UserDto {
        return new UserDto(
            user._id,
            user.name,
            user.lastName,
            user.email,
            user.role,
            user.creationDate,
            user.active
        );
    }
}