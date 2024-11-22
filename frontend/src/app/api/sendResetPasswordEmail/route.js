// src/app/api/sendResetPasswordEmail/route.js
//link mật khẩu ứng dụng: https://myaccount.google.com/apppasswords
import nodemailer from 'nodemailer';

export async function POST(request) {
  const { email, newPassword } = await request.json();

  // Cấu hình transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'huynhnhi09122004@gmail.com', // Thay bằng email của bạn
      pass: 'hzmx lvbd aavz tvyl', // Thay bằng mật khẩu ứng dụng
    },
  });

  const mailOptions = {
    from: 'huynhnhi09122004@gmail.com',
    to: email,
    subject: 'Yêu cầu thay đổi mật khẩu',
    text: `Mật khẩu mới của bạn là: ${newPassword}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ message: 'Email đã được gửi thành công!' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Gửi email thất bại!' }), { status: 500 });
  }
}