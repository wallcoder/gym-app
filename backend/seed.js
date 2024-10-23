import sequelize from "./config/db";
import { UserRole } from "./models/User";

const insertUserType = () => {
    try {
        const userType = UserRole.create({
            id: 2,
            roleName: 'user',


        })
    } catch (err) {
        console.log(err)
    }
}