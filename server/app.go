package main

import (
	"github.com/gofiber/fiber/v2"

	"parks/m/v2/configs"
	"parks/m/v2/routes"
)

func main() {
	app := fiber.New()

	//run database
	configs.ConnectDB()

	routes.UserRoute(app)

	app.Listen(":6000")
}
