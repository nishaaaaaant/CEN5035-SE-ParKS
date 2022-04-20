package controllers

import (
	"context"
	"io"
	"net/http"
	"parks/m/v2/models"
	"parks/m/v2/responses"
	"strings"
	"time"

	"testing"

	"github.com/gofiber/fiber/v2"
	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"gopkg.in/mgo.v2/bson"
)

func TestGetAllUsers(t *testing.T) {
	app := fiber.New()

	app.Get("/users", func(c *fiber.Ctx) error {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		_, err := userCollection.Find(ctx, bson.M{})

		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}
		return c.SendStatus(http.StatusOK)
	})

	// http.Request
	req, error := http.NewRequest("GET", "http://localhost:8080/users", nil)
	if error == nil {
		print("Error aa gaya")
	}

	// http.Response
	resp, _ := app.Test(req)

	if fiber.StatusOK != resp.StatusCode {
		t.Errorf("GetAllUsers Test failed")
	}
	assert.Equal(t, fiber.StatusOK, resp.StatusCode)
}

func TestCreateGetandDeleteUser(t *testing.T) {
	app := fiber.New()
	app.Post("/user", func(c *fiber.Ctx) error {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var user models.User
		defer cancel()

		err1 := userCollection.FindOne(ctx, bson.M{"email": "suraj@abc.com"}).Decode(&user)

		if err1 != nil {
			newUser := models.User{
				Id:        primitive.NewObjectID(),
				FirstName: "Suraj",
				LastName:  "Mishra",
				Email:     "suraj@abc.com",
				Password:  "Password123",
				UserRole:  "BUYER",
			}
			result, err := userCollection.InsertOne(ctx, newUser)

			if err != nil {
				return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
			}
			return c.Status(http.StatusCreated).JSON(responses.UserResponse{Status: http.StatusCreated, Message: "success", Data: &fiber.Map{"data": result}})

		} else {
			return c.Status(http.StatusForbidden).JSON(responses.UserResponse{Status: http.StatusForbidden, Message: "Record already exists!!", Data: &fiber.Map{"data": user}})
		}

	})

	// User registration test
	// http.Request
	req, error := http.NewRequest("POST", "http://localhost:8080/user", nil)
	if error != nil {
		print("Error in test case: User registration")
	}

	// http.Response
	resp, _ := app.Test(req)

	if resp.StatusCode != fiber.StatusCreated {
		t.Errorf("Test failed: Create User")
	}
	bodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		t.Errorf("No response in Body")
	}
	bodyString := string(bodyBytes)
	userIdValue := string(strings.Split(bodyString, "\"")[13])

	// intVar, err := strconv.Atoi(userIdValue)
	assert.Equal(t, fiber.StatusOK, resp.StatusCode, "User Registered Successfully")

	// Test for user alreday exist
	// http.Request
	req1, error1 := http.NewRequest("POST", "http://localhost:8080/user/"+userIdValue, nil)

	if error1 != nil {
		print("Error in test case: User Already exist")
	}

	// http.Response
	resp1, _ := app.Test(req1)

	if resp1.StatusCode != fiber.StatusForbidden {
		t.Errorf("Test failed - User Already exist")
	}

	assert.Equal(t, fiber.StatusForbidden, resp.StatusCode, "Test Successful - User Already Exist")

	// // Test for deleting a user record

	// app.Post("/user/:", func(c *fiber.Ctx) error {
	// // http.Request
	// req2, error2 := http.NewRequest("POST", "http://localhost:8080/user", nil)

	// if error2 != nil {
	// 	print("Error in test case: Delete user")
	// }

	// // http.Response
	// resp2, _ := app.Test(req2)

	// if resp2.StatusCode != fiber.StatusForbidden {
	// 	t.Errorf("Test failed - Delete user")
	// }

	// assert.Equal(t, fiber.StatusForbidden, resp.StatusCode, "Test Successful - Delete User")

}

func TestFalseUserLogin(t *testing.T) {
	app := fiber.New()
	app.Post("/login", func(c *fiber.Ctx) error {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		var userDetails bson.M
		err1 := userCollection.FindOne(ctx, bson.M{"email": "aakanshtogani@gmail.com", "password": "Pass"}).Decode(&userDetails)
		if err1 != nil {
			return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err1.Error()}})
		}
		return c.Status(http.StatusCreated).JSON(responses.UserResponse{Status: http.StatusCreated, Message: "success", Data: &fiber.Map{"data": userDetails}})

	})

	// http.Request
	req, error := http.NewRequest("POST", "http://localhost:8080/login", nil)
	if error != nil {
		print("Error in test case")
	}

	// http.Response
	resp, _ := app.Test(req)

	if resp.StatusCode != fiber.StatusInternalServerError {
		t.Errorf("FalseUserLogin Test failed")
	}

	assert.Equal(t, fiber.StatusInternalServerError, resp.StatusCode)
}

func TestUserLogin(t *testing.T) {
	app := fiber.New()
	app.Post("/login", func(c *fiber.Ctx) error {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		var userDetails bson.M
		err1 := userCollection.FindOne(ctx, bson.M{"email": "aakanshtogani@gmail.com", "password": "test@123"}).Decode(&userDetails)
		if err1 != nil {
			return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err1.Error()}})
		}
		return c.Status(http.StatusCreated).JSON(responses.UserResponse{Status: http.StatusCreated, Message: "success", Data: &fiber.Map{"data": userDetails}})

	})

	// http.Request
	req, error := http.NewRequest("POST", "http://localhost:8080/login", nil)
	if error != nil {
		print("Error in test case")
	}

	// http.Response
	resp, _ := app.Test(req)

	if resp.StatusCode != fiber.StatusCreated {
		t.Errorf("UserLogin Test failed")
	}

	assert.Equal(t, fiber.StatusCreated, resp.StatusCode)
}
