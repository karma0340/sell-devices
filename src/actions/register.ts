'use server';

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { sendOTP } from "@/lib/mail";

export async function register(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password || !name) {
    throw new Error("Missing required fields");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser && existingUser.password) {
      return { error: "User already exists" };
    }

    if (existingUser && !existingUser.password) {
      // User created by guest order, update them
      await prisma.user.update({
        where: { email },
        data: {
          name,
          password: hashedPassword,
          otp,
          otpExpires,
        },
      });
    } else {
      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          otp,
          otpExpires,
        },
      });
    }

    // Send the Verification Email
    await sendOTP(email, otp);

    return { success: true, email };
  } catch (error) {
    console.error('Registration/OTP Error:', error);
    return { error: "Failed to process registration" };
  }
}
