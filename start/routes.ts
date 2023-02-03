/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from "@ioc:Adonis/Core/Route";
import axios from "axios";

Route.on("/").redirect("/admin");

// Admin route group
Route.group(() => {
  Route.get("/", "UserController.index");
}).prefix("admin");

// User route group
Route.group(() => {}).prefix("client");

Route.group(() => {
  Route.get("/login", "AuthController.loginShow").as("auth.login.show");
  Route.get("/register", "AuthController.registerShow").as(
    "auth.register.show"
  );
  Route.get("/logout", "AuthController.logout").as("auth.logout");
  Route.post("/register", "AuthController.register").as("auth.register");
  Route.post("/login", "AuthController.login").as("auth.login");
  Route.get("/state/:name", async ({ response, request }) => {
    let name = request.param("name");
    let { data } = await axios.get(
      "https://raw.githubusercontent.com/David00154/countries-states-cities-database/master/countries%2Bstates.json"
    );
    const parseURL = (value) => {
      return decodeURIComponent(decodeURIComponent(encodeURIComponent(value)));
    };
    let result = data.filter((x) => x.name === parseURL(name));

    return response.json(result);
  });
  Route.get("/get-countries", async ({ response }) => {
    let { data } = await axios.get(
      "https://raw.githubusercontent.com/David00154/countries-states-cities-database/master/countries.json"
    );
    let result = data;

    return response.json(result);
  });
}).prefix("auth");
