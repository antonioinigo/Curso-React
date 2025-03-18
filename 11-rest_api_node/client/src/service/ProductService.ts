import {  safeParse } from "valibot";
import axios from "axios";
import { DraftProductSchema, Product, ProductSchema, ProductsSchema } from "../types"
import { toBoolean } from "../utils";



type ProductData = {
    [k: string]: FormDataEntryValue;
}

export async function addProduct(data: ProductData) {
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name as string,
            price: parseFloat(data.price as string)
        });
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`;
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            });
            
        } else {
            throw new Error('Invalid data');
        }
    } catch (error) {
        console.error(error);
        throw error; // Asegúrate de lanzar el error para que pueda ser capturado en el componente
    }
}

export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const { data } = await axios(url)
        const result = safeParse(ProductsSchema, data.data)
        if(result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProductById(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const { data } = await axios(url)
        const result = safeParse(ProductSchema, data.data)
        console.log(result)
        if(result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function updateProduct(data : ProductData , id: Product['id']){
    try {
        
       
        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price:  +data.price,
            availability: toBoolean(data.availability.toString())
        })
        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url, result.output)

        }else{
            throw new Error('Invalid data')
        }
       
    } catch (error) {
        console.log(error)
        
    }
}

export async function deleteProduct(id: Product['id']){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error)
        
    }
}

export async function updateProductAvailability(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log(error)
    }
}