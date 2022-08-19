import { getAuth } from "firebase/auth";

export const validateUser = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw new Error("No token provided");
        }
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = await getAuth().verifyIdToken(token);
        const {uid} = decodedToken; 
        req.user = {uid};
        next();

    } catch (error) {
        res.status(401).json({ message: "Unauthorized Token" });
    }
}

export default validateUser;
