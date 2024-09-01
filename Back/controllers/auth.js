import { User } from '../model/userModel.js';
import bcryptjs from 'bcryptjs';
import { generateTokenSetCookies } from '../utils/generateTokneSetCookies.js';


export const signup = async(req, res) => {
    const { email, password, name } = req.body;
    try {
        if (!email || !password || !name) {
            //forma de pegar erro 1
            throw new Error("Todos campos sao requeridos");
        }
        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            //throw new Error("Existe este usuario!"); primeira forma
            return res.status(400).json({ message: "Este usuario existe" })

        }

        //criptografar email para nao ser legivel
        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 //Equivale a 24 horas
        })
        await user.save();
        //JWT
        generateTokenSetCookies(res, user._id);
        res.status(201).json({
            success: true,
            message: "Usuario criado com sucesso",
            user: {
                ...user._doc,
                password: undefined
            },
        });
    } catch (error) {
        //Mensagem que vem do erro definido acima
        res.status(400).json({ success: false, message: error.message })
    }
}
export const login = async(req, res) => {
    res.send('login router')
}
export const logout = async(req, res) => {
    res.send('logout router')
}