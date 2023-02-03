import { prisma, PrismaSeederBase } from "@ioc:Adonis/Addons/Prisma";

export default class UserSeeder extends PrismaSeederBase {
  public static developmentOnly = true;

  public async run() {
    // Write your database queries inside the run method
    await prisma.user.createMany({
      data: [
        {
          name: "Phil",
          email: "phil@phil.com",
          password: "00154abs",
        },
      ],
    });
  }
}
