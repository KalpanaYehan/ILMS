import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "https://ilms-mbf1.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT"]
}));

const renewToken = (req, res) => {
    const refreshtoken = req.cookies.refreshtoken;
    let exist = false;
    if (!refreshtoken) {
        res.json({ message: "unsuccess" });
    } else {
        jwt.verify(refreshtoken, 'default-secret', (err, decoded) => {
            if (err) {
                res.json("Token is wrong");
            } else {
                const accesstoken = jwt.sign({ Email: decoded.Email, role: decoded.role }, "default-secret", { expiresIn: '15m' });
                res.cookie("accesstoken", accesstoken, { maxAge: 900000 });
                exist = true;
            }
        });
    }
    return exist;
};

const verifyUser = (req, res, next) => { //middleware
    const accesstoken = req.cookies.accesstoken;
    if (!accesstoken) {
        if (renewToken(req, res)) {
            next();
        }
    } else {
        jwt.verify(accesstoken, 'default-secret', (err, decoded) => {
            if (err) {
                res.json("Token is wrong");
            } else {
                req.Email = decoded.email;
                req.role = decoded.role;
                next();
            }
        });
    }
};

export { renewToken, verifyUser };
