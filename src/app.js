import express from "express";
import cors from "cors";
// import productRouter from "./routes/public/products.js";
// import productRouter from './routes/public/products.js'
// import {productRouter} from './routes/public/products.js'
import productRouter from './routes/product'

const app = express();


app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000/",
    methods:["GET", "POST"]
}))

app.use('/api/v1', productRouter);
app.get('/',(req,res)=>{
    return res.json({success: "true"})
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export { app };
