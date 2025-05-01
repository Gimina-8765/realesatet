import asyncHandler from 'express-async-handler';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createResidency = asyncHandler(async (req, res) => { 
    const{title, description, price, address, city, country,image, 
        facilities, userEmail} = req.body.data

        console.log(req.body.data);

        try {
            const residency = await prisma.residency.create({
                data: {
                    title, 
                    description, 
                    price, 
                    address, 
                    city, 
                    country,
                    image, 
                    facilities, 
                    owner: {connect :{email: userEmail}},
                },
            }); 

            res.send({message: "residency created successfully", residency});
        } catch (error) {
            if (error.code === 'P2002') {
                throw new Error("A residency with this address already exists");
            }
            throw new Error(error.message);
            
        }
});

//fuction to get all  the documents/ residencies
export const getAllResidencies = asyncHandler(async (req, res) => {
    const residency = await prisma.residency.findMany({
        orderBy:{
            createdAt: 'desc',
        }
    });
    res.send(residency);
});


//futcion to get a specific document/ residency 
export const getResidency = asyncHandler(async (req, res) => {
    const {id} = req.params;
    try {
        const residency = await prisma.residency.findUnique({
            where: { id },
        });
        res.send(residency);
    } catch (error) {
        throw new Error (error.message);
        
    }
});
