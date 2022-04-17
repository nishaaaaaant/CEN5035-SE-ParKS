package controllers

import (
	"context"
	"net/http"
	"parks/m/v2/configs"
	"parks/m/v2/models"
	"parks/m/v2/responses"
	"time"

	"github.com/go-playground/validator"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"gopkg.in/mgo.v2/bson"
	//other import goes here
)

var rentersCollection *mongo.Collection = configs.GetCollection(configs.DB, "renters")
var rentersValidate = validator.New()

// Create a new rental property for a user(renter)
func AddNewAddress(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var property models.Property
	defer cancel()

	//validate the request body
	if err := c.BodyParser(&property); err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.UserResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	//use the validator library to validate required fields
	if validationErr := rentersValidate.Struct(&property); validationErr != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.UserResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": validationErr.Error()}})
	}

	newAddress := models.Property{
		Id:     primitive.NewObjectID(),
		UserId: property.UserId,
		Features: models.Feature{
			Type: property.Features.Type,
			Properties: models.Properties{
				Address1:  property.Features.Properties.Address1,
				Address2:  property.Features.Properties.Address2,
				City:      property.Features.Properties.City,
				State:     property.Features.Properties.State,
				Zip:       property.Features.Properties.Zip,
				Mobile:    property.Features.Properties.Mobile,
				Rate:      property.Features.Properties.Rate,
				NoOfSpace: property.Features.Properties.NoOfSpace,
			},
			Geometry: models.Geometry{
				Type:        property.Features.Geometry.Type,
				Coordinates: property.Features.Geometry.Coordinates,
			},
		},
		Type: property.Type,
	}
	result, err := rentersCollection.InsertOne(ctx, newAddress)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	return c.Status(http.StatusCreated).JSON(responses.UserResponse{Status: http.StatusCreated, Message: "success", Data: &fiber.Map{"data": result}})
}

// Get all the rental property information
func GetAllAddresses(c *fiber.Ctx) error {
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
}

// Get all the rental locations for a user(renter)
func GetRenterLocations(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var location models.Location
	// var feature models.Feature
	var renterInfo []models.Property
	defer cancel()

	//validate the request body
	if err := c.BodyParser(&location); err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.UserResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	// use the validator library to validate required fields
	if validationErr := validate.Struct(&location); validationErr != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.UserResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": validationErr.Error()}})
	}

	results, err := rentersCollection.Find(ctx, bson.M{"userid": location.UserId})

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
}

// delete an existing rental property
func DeleteRenter(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	renterId := c.Params("renterId")
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
}

// edit an existing rental property
func EditRenterProperty(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	renterId := c.Params("renterId")
	var property models.Property
	defer cancel()

	objId, _ := primitive.ObjectIDFromHex(renterId)

	//validate the request body
	if err := c.BodyParser(&property); err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.UserResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}
	//use the validator library to validate required fields
	if validationErr := validate.Struct(&property); validationErr != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.UserResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": validationErr.Error()}})
	}
	update := bson.M{
		"Id":     property.Id,
		"UserId": property.UserId,
		"Features": bson.M{
			"Type": property.Features.Type,
			"Properties": bson.M{
				"Address1":  property.Features.Properties.Address1,
				"Address2":  property.Features.Properties.Address2,
				"City":      property.Features.Properties.City,
				"State":     property.Features.Properties.State,
				"Zip":       property.Features.Properties.Zip,
				"Mobile":    property.Features.Properties.Mobile,
				"Rate":      property.Features.Properties.Rate,
				"NoOfSpace": property.Features.Properties.NoOfSpace,
			},
			"Geometry": bson.M{
				"Type":        property.Features.Geometry.Type,
				"Coordinates": property.Features.Geometry.Coordinates,
			},
		},
		"Type": property.Type,
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
}

// HOLD
func GetAllCoordinates(c *fiber.Ctx) error {

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	// var location models.Location
	var renterInfo []models.Geometry
	defer cancel()

	// //validate the request body
	// if err := c.BodyParser(&location); err != nil {
	// 	return c.Status(http.StatusBadRequest).JSON(responses.UserResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	// }

	// // use the validator library to validate required fields
	// if validationErr := validate.Struct(&location); validationErr != nil {
	// 	return c.Status(http.StatusBadRequest).JSON(responses.UserResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": validationErr.Error()}})
	// }
	// opts := options.Find().SetProjection(bson.M{"longitude": 1, "latitude": 1})
	// results, err := rentersCollection.Find(ctx, bson.M{}, opts)
	results, err := rentersCollection.Find(ctx, bson.M{})
	// results, err := rentersCollection.Find(ctx, bson.M{})

	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	//reading from the db in an optimal way
	defer results.Close(ctx)
	for results.Next(ctx) {
		var renterRecord models.Geometry
		if err = results.Decode(&renterRecord); err != nil {
			return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}
		println(results.Decode(&renterRecord))
		renterInfo = append(renterInfo, renterRecord)
	}

	return c.Status(http.StatusOK).JSON(
		responses.UserResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": renterInfo}},
	)
}

// HOLD
func GetSpecificLocation(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var location models.Location
	var renterInfo []models.Property
	defer cancel()

	//validate the request body
	if err := c.BodyParser(&location); err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.UserResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	// use the validator library to validate required fields
	if validationErr := validate.Struct(&location); validationErr != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.UserResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": validationErr.Error()}})
	}

	println(location.Latitude, location.Longitude)
	results, err := rentersCollection.Find(ctx, bson.M{"latitude": location.Latitude, "longitude": location.Longitude})

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
}
