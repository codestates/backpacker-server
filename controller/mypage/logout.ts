import { user } from "../../models/user";
import { Request, Response, NextFunction } from "express";

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const userId = res.locals.id;
    if (!userId) {
      return res.status(401).json({ message: "로그인 상태가 아닙니다 !" });
    } else {
      const userFind: any = await user.findOne({ _id: userId });
      if (userFind) {
        await user.updateOne(
          { _id: userFind._id },
          {
            $set: {
              refreshToken: null,
            },
          }
        );
        return res
          .cookie("hashPw", "", {
            httpOnly: true,
            maxAge: 0,
            domain: "backpackerz.shop",
          })
          .status(200)
          .send({ message: "로그아웃 성공 !" });
      } else {
        return res.status(404).send({ message: "사용자를 찾을수 없습니다 !" });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
