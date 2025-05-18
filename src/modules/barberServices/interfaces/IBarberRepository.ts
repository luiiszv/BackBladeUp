import { IBarber } from "./IBarber";


export interface IBarberRepository {
    findBarberById(id: string): Promise<IBarber | null>;
    findAllBarbers(): Promise<IBarber[]>;
    changeStatusBarber(id: string): Promise<IBarber | null>;  


}