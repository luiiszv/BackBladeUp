

export interface IBarber {
    _id: string,
    name: string;
    lastName: string;
    email: string;
    role: 'barber';
    creationDate: Date;
    active: boolean;
    isBarberActive: boolean;

}