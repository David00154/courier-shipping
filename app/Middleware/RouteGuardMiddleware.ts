import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class RouteGuardMiddleware {
  public async handle(
    { auth, request, response, session }: HttpContextContract,
    next: () => Promise<void>,
    guards?: string[]
  ) {
    guards?.forEach(async (element) => {
      switch (element) {
        case "redirectIfLoggedIn":
          if (auth.isAuthenticated) {
            session.flash(
              "message",
              "You should logout if you want to login again"
            );
            return response.redirect("/admin");
          }
          break;
        case "mustBeAdmin":
          if (auth.user?.role == "USER") {
            return response.redirect("/client");
          }
          break;
        case "ensureAuthenticated":
          if (auth.isAuthenticated === false) {
            session.flash("form.login.error", "Login to view that resource");
            return response.redirect("/auth/login");
          }
          break;

        default:
          break;
      }
    });
    // code for middleware goes here. ABOVE THE NEXT CALL
    // console.log(guards);
    await next();
  }
}
