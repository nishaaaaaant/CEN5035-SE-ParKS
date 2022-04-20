package main

import (
	"os"

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
	port := os.Getenv("PORT")

	if port == "" {
		port = "8080" // Default port if not specified
	}

	app.Listen(":" + port)
}
