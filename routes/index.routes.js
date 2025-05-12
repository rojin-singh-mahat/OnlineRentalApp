// index.routes.js
const router = require("express").Router();
const LoginRoute = require("./login.routes");
const AdminRoute = require("./admin.routes");
const UserRoute = require("./user.routes");
const PropertyRoute = require("./property.routes");
const FavoritesRoute = require("./favorites.routes"); // Add this line

router.use("/admin", AdminRoute);
router.use("/user", UserRoute);
router.use("/auth", LoginRoute);
router.use("/property", PropertyRoute);
router.use("/favorites", FavoritesRoute); // Add this line

module.exports = router;
