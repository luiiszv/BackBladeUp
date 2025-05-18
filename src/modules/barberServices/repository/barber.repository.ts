import { UserModel } from "../../user/models/User";
import { IBarber } from "../interfaces/IBarber";
import { IBarberRepository } from "../interfaces/IBarberRepository";


export class BarberRepository implements IBarberRepository {
    constructor(private userModel: typeof UserModel) { }

    async findBarberById(id: string): Promise<IBarber | null> {
        return await this.userModel.findOne({ _id: id, role: 'barber' }).lean<IBarber>().exec();
    }

    async findAllBarbers(): Promise<IBarber[]> {
        return await this.userModel.find({ role: 'barber' }).lean<IBarber[]>().exec();
    }

    async findAllBarbersActives(): Promise<IBarber[]> {
        return await this.userModel.find({ role: 'barber', isBarberActive: true }).lean<IBarber[]>().exec();
    }


    //Estado del barbero / 
    async changeStatusBarber(id: string): Promise<IBarber | null> {
        const barber = await this.userModel.findOne({ _id: id, role: 'barber' });
        if (!barber) {
            return null
        }


        barber.isBarberActive = !barber.isBarberActive;

        await barber.save();

        return barber as IBarber;
    }



}


