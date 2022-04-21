package routes

import (
	"parks/m/v2/controllers"

	"github.com/gofiber/fiber/v2"
)

func UserRoute(app *fiber.App) {
	app.Post("/user", controllers.CreateUser)
	app.Get("/user/:userId", controllers.GetAUser)
	app.Put("/user/:userId", controllers.EditAUser)
	app.Delete("/user/:userId", controllers.DeleteAUser)
	app.Get("/users", controllers.GetAllUsers)
	app.Post("/login", controllers.UserLogin)
	app.Post("/newaddress", controllers.AddNewAddress)
	app.Get("/alladdresses", controllers.GetAllAddresses)
	app.Post("/buyer", controllers.GetBuyerRecord)
	app.Post("/newbuyer", controllers.AddNewBuyerRecord)
	app.Post("/getspecificlocation", controllers.GetSpecificLocation)
	app.Post("/getrenterlocations", controllers.GetRenterLocations)
	app.Get("/getallcoordinates", controllers.GetAllCoordinates)
	app.Post("/getcartrecord", controllers.GetCartRecord)
	app.Post("/getcompletedbookings", controllers.GetCompletedBookings)
	app.Delete("/deleterenter/:renterId", controllers.DeleteRenter)
	app.Put("/editrenterproperty/:renterId", controllers.EditRenterProperty)
	app.Post("/getbookedslots", controllers.GetBookedSlots)
	app.Post("/getsecrectkey", controllers.GetClientSecrect)
}
