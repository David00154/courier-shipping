import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class TrackController {
  public async index({ view }: HttpContextContract) {
    return await view.render("client/track");
  }

  //   public async show
}
