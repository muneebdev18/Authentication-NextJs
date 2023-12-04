import nodemailer from "nodemailer";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";

export async function emailSend({ email, emialType, userId }: any) {
  try {
    // BCRYPT THE TOKEN
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    // UPDATE THE USER IN DB
    if (emialType === "VERIFY") {
      const UserUpdate_Verify = await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emialType === "FORGOTPASSWORD") {
      const UserUpdate_ForgotPassword = await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 350000,
      });
    }
    // Add this from MAILTRAP
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "muneebdev18@gmail.com",
        pass: "npac cpqx sist wbbv",
      },
    });

    // Mail Options
    // url: http://localhost:3000/verifytoken?token=asa.......

    const mailOption = {
      from: "muneebdev18@gmail.com",
      to: email,
      subject: emialType === "VERIFY" ? "Verify The Email" : "Reset Password",
      html: `<p>Click <a href=${process.env
        .DOMAIN!}/verifyemail?token=${hashedToken}>Here</a>to ${
        emialType === "VERIFY" ? "Verify the Email" : "Reset the Password"
      } or copy paste the link below in your browser.</br>${process.env
        .DOMAIN!}/verifyemail?token=${hashedToken}</p>`,
    };

    const mailResponse = await transport.sendMail(mailOption);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

connect();
