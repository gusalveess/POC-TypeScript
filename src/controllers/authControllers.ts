import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as authRepository from "../repositories/authRepository.js";
import { SignUp, SignIn } from "../protocols/Auth.js";

export async function SU(req: Request, res: Response) {
  const Info = req.body as SignUp;
  const { rows: user } = await authRepository.FindUser(Info.email);
  const passwordHash = bcrypt.hashSync(Info.password, 10);
  const Send = {
    picture: Info.picture,
    name: Info.name,
    email: Info.email,
    passwordHash: passwordHash,
  };

  try {
    if (!Info.picture || !Info.name || !Info.email || !Info.password) {
      return res.status(422).send("Preencha os campos em vazios!");
    }

    if (Info.password != Info.confirmPassword) {
      return res.status(422).send("As senhas precisam ser iguais!");
    }

    if (user.length > 0) {
      return res
        .status(409)
        .send("Já existe um usuário cadastrado com esse e-mail.");
    }

    await authRepository.CreateUser(Send);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
}

export async function SI(req: Request, res: Response) {
  const info = req.body as SignIn;
  const key = process.env.JWT_SECRET;
  const { rows: user } = await authRepository.FindUser(info.email);
  const token: string = jwt.sign(user[0].id, key);
  const sendToken = {
    token: token,
  };

  try {
    if (!info.email || !info.password) {
      return res.status(422).send("Preencha os campos em vazios!");
    }

    if (user.length === 0) {
      return res.status(401).send("Usuário incompátivel ou inexistente");
    }

    if (bcrypt.compareSync(info.password, user[0].password) === false) {
      return res.status(401).send("Senha incorreta.");
    }

    await authRepository.Login(token, user[0].id);
    res.status(200).send(sendToken);
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
}

export async function LogOut(req: Request, res: Response) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const { rows: session } = await authRepository.FindToken(token);

  try {
    if (session.length === 0) {
      return res.status(401).send("Sessão não encontrada");
    }

    if (!token) {
      return res.status(401).send("Sem Token de acesso.");
    }

    await authRepository.Finish(token);

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
}
