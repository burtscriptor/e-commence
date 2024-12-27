import express from "express";
import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js";


// Add product
const addProduct = async (request, response)=> {
    try {

        const { name, description, price, category, subCategory, sizes, bestseller } = request.body;

        const image1 = request.files.image1 && request.files.image1[0];
        const image2 = request.files.image2 && request.files.image2[0];
        const image3 = request.files.image3 && request.files.image3[0];
        const image4 = request.files.image4 && request.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item)=> item !== undefined);

        const imagesUrl = await Promise.all(
            images.map(async (item)=> {
                let result= await cloudinary.uploader.upload(item.path, {resource_type:'image'});
                return result.secure_url;
            })

    )

    const productData = {
        name, 
        description, 
        category,
        price: Number(price), 
        subCategory, 
        bestseller: bestseller === "true" ? true : false,
        sizes: JSON.parse(sizes), 
        images: imagesUrl,
        date: Date.now()
    }

    console.log(productData);

    const product = new productModel(productData); 

    await product.save();

        response.json({success: true, message: "Product Added"})
        
    } catch (error) {
        response.json({success: false, message: error.message})
        
    }
}

// List product
const listProducts = async (request, response)=> {

    try {
        const products = await productModel.find({})
            response.json({success: true, products});
        
    } catch (error) {
        response.json({success: false, message: error.message})
    }

}

// Remove product
const removeProduct = async (request, response)=> {

    try {
        console.log(request)

        await productModel.findByIdAndDelete(request.body.id);
        response.json({success: true, message: "Product Removed"})
        
    } catch (error) {
        response.json({success: false, message: error.message})
    }

}

// Single product
const singleProduct = async (request, response)=> {
    
    try {
        const { productId } = request.body;
        const product = await productModel.findById(productId);

        response.json({success: true, product});
    } catch (error) {
        response.json({success: false, message: error.message})
        
    }

}


export {
    addProduct, listProducts, removeProduct, singleProduct
};