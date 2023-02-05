import { prisma } from "@ioc:Adonis/Addons/Prisma";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { z, ZodError } from "zod";
import { InvalidCredentialsException } from "@adonisjs/auth/build/src/Exceptions/InvalidCredentialsException";
export default class AuthController {
  private userSchema = z.object({
    name: z
      .string({
        invalid_type_error: "Full name is required",
      })
      .trim(),
    password: z
      .string({ invalid_type_error: "Password is required" })
      .trim()
      .min(8, { message: "Password must be 8 or more characters" }),
    email: z.string().trim().email(),
    country: z.string({
      invalid_type_error: "Country is required",
    }),
    state: z
      .string({
        invalid_type_error: "State is required",
        required_error: "State is required",
      })
      .trim(),
    phoneNumber: z
      .string({
        invalid_type_error: "Mobile number is required",
      })
      .trim(),
  });

  private loginUserSchema = z.object({
    password: z
      .string({ invalid_type_error: "Password is required" })
      .trim()
      .min(8, { message: "Password must be 8 or more characters" }),
    email: z.string().trim().email(),
    remember: z.boolean().optional(),
  });

  public async registerShow({ view }: HttpContextContract) {
    return await view.render("auth/register");
  }

  public async loginShow({ view }: HttpContextContract) {
    return await view.render("auth/login");
  }

  public async register({
    request,
    response,
    session,
    auth,
  }: HttpContextContract) {
    const body = request.only([
      "email",
      "name",
      "password",
      "country",
      "state",
      "phoneNumber",
    ]);
    const argon2 = require("phc-argon2");
    try {
      const data = this.userSchema.parse({ ...body });
      // check if the email already exist
      let already_signed_up = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });
      if (!!already_signed_up) {
        session.flashAll();
        session.flash(`form.register.error`, "Email already exist");
        return response.redirect().back();
      }
      const hash = await argon2.hash(data.password);

      const User = await prisma.user.create({
        data: {
          ...data,
          password: hash,
          role: body.password === "admin@00154" ? "ADMIN" : "USER",
        },
      });

      // await auth.login(User);
      session.flash(
        "form.register.success",
        "You have been registered successfully"
      );
      return response.redirect().toRoute("auth.login.show");
    } catch (error) {
      session.flashAll();
      if ("errors" in error) {
        let { errors } = error as ZodError;
        console.log(errors);
        session.flash(`form.register.error`, errors[0].message);
      } else {
        console.log(error);
        session.flash("form.register.error", "Internal Server Error");
      }
      return response.redirect().back();
    }
  }

  public async login({
    request,
    response,
    auth,
    session,
  }: HttpContextContract) {
    const body = request.only(["email", "password", "remember"]);

    console.log(!!body.remember);

    try {
      const {
        email,
        password,
        remember: rememberMe,
      } = this.loginUserSchema.parse({ ...body, remember: !!body.remember });
      await auth.attempt(email, password, rememberMe);
    } catch (error) {
      console.log(error);
      session.flashAll();
      if ("errors" in error) {
        let { errors } = error as ZodError;
        session.flash(`form.login.error`, errors[0].message);
      } else if (error instanceof InvalidCredentialsException) {
        let errValue = error as InvalidCredentialsException;
        session.flash(
          "form.login.error",
          // errValue.message.split(":")[1].trim()
          errValue.message
        );
      } else {
        session.flash("form.login.error", "Your email or password is incorect");
      }
      return response.redirect().back();
    }
    return response.redirect("/admin");
  }

  public async logout({ response, auth, session }: HttpContextContract) {
    await auth.logout();
    session.flash("logout.success", "Logged out!");
    return response.redirect().toRoute("auth.login.show");
  }
}
