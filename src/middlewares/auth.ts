import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";



// -----------------------------------------------------------------------------

export const auth = (req: Request, res: Response, next: NextFunction) => {


    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "No token Unauthorized" });
        return;
    }


    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayload

        req.tokenData = {
            id: decoded.id,
            role: decoded.role_name,
        }


        //call the next middleware
        next();

    } catch (error) {
        res.status(401).json({ message: "no pass your token is diferent ,Unauthorized" });

        return;
    }

}