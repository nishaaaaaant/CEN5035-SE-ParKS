package controllers

import (
	"context"
	"net/http"
	"parks/m/v2/models"
	"parks/m/v2/responses"
	"testing"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"gopkg.in/mgo.v2/bson"
)

func TestAddNewBuyerRecord(t *testing.T) {
	app := fiber.New()
	app.Post("/newbuyer", func(c *fiber.Ctx) error {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		// var buyer models.Buyer
		defer cancel()

		newBuyerRecord := models.Buyer{
			Id:        primitive.NewObjectID(),
			UserId:    "62476408bed53e0ef1f17562",
			RenterId:  "6260803456973d6792764146",
			Flag:      "pending",
			NoOfSpace: "1",
			Rate:      10,
			StartDate: time.Now(),
			StartTime: "11:00:00",
			EndTime:   "19:00:00",
			Features: models.Feature{
				Type: "Point",
				Properties: models.Properties{
					Address1:  "4000 SW 37 BLVD",
					Address2:  "1111",
					City:      "Gainesville",
					State:     "Florida",
					Zip:       32608,
					Mobile:    1111111111,
					Rate:      10,
					NoOfSpace: "1",
				},
				Geometry: models.Geometry{
					Type:        "Point",
					Coordinates: [2]float32{-11.1, 10},
				},
			},
		}

		result, err := buyerCollection.InsertOne(ctx, newBuyerRecord)
		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}
		// Code to alter the addition of new Buyer in DB
		_, err1 := buyerCollection.DeleteOne(ctx, bson.M{"id": result.InsertedID})
		if err1 != nil {
		}
		return c.Status(http.StatusCreated).JSON(responses.UserResponse{Status: http.StatusCreated, Message: "success", Data: &fiber.Map{"data": result}})

	})

	// // Add new buyer record (It can be wishlist or pending)
	// http.Request
	req, err := http.NewRequest("POST", "http://localhost:8080/newbuyer", nil)
	if err != nil {
		t.Log("Error in test case: Create Buyer Record")
		t.Fail()
	}

	// http.Response
	resp, _ := app.Test(req)

	assert.Equal(t, fiber.StatusCreated, resp.StatusCode, "Test failed: Create Buyer Record")

	if resp.StatusCode != fiber.StatusCreated {
		t.Log("Test failed: Create Buyer Record")
		t.Fail()
	} else {
		t.Log("Test Successful: Create Buyer Record")
	}

}

func TestGetAllBuyerRecord(t *testing.T) {
	app := fiber.New()
	app.Post("/buyer", func(c *fiber.Ctx) error {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		// var buyerInfo models.BuyerInfo
		var buyers []models.Buyer
		defer cancel()

		results, err := buyerCollection.Find(ctx, bson.M{"userid": "62476408bed53e0ef1f17562"})

		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}

		//reading from the db in an optimal way
		defer results.Close(ctx)
		for results.Next(ctx) {
			var buyerRecord models.Buyer
			if err = results.Decode(&buyerRecord); err != nil {
				return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
			}
			buyers = append(buyers, buyerRecord)
		}

		return c.Status(http.StatusOK).JSON(
			responses.UserResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": buyers}},
		)
	})

	// // Get all buyer records for a user
	// http.Request
	req, err := http.NewRequest("POST", "http://localhost:8080/buyer", nil)
	if err != nil {
		t.Log("Error in test case: Get all Buyer Record for a user")
		t.Fail()
	}

	// http.Response
	resp, _ := app.Test(req)

	assert.Equal(t, fiber.StatusOK, resp.StatusCode, "Test failed: Get all Buyer Record for a user")

	if resp.StatusCode != fiber.StatusOK {
		t.Log("Test failed: Get all Buyer Record for a user")
		t.Fail()
	} else {
		t.Log("Test Successful: Get all Buyer Record for a user")
	}

}
func TestGetCartRecords(t *testing.T) {
	app := fiber.New()
	app.Post("/getcartrecord", func(c *fiber.Ctx) error {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		// var buyerInfo models.BuyerInfo
		var buyers []models.Buyer
		defer cancel()

		results, err := buyerCollection.Find(ctx, bson.M{"userid": "62476408bed53e0ef1f17562", "flag": "wishlist"})

		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}

		//reading from the db in an optimal way
		defer results.Close(ctx)
		for results.Next(ctx) {
			var buyerRecord models.Buyer
			if err = results.Decode(&buyerRecord); err != nil {
				return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
			}
			buyers = append(buyers, buyerRecord)
		}

		return c.Status(http.StatusOK).JSON(
			responses.UserResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": buyers}},
		)
	})

	// // Get all buyer records for a user
	// http.Request
	req, err := http.NewRequest("POST", "http://localhost:8080/getcartrecord", nil)
	if err != nil {
		t.Log("Error in test case: Get the wishlist/cart records for a buyer")
		t.Fail()
	}

	// http.Response
	resp, _ := app.Test(req)

	assert.Equal(t, fiber.StatusOK, resp.StatusCode, "Test failed: Get the wishlist/cart records for a buyer")

	if resp.StatusCode != fiber.StatusOK {
		t.Log("Test failed: Get the wishlist/cart records for a buyer")
		t.Fail()
	} else {
		t.Log("Test Successful: Get the wishlist/cart records for a buyer")
	}

}

