package main

import (
	"os"
	"parks/m/v2/configs"
	"parks/m/v2/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
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
		port = "8080"
	}

	app.Listen(":" + port)
}
