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
	if error != nil {
		t.Log("Error in test case: Get all registered users")
		t.Fail()
	}

	// http.Response
	resp, _ := app.Test(req)

	if fiber.StatusOK != resp.StatusCode {
		t.Log("Test failed: Get all registered users")
		t.Fail()
	}
	assert.Equal(t, fiber.StatusOK, resp.StatusCode, "Test successful: Get all registered users")
	t.Log("Test successful: Get all registered users")
}

func TestCreateGetEditDeleteUser(t *testing.T) {
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

	// // User registration test
	// http.Request
	req, err := http.NewRequest("POST", "http://localhost:8080/user", nil)
	if err != nil {
		t.Log("Error in test case: Create User")
		t.Fail()
	}

	// http.Response
	resp, _ := app.Test(req)

	if resp.StatusCode != fiber.StatusCreated {
		t.Log("Test failed: Create User")
		t.Fail()
	}
	bodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		t.Log("No response in Body")
		t.Fail()
	}
	bodyString := string(bodyBytes)
	userIdValue := string(strings.Split(bodyString, "\"")[13])

	// intVar, err := strconv.Atoi(userIdValue)
	assert.Equal(t, fiber.StatusCreated, resp.StatusCode, "Test Successful: Create User")
	t.Log("Test Successful: Create User")

	// // Test for user alreday exist
	// http.Request
	req1, error1 := http.NewRequest("POST", "http://localhost:8080/user", nil)

	if error1 != nil {
		t.Log("Error in test case: User Already Exist so no record creation")
		t.Fail()
	}

	// http.Response
	resp1, _ := app.Test(req1)

	if resp1.StatusCode != fiber.StatusForbidden {
		t.Log("Test failed: User Already Exist so no record creation")
		t.Fail()
	}
	assert.Equal(t, fiber.StatusForbidden, resp1.StatusCode, "Test Successful: User Already Exist so no record creation")
	t.Log("Test Successful: User Already Exist so no record creation")

	// // Test for reading a user record
	app.Get("/user/"+userIdValue, func(c *fiber.Ctx) error {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var user models.User
		defer cancel()

		err := userCollection.FindOne(ctx, bson.M{"email": "suraj@abc.com"}).Decode(&user)
		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}

		return c.Status(http.StatusOK).JSON(responses.UserResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": user}})
	})

	// http.Request
	reqGet, errorGet := http.NewRequest("GET", "http://localhost:8080/user/"+userIdValue, nil)

	if errorGet != nil {
		t.Log("Error in test case: Get a user record")
		t.Fail()
	}

	// http.Response
	respGet, _ := app.Test(reqGet)

	if respGet.StatusCode != fiber.StatusOK {
		t.Log("Test failed: Get a user record")
		t.Fail()
	}

	assert.Equal(t, fiber.StatusOK, respGet.StatusCode, "Test Successful: Get a user record")
	t.Log("Test Successful: Get a user record")

	// //Test for editing a user record
	app.Put("/user/"+userIdValue, func(c *fiber.Ctx) error {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		// var user models.User
		defer cancel()

		update := bson.M{"Firstname": "Sraj"}

		result, err := userCollection.UpdateOne(ctx, bson.M{"email": "suraj@abc.com"}, bson.M{"$set": update})
		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}

		//get updated user details
		var updatedUser models.User
		if result.MatchedCount == 1 {
			err := userCollection.FindOne(ctx, bson.M{"email": "suraj@abc.com"}).Decode(&updatedUser)
			if err != nil {
				return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
			}
		}
		return c.Status(http.StatusOK).JSON(responses.UserResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": updatedUser}})

	})
	// http.Request
	reqEdit, errorEdit := http.NewRequest("PUT", "http://localhost:8080/user/"+userIdValue, nil)

	if errorEdit != nil {
		t.Log("Error in test case: Edit user record")
		t.Fail()
	}

	// http.Response
	respEdit, _ := app.Test(reqEdit)

	if respEdit.StatusCode != fiber.StatusOK {
		t.Log("Test failed: Edit user record")
		t.Fail()
	}

	assert.Equal(t, fiber.StatusOK, respEdit.StatusCode, "Test Successful: Edit user record")
	t.Log("Test Successful: Edit user record")

	// // Test for deleting a user record
	app.Delete("/user/"+userIdValue, func(c *fiber.Ctx) error {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		// var user models.User
		defer cancel()

		result, err := userCollection.DeleteOne(ctx, bson.M{"email": "suraj@abc.com"})
		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}

		if result.DeletedCount < 1 {
			return c.Status(http.StatusNotFound).JSON(
				responses.UserResponse{Status: http.StatusNotFound, Message: "error", Data: &fiber.Map{"data": "User with specified ID not found!"}},
			)
		}

		return c.Status(http.StatusOK).JSON(
			responses.UserResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": "User successfully deleted!"}},
		)
	})
	// http.Request
	reqDel, errorDel := http.NewRequest("DELETE", "http://localhost:8080/user/"+userIdValue, nil)

	if errorDel != nil {
		t.Log("Error in test case: Delete user record")
		t.Fail()
	}

	// http.Response
	respDel, _ := app.Test(reqDel)

	if respDel.StatusCode != fiber.StatusOK {
		t.Log("Test failed: Delete user record")
		t.Fail()
	}

	assert.Equal(t, fiber.StatusOK, respDel.StatusCode, "Test Successful: Delete user record")
	t.Log("Test Successful: Delete user record")

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
		t.Log("Error in test case: Detect False user login")
		t.Fail()
	}

	// http.Response
	resp, _ := app.Test(req)

	if resp.StatusCode != fiber.StatusInternalServerError {
		t.Log("Test failed: Detect False user login")
		t.Fail()
	}

	assert.Equal(t, fiber.StatusInternalServerError, resp.StatusCode, "Test Successful: Detect False user login")
	t.Log("Test Successful: Detect False user login")
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
		t.Log("Error in test case: User login")
		t.Fail()
	}

	// http.Response
	resp, _ := app.Test(req)

	if resp.StatusCode != fiber.StatusCreated {
		t.Log("Test failed: User login")
		t.Fail()
	}

	assert.Equal(t, fiber.StatusCreated, resp.StatusCode, "Test Successful: User login")
	t.Log("Test Successful: User login")
}
