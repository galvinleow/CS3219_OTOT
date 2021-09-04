// All API endpoint shall be defined in this file

// Import contact controller
var contactController = require("./contact/contactController");

// Initialize express router
let router = require("express").Router();

// Set default API response
router.get("/", function (req, res) {
  res.json({
    status: "CS3219 OTOT Assignment Backend API working",
    message: "First contact with API",
  });
});

// Contact routes
router
  .route("/contacts")
  .get(contactController.index)
  .post(contactController.new);

router
  .route("/contacts/:contact_id")
  .get(contactController.view)
  .patch(contactController.update)
  .put(contactController.update)
  .delete(contactController.delete);

// Export API routes
module.exports = router;
