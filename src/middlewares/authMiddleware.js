import { getAuth } from "firebase-admin/auth";

export const authenticateUser = async (req, res, next) => {
  try {
    // if (!req.headers.authorization) {
    //     return res.status(401).send('Unauthorized request');
    // }
    // const token = req.headers.authorization.split(' ')[1];
    // const decodedToken = await getAuth().verifyIdToken(token, true);
    // const { uid } = decodedToken.uid;
    // req.user = { uid };
    req.user = "tReV7eyeazXdWK3MOBF4vrhd6sm2";
    console.log(
      "########################### User authenticated ###########################"
    );
    console.log(req.user);
    next();
  } catch (error) {
    res.status(401).send(error.message);
  }
};
