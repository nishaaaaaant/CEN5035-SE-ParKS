package controllers

import (
	"context"
	"io"
	"net/http"
	"parks/m/v2/models"
	"parks/m/v2/responses"
	"strings"
	"testing"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"gopkg.in/mgo.v2/bson"
)

func TestAddNewAddressAndEditAndDelete(t *testing.T) {
	app := fiber.New()
	app.Post("/newaddress", func(c *fiber.Ctx) error {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		newAddress := models.Property{
			Id:     primitive.NewObjectID(),
			UserId: "62476408bed53e0ef1f17562",
			Features: models.Feature{
				Type: "Point",
				Properties: models.Properties{
					Address1:  "4000 SW 37 BLVD",
					Address2:  "2222",
					City:      "Gainesville",
					State:     "Florida",
					Zip:       32608,
					Mobile:    9999999999,
					Rate:      10,
					NoOfSpace: "2",
				},
				Geometry: models.Geometry{
					Type:        "Point",
					Coordinates: [2]float32{-0.11, 11},
				},
			},
			Type: "First",
		}
		_, err := rentersCollection.InsertOne(ctx, newAddress)

		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}
		return c.Status(http.StatusCreated).JSON(responses.UserResponse{Status: http.StatusCreated, Message: "success", Data: &fiber.Map{"data": newAddress}})
	})

	// // Add new address for a renter
	// http.Request
	req, err := http.NewRequest("POST", "http://localhost:8080/newaddress", nil)
	if err != nil {
		t.Log("Error in test case: Create Renter Property")
	}

	// http.Response
	resp, _ := app.Test(req)

	bodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		t.Log("No response in Body")
		t.Fail()
	}
	bodyString := string(bodyBytes)
	userIdValue := string(strings.Split(bodyString, "\"")[13])

	// intVar, err := strconv.Atoi(userIdValue)
	assert.Equal(t, fiber.StatusCreated, resp.StatusCode, "Test failed: Create Renter Property")

	if resp.StatusCode != fiber.StatusCreated {
		t.Log("Test failed: Create Renter Property")
		t.Fail()
	} else {
		t.Log("Test Successful: Create Renter Property")
	}

	// // Test Edit Rental Property for a user
	app.Put("/editrenterproperty/"+userIdValue, func(c *fiber.Ctx) error {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		renterId := userIdValue
		defer cancel()

		objId, _ := primitive.ObjectIDFromHex(renterId)

		update := bson.M{
			"features": bson.M{
				"type": "Straight",
				"properties": bson.M{
					"address1": "4000 SW 37 BLVD",
					"address2": "1111",
				},
				"geometry": bson.M{
					"type": "Polygon",
				},
			},
		}
		result, err := rentersCollection.UpdateOne(ctx, bson.M{"id": objId}, bson.M{"$set": update})
		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}
		//get updated rental property details
		var updatedRenter models.Property
		if result.MatchedCount == 1 {
			err := rentersCollection.FindOne(ctx, bson.M{"id": objId}).Decode(&updatedRenter)
			if err != nil {
				return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
			}
		}
		return c.Status(http.StatusOK).JSON(responses.UserResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": updatedRenter}})

	})

	// http.Request
	reqEdit, errEdit := http.NewRequest("PUT", "http://localhost:8080/editrenterproperty/"+userIdValue, nil)
	if errEdit != nil {
		t.Log("Error in test case: Edit Renter Property")
		t.Fail()
	}

	// http.Response
	respEdit, _ := app.Test(reqEdit)

	assert.Equal(t, fiber.StatusOK, respEdit.StatusCode, "Test failed: Edit Renter Property")

	if respEdit.StatusCode != fiber.StatusOK {
		t.Log("Test failed: Edit Renter Property")
		t.Fail()
	} else {
		t.Log("Test Successful: Edit Renter Property")
	}
	// // Test Delete Rental Property for a user
	app.Delete("/deleterenter/"+userIdValue, func(c *fiber.Ctx) error {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		renterId := userIdValue
		defer cancel()

		objId, _ := primitive.ObjectIDFromHex(renterId)

		result, err := rentersCollection.DeleteOne(ctx, bson.M{"id": objId})
		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}

		if result.DeletedCount < 1 {
			return c.Status(http.StatusNotFound).JSON(
				responses.UserResponse{Status: http.StatusNotFound, Message: "error", Data: &fiber.Map{"data": "Renter property with specified ID not found!"}},
			)
		}

		return c.Status(http.StatusOK).JSON(
			responses.UserResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": "Renter property successfully deleted!"}},
		)
	})

	// http.Request
	reqDel, errDel := http.NewRequest("DELETE", "http://localhost:8080/deleterenter/"+userIdValue, nil)
	if errDel != nil {
		t.Log("Error in test case: Delete Renter Property")
		t.Fail()
	}

	// http.Response
	respDel, _ := app.Test(reqDel)

	assert.Equal(t, fiber.StatusOK, respDel.StatusCode, "Test failed: Delete Renter Property")

	if respDel.StatusCode != fiber.StatusOK {
		t.Log("Test failed: Delete Renter Property")
		t.Fail()
	} else {
		t.Log("Test Successful: Delete Renter Property")
	}
}

