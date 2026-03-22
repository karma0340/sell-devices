import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOrderConfirmation = async (email: string, order: any) => {
  const mailOptions = {
    from: `"Berlin Smart Devices" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Order Confirmation - #${order.id.slice(-6).toUpperCase()}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 12px;">
        <h1 style="color: #000; font-size: 24px;">Thank you for your order!</h1>
        <p style="color: #555; line-height: 1.6;">We have received your payment for order <strong>#${order.id.slice(-6).toUpperCase()}</strong>. We are currently preparing your items for shipping.</p>
        <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h2 style="font-size: 18px; margin-top: 0;">Order Summary</h2>
          <p style="margin: 5px 0;">Total Amount: <strong>€${order.total.toLocaleString()}</strong></p>
          <p style="margin: 5px 0;">Status: <strong>PAID</strong></p>
        </div>
        <p style="color: #888; font-size: 14px;">If you have any questions, please reply to this email or visit our support page.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="text-align: center; color: #aaa; font-size: 12px;">© 2026 Berlin Smart Devices. All rights reserved.</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Order Confirmation Sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Mail Error (Order):', error);
    return null;
  }
};

export const sendOTP = async (email: string, otp: string) => {
  const mailOptions = {
    from: `"Berlin Smart Devices" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verification OTP - Berlin Smart Devices',
    html: `
      <div style="font-family: sans-serif; text-align: center; padding: 40px; background: #f8f9fa;">
        <div style="max-width: 400px; margin: 0 auto; background: white; padding: 40px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
          <h1 style="color: #111; font-size: 20px; margin-bottom: 20px;">Verification Code</h1>
          <p style="color: #666; font-size: 14px;">Please use the following code to verify your account:</p>
          <div style="font-size: 36px; font-weight: 800; color: #000; letter-spacing: 0.2em; margin: 30px 0; padding: 20px; background: #f8f9fa; border-radius: 12px;">
            ${otp}
          </div>
          <p style="color: #aaa; font-size: 12px;">This code will expire in 10 minutes. If you did not request this, please ignore this email.</p>
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('OTP Email Sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Mail Error (OTP):', error);
    return null;
  }
};
