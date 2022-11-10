import { Request, Response } from "express";
import * as authRepository from "../repositories/authRepository.js";
import * as productRepository from "../repositories/productRepository.js"
import {InsertBody, Insert, NewName, NewPrice} from "../protocols/Product.js"

export async function InsertProduct(req: Request, res: Response) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const Product = req.body as InsertBody
  const { rows: session } = await authRepository.FindToken(token);
  const SendProduct: Insert = {
    product: Product.product,
    price: Product.price,
    userid: session[0].userid
  }

  try {
    if(!Product.product || !Product.price) {
        return res.status(422).send("Preencha os campos em vazios!");
    }

    if (session.length === 0) {
        return res.status(401).send("Sessão não encontrada");
      }

      if (!token) {
        return res.status(401).send("Sem Token de acesso.");
      }

      await productRepository.NewProduct(SendProduct);
      res.sendStatus(200);
  
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
}

export async function GetProducts(req: Request, res: Response) {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const { rows: session } = await authRepository.FindToken(token);

    try {
        if (session.length === 0) {
            return res.status(401).send("Sessão não encontrada");
          }
    
          if (!token) {
            return res.status(401).send("Sem Token de acesso.");
          }
          
          const {rows: myProducts} = await productRepository.ReadProducts(session[0].userid)
          res.status(200).send(myProducts)
    } catch (error) {
        res.sendStatus(500);
        console.log(error);
    }
}

export async function GetTotal(req: Request, res: Response) {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const { rows: session } = await authRepository.FindToken(token);

    try {
        if (session.length === 0) {
            return res.status(401).send("Sessão não encontrada");
          }
    
          if (!token) {
            return res.status(401).send("Sem Token de acesso.");
          }
          
          const {rows: myTotal} = await productRepository.Total(session[0].userid)
          res.status(200).send(myTotal)
    } catch (error) {
        res.sendStatus(500);
        console.log(error);
    }
}

export async function EditProduct(req: Request, res: Response) {
  const {id} = req.params
  const newName = req.body as NewName
  const token = req.headers.authorization?.replace("Bearer ", "");
  const { rows: session } = await authRepository.FindToken(token);
  const {rows: product} = await productRepository.ReadProducts(id)

  try {

    if(session[0].userid !== product[0].userid) {
      return res.status(401).send("Não autorizado.");
    }

    if (session.length === 0) {
      return res.status(401).send("Sessão não encontrada");
    }

    if (!token) {
      return res.status(401).send("Sem Token de acesso.");
    }

    await productRepository.UpdateName(newName, id);
    res.sendStatus(200);

  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
}

export async function EditPrice(req: Request, res: Response) {
  const {id} = req.params
  const newPrice = req.body as NewPrice
  const token = req.headers.authorization?.replace("Bearer ", "");
  const { rows: session } = await authRepository.FindToken(token);
  const {rows: product} = await productRepository.ReadProducts(id)

  try {

    if(session[0].userid !== product[0].userid) {
      return res.status(401).send("Não autorizado.");
    }

    if (session.length === 0) {
      return res.status(401).send("Sessão não encontrada");
    }

    if (!token) {
      return res.status(401).send("Sem Token de acesso.");
    }

    await productRepository.UpdatePrice(newPrice, id);
    res.sendStatus(200);

  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
}

export async function Del(req: Request, res: Response) {
  const {id} = req.params
  const token = req.headers.authorization?.replace("Bearer ", "");
  const { rows: session } = await authRepository.FindToken(token);
  const {rows: product} = await productRepository.ReadProducts(id)

  try {

    if(session[0].userid !== product[0].userid) {
      return res.status(401).send("Não autorizado.");
    }

    if (session.length === 0) {
      return res.status(401).send("Sessão não encontrada");
    }

    if (!token) {
      return res.status(401).send("Sem Token de acesso.");
    }

    await productRepository.Delete(id);
    res.sendStatus(200);

  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
}





