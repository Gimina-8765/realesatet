import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createUser = asyncHandler(async (req, res) => {
    console.log("Creating user...");

    let {email}= req.body;
    const userExists = await prisma.user.findUnique({ where: { email: email } });
    if (!userExists) {
        const user = await prisma.user.create({ data: req.body });
        res.send({
          message: "User registered successfully",
          user: user,
        });
      } else res.status(201).send({ message: "User already registered" });
});

// function to book a visit to resd
export const bookVisit = asyncHandler(async (req, res) => {
    const { email, date } = req.body;
    const { id } = req.params;
  
    try {
      const user = await prisma.user.findUnique({
        where: { email },
        select: { bookedVisits: true },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.bookedVisits.some((visit) => visit.id === id)) {
        return res
          .status(400)
          .json({ message: "This residency is already booked by you" });
      }

      await prisma.user.update({
        where: { email: email },
        data: {
          bookedVisits: { push: { id, date } },
        },
      });

      res.send("Your visit is booked successfully");
    } catch (err) {
      throw new Error(err.message);
    }
  });



//fuction to get all bookings of users
export const getAllBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const bookings = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });
    res.status(200).send(bookings);
  } catch (error) {
    throw new Error(error.message);
  }
})

// function to cancel the booking
export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });

    const index = user.bookedVisits.findIndex((visit) => visit.id === id);

    if (index === -1) {
      res.status(404).json({ message: "Booking not found" });
    } else {
      user.bookedVisits.splice(index, 1);
      await prisma.user.update({
        where: { email },
        data: {
          bookedVisits: user.bookedVisits,
        },
      });

      res.send("Booking cancelled successfully");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});


//function to add a residency to favorites list of users 
 export const toFav = asyncHandler(async (req, res) => {
  const {email} = req.body;
  const { rid } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (user.favResidenciesID.includes(rid)){
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: 
          { set: user.favResidenciesID.filter((id) => id !== rid) },
        },
      });

      res.send({ message: "Removed from favorites", user: updateUser });
    }else{
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: { push: rid },
        },
      });

      res.send({ message: "Added to update favorites", user: updateUser });
    }
  } catch (error) {
    throw new Error(error.message);
  }
 });

 //fuction to get all favorites
 export const getAllFavorites = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const favorites = await prisma.user.findUnique({
      where: { email },
      select: { favResidenciesID: true },
    });
    res.status(200).send(favorites);
  } catch (error) {
    throw new Error(error.message);
  }
 })
