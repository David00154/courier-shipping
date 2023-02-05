import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class TrackController {
  public async index({
    view,
    request,
    session,
    response,
  }: HttpContextContract) {
    const { track_code } = request.only(["track_code"]);
    let trackData: any = null;
    if (track_code != undefined) {
      //   console.log(track_code);
      try {
        trackData = {};
      } catch (error) {
        console.log(error);
        session.flash("message.error", "Internal Server Error");
      }
    }
    return await view.render("client/track", {
      trackData,
    });
  }

  //   public async show
}