func TestGetCompletedBookings(t *testing.T) {
	app := fiber.New()
	app.Post("/getcompletedbookings", func(c *fiber.Ctx) error {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		// var buyerInfo models.BuyerInfo
		var buyers []models.Buyer
		defer cancel()

		filter := bson.M{
			"userid": "62476408bed53e0ef1f17562",
			"flag":   bson.M{"$ne": "wishlist"},
		}
		results, err := buyerCollection.Find(ctx, filter)

		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}

		//reading from the db in an optimal way
		defer results.Close(ctx)
		for results.Next(ctx) {
			var buyerRecord models.Buyer
			if err = results.Decode(&buyerRecord); err != nil {
				return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
			}
			buyers = append(buyers, buyerRecord)
		}

		return c.Status(http.StatusOK).JSON(
			responses.UserResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": buyers}},
		)
	})

	// // Get completed and pending buyer records for a user
	// http.Request
	req, err := http.NewRequest("POST", "http://localhost:8080/getcompletedbookings", nil)
	if err != nil {
		t.Log("Error in test case: Get the completed and pending records for a buyer")
		t.Fail()
	}

	// http.Response
	resp, _ := app.Test(req)

	assert.Equal(t, fiber.StatusOK, resp.StatusCode, "Test failed: Get the completed and pending records for a buyer")

	if resp.StatusCode != fiber.StatusOK {
		t.Log("Test failed: Get the completed and pending records for a buyer")
		t.Fail()
	} else {
		t.Log("Test Successful: Get the completed and pending records for a buyer")
	}
}

func TestGetBookedSlots(t *testing.T) {
	app := fiber.New()
	app.Post("/getbookedslots", func(c *fiber.Ctx) error {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var buyers []models.Buyer
		defer cancel()

		// renterId := "6260803456973d6792764146"
		// objId, _ := primitive.ObjectIDFromHex(renterId)
		results, err := buyerCollection.Find(ctx, bson.M{"renterid": "6260803456973d6792764146", "flag": "pending", "startdate": "2022-04-20T23:58:08.467+00:00"})

		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}

		//reading from the db in an optimal way
		defer results.Close(ctx)
		for results.Next(ctx) {
			var buyerRecord models.Buyer
			if err = results.Decode(&buyerRecord); err != nil {
				return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
			}
			buyers = append(buyers, buyerRecord)
		}

		return c.Status(http.StatusOK).JSON(
			responses.UserResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": buyers}},
		)
	})
	// // Get booked slots for a specific day and renter location
	// http.Request
	req, err := http.NewRequest("POST", "http://localhost:8080/getbookedslots", nil)
	if err != nil {
		t.Log("Error in test case: Get booked slots for a day")
		t.Fail()
	}

	// http.Response
	resp, _ := app.Test(req)

	assert.Equal(t, fiber.StatusOK, resp.StatusCode, "Test failed: Get booked slots for a day")
	if resp.StatusCode != fiber.StatusOK {
		t.Log("Test failed: Get booked slots for a day")
		t.Fail()
	} else {
		t.Log("Test Successful: Get booked slots for a day")
	}

}
