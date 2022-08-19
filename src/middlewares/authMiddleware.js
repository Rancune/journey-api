import  { getAuth }  from 'firebase-admin/auth';


export const authenticateUser = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).send('Unauthorized request');
        }
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = await getAuth().verifyIdToken(token);    
        const { uid } = decodedToken.uid;
        req.user = { uid };
        next();
    } catch (error) {
        res.status(401).send(error.message);
    }
        
    }
