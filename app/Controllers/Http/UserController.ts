import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UserController {
  public async index(ctx: HttpContextContract) {
    return await ctx.view.render("welcome");
  }
  // public async #({}: HttpContextContract){}
  public async clientIndex({ view, session }: HttpContextContract) {
    const generateCardData = async function () {
      return [
        {
          colored: true,
          title: "Total Shipments",
          icon: "cube-outline",
          body: "120",
          footer: "*Updated every shipment success",
        },
        {
          title: "Wallet Balance",
          icon: "cash-outline",
          body: "$120",
          footer: "Updated after shipments orders",
          percent: "+8.5%",
        },
        {
          title: "Delivered Shipments",
          icon: "checkbox-outline",
          body: "20",
          footer: "Updated after shipments orders",
          percent: "+8.5%",
        },
        {
          title: "Awaiting Approval",
          icon: "repeat-outline",
          body: "2",
          footer: "Updated when shipments is been processed",
        },
      ];
    };
    let cardData: any[] = [
      {
        colored: true,
        title: "Total Shipments",
        icon: "cube-outline",
        footer: "*Updated every shipment success",
      },
      {
        title: "Wallet Balance",
        icon: "cash-outline",
        footer: "Updated after shipments orders",
        percent: "0%",
      },
      {
        title: "Delivered Shipments",
        icon: "checkbox-outline",
        footer: "Updated after shipments orders",
        percent: "0%",
      },
      {
        title: "Awaiting Approval",
        icon: "repeat-outline",
        footer: "Updated when shipments is been processed",
      },
    ];
    let latestShipments: any[] = [];

    try {
      cardData = await generateCardData();
      latestShipments = [];
      return await view.render("client/index", {
        cardData,
        latestShipments,
      });
    } catch (error) {
      console.log(error);
      session.flash("message.error", "Internal Server Error");
      return await view.render("client/index", {
        cardData,
        latestShipments,
      });
    }
  }
}
