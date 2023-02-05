import { prisma, PrismaSeederBase } from "@ioc:Adonis/Addons/Prisma";

export default class UserSeeder extends PrismaSeederBase {
  public static developmentOnly = true;

  public async run() {
    // Write your database queries inside the run method

    await prisma.user.createMany({
      data: [
        {
          name: "Admin",
          email: "admin@gmail.com",
          password:
            "$argon2id$v=19$t=3,m=4096,p=1$S42soQOYHdhdZWBau9Go+A$GT0yxB7jELWpJ0KACiuTUlMCu8p6wWTPr7Cjwayo8GM",
          country: "Nigeria",
          role: "ADMIN",
          phoneNumber: "08160685724",
          state: "Rivers",
        },
      ],
    });
  }
}
