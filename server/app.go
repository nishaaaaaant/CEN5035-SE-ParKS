package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"

	"parks/m/v2/configs"
	"parks/m/v2/routes"
)

func main() {
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))

	//run database
	configs.ConnectDB()

	routes.UserRoute(app)

	app.Listen(":8080")
}
