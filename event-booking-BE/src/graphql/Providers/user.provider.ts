import bcrypt from "bcryptjs";
import { CreateUserType, UserType } from "../../Utils/customTypes";
import { User } from "../../Models";

export default class UserService{
    public static async createUser(args: CreateUserType):Promise<UserType>{
        const { email, password } = args.userInput;

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
			email,
			password: hashedPassword,
		});

		const { password: userPassword, ...userObjWthoutPass } =user.toObject();
		return userObjWthoutPass;
	}
}
