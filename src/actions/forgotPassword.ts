'use server';

import { prisma } from "@/lib/prisma";
import { sendResetOTP } from "@/lib/mail";
import bcrypt from "bcryptjs";

export async function requestPasswordReset(email: string) {
  if (!email) return { error: "Email is required" };

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    
    // We don't reveal if user exists for security, but we only send if they do
    if (user) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

      await prisma.user.update({
        where: { email },
        data: { otp, otpExpires }
      });

      await sendResetOTP(email, otp);
    }

    return { success: true };
  } catch (error) {
    console.error('Password Reset Request Error:', error);
    return { error: "Failed to process request" };
  }
}

export async function resetPassword(email: string, otp: string, newPassword: string) {
  if (!email || !otp || !newPassword) return { error: "All fields are required" };

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || user.otp !== otp || !user.otpExpires || new Date() > user.otpExpires) {
      return { error: "Invalid or expired secure code" };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        otp: null,
        otpExpires: null
      }
    });

    return { success: true };
  } catch (error) {
    console.error('Password Reset Error:', error);
    return { error: "Failed to update password" };
  }
}
