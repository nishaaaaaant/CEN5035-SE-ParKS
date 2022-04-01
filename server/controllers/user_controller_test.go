package controllers

import (
	// "net/http"
	// "net/http/httptest"
	"log"
	"testing"

	// "github.com/stretchr/testify/assert"
	// "github.com/stretchr/testify/require"
	"context"
	// "net/http"
	// "parks/m/v2/configs"
	// "parks/m/v2/models"
	// "parks/m/v2/responses"
	"time"

	// "github.com/go-playground/validator"
	// "github.com/gofiber/fiber/v2"
	// "go.mongodb.org/mongo-driver/bson/primitive"
	// "go.mongodb.org/mongo-driver/mongo"

	"gopkg.in/mgo.v2/bson"
)

// type mockCollection struct {}

// func(m *mockCollection)CreateUser(c *fiber.Ctx) error{
// c := &mongo.GetAllUsers{}

// }

func TestGetAllUsers(t *testing.T) {
	// ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	// var users []models.User
	// defer cancel()
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	// var users []models.User
	defer cancel()

	_, err := userCollection.Find(ctx, bson.D{})
	if err != nil {
		log.Fatal(err)
	}
	// return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
}