func TestGetAllAddresses(t *testing.T) {
	app := fiber.New()
	app.Get("/alladdresses", func(c *fiber.Ctx) error {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var properties []models.Property
		defer cancel()

		results, err := rentersCollection.Find(ctx, bson.M{})

		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}

		//reading from the db in an optimal way
		defer results.Close(ctx)
		for results.Next(ctx) {
			var address models.Property
			if err = results.Decode(&address); err != nil {
				return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
			}

			properties = append(properties, address)
		}

		return c.Status(http.StatusOK).JSON(
			responses.UserResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": properties}},
		)
	})

	// // Get all register addresses
	// http.Request
	req, err := http.NewRequest("GET", "http://localhost:8080/alladdresses", nil)
	if err != nil {
		t.Log("Error in test case: Get all Renter Property")
		t.Fail()
	}

	// http.Response
	resp, _ := app.Test(req)

	assert.Equal(t, fiber.StatusOK, resp.StatusCode, "Test failed: Get all Renter Property")

	if resp.StatusCode != fiber.StatusOK {
		t.Log("Test failed: Get all Renter Property")
		t.Fail()
	} else {
		t.Log("Test Successful: Get all Renter Property")
	}
}

func TestGetRenterLocations(t *testing.T) {
	app := fiber.New()
	app.Post("/getrenterlocations", func(c *fiber.Ctx) error {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		// var location models.Location
		// var feature models.Feature
		var renterInfo []models.Property
		defer cancel()

		results, err := rentersCollection.Find(ctx, bson.M{"userid": "62476408bed53e0ef1f17562"})

		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}

		//reading from the db in an optimal way
		defer results.Close(ctx)
		for results.Next(ctx) {
			var renterRecord models.Property
			if err = results.Decode(&renterRecord); err != nil {
				return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
			}
			renterInfo = append(renterInfo, renterRecord)
		}

		return c.Status(http.StatusOK).JSON(
			responses.UserResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": renterInfo}},
		)
	})

	// // Get all Renter Property addresses and information registered by a user
	// http.Request
	req, err := http.NewRequest("POST", "http://localhost:8080/getrenterlocations", nil)
	if err != nil {
		t.Log("Error in test case: Get Renter Property registered by a user")
		t.Fail()
	}

	// http.Response
	resp, _ := app.Test(req)

	assert.Equal(t, fiber.StatusOK, resp.StatusCode, "Test failed: Get Renter Property registered by a user")

	if resp.StatusCode != fiber.StatusOK {
		t.Log("Test failed: Get Renter Property registered by a user")
		t.Fail()
	} else {
		t.Log("Test Successful: Get Renter Property registered by a user")
	}
}
