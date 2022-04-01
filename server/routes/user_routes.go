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
}
