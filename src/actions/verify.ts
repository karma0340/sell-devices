'use server';

import { prisma } from "@/lib/prisma";
import { sendOTP } from "@/lib/mail";

export async function verifyOTP(email: string, otp: string) {
  if (!email || !otp) {
    return { error: "Missing email or OTP" };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { error: "User not found" };
    }

    if (!user.otp || !user.otpExpires) {
      return { error: "No OTP requested for this user" };
    }

    if (user.otp !== otp) {
      return { error: "Invalid OTP" };
    }

    if (new Date() > user.otpExpires) {
      return { error: "OTP has expired" };
    }

    // Success! Mark as verified
    await prisma.user.update({
      where: { email },
      data: {
        emailVerified: new Date(),
        otp: null,
        otpExpires: null,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Verify OTP Error:', error);
    return { error: "Internal server error" };
  }
}

export async function resendOTP(email: string) {
  if (!email) return { error: "Missing email" };

  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const user = await prisma.user.update({
      where: { email },
      data: { otp, otpExpires }
    });

    if (!user) return { error: "User not found" };

    await sendOTP(email, otp);
    return { success: true };
  } catch (error) {
    console.error('Resend OTP Error:', error);
    return { error: "Failed to resend code" };
  }
}

