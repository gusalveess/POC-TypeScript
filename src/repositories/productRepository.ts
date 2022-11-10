import { QueryResult } from "pg";
import db from "../database.js";
import {Insert, NewName, NewPrice, Total} from "../protocols/Product.js"

async function NewProduct(product: Insert): Promise<QueryResult> {
    return db.query(
        `INSERT INTO products (product, price, userid) VALUES ($1, $2, $3)`,[product.product, product.price, product.userid]
    )
}

async function ReadProducts(userid: string): Promise<QueryResult<Insert>> {
    return db.query(
        `SELECT * FROM products WHERE userid=$1`,[userid]
    )
}

async function Total(userid: number): Promise<QueryResult<Total>> {
    return db.query(
        `SELECT  products.userid as "id", COUNT(products.id) as "QuantityProducts", MAX(products.price) as "total" FROM products WHERE products.userid = $1 GROUP BY products.userid`,[userid]
    )
}

async function UpdateName(name: NewName, id: string): Promise<QueryResult> {
    return db.query(
        `UPDATE products SET product = $1 WHERE id = $2`,[name.product, id]
    )
}


async function UpdatePrice(price: NewPrice, id: string,): Promise<QueryResult> {
    return db.query(
        `UPDATE products SET product = $1 WHERE id = $2`,[price.price, id]
    )
}

async function Delete(id: string): Promise<QueryResult> {
    return db.query(
        `DELETE FROM products WHERE id=$1`,[id]
    )
}

export {NewProduct, ReadProducts, Total, UpdateName, UpdatePrice, Delete}