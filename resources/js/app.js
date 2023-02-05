// import "admin-lte/plugins/select2/css/select2.min.css";

// import "admin-lte/plugins/jquery/jquery.min.js";
// import "admin-lte/plugins/select2/js/select2.full.js";

// import "admin-lte/plugins/icheck-bootstrap/icheck-bootstrap.css";

// import "admin-lte/dist/css/adminlte.css";
// import "admin-lte/dist/js/adminlte.js";
import "../css/app.css";

if ("serviceWorker" in navigator) {
  // window.addEventListener("load", () => {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then((req) => {
      if (!req.active) {
        console.log("Service Worker: Registering...");
      }
    })
    .catch((err) => console.error(`Service Worker ${err}`));
  // });
}
