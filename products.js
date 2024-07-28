import { Router } from "express";
// import { db } from "../../db.js";
// import { db } from "./src/db";
import {db} from './src/db.js'
import { Gender } from "@prisma/client";

const router = Router();

router.get('/products', async (req, res) => {
    try {
        const { categoryId, limit, page, gender } = req.query

        const products = await db.product.findMany({
            where: {
                categoryId,
                gender: gender && (gender === "MALE" ? Gender.MALE : Gender.FEMALE)

            },

            include: {
                discount: true,
                size: true
            },

            take: Number.parseInt(limit) || 20,

            skip: (Number.parseInt(page) - 1) * Number.parseInt(limit) || 0


        })



        return res.json(products).status(200)
    } catch (error) {
        return res.json({ error: "Internal server error" }).status(500)
    }
})

router.get('/product', async (req, res) => {
    try {
        const { productId } = req.query
        console.log(productId)
        const product = await db.product.findUnique({
            where: {
                id: productId,


            },

            include: {
                discount: true,
                size: true
            },




        })



        return res.json(product).status(200)
    } catch (error) {
        return res.json({ error: "Internal server error" }).status(500)
        console.log(error)
    }
})


export  {router}