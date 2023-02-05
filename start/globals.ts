/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import Views from "@ioc:Adonis/Core/View";
Views.global("client_nav_items", [
  {
    name: "Shipments",
    icon: "fa-box-open",
    children: [
      {
        name: "Create Shipment",
        link: "/client/shipments/create",
        icon: "fas fa-plus fa-fw",
      },
      {
        name: "All Shipments",
        link: "/client/shipments",
      },
    ],
  },
  {
    name: "Wallet",
    icon: "fa-money-check-alt",
    children: [
      {
        name: "View Wallet",
        link: "/client/wallet/",
        icon: "fas fa-plus fa-fw",
      },
      {
        name: "All Transactions",
        link: "/client/wallet/transactions",
      },
    ],
  },
  {
    name: "Track",
    link: "/client/track",
    icon: "fas fa-map-marker",
  },
  {
    name: "Reports",
    icon: "fas fa-book fa-fw",
    children: [
      {
        name: "Shipments Report",
        link: "/clien/report/shipments",
        icon: "fas fa-box-open",
      },
      {
        name: "Transactions Report",
        link: "/client/report/transactions",
        icon: "fas fa-money-check-alt",
      },
    ],
  },
  {
    name: "Address",
    icon: " fa-addres-card fa-fw",
    children: [
      {
        name: "Create Address",
        link: "/client/address/create",
        icon: "fas fa-plus fa-fw",
      },
      {
        name: "All Address",
        link: "/client/address",
        icon: "",
      },
    ],
  },
]);
