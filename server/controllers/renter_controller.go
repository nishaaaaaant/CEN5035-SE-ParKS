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
	"go.mongodb.org/mongo-driver/mongo/options"
	"gopkg.in/mgo.v2/bson"
	//other import goes here
)

var rentersCollection *mongo.Collection = configs.GetCollection(configs.DB, "renters")
var rentersValidate = validator.New()

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
		Id:        primitive.NewObjectID(),
		UserId:    property.UserId,
		Address1:  property.Address1,
		Address2:  property.Address2,
		City:      property.City,
		State:     property.State,
		Zip:       property.Zip,
		Mobile:    property.Mobile,
		Rate:      property.Rate,
		NoOfSpace: property.NoOfSpace,
		Latitude:  property.Latitude,
		Longitude: property.Longitude,
	}

	result, err := rentersCollection.InsertOne(ctx, newAddress)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	return c.Status(http.StatusCreated).JSON(responses.UserResponse{Status: http.StatusCreated, Message: "success", Data: &fiber.Map{"data": result}})
}

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

func GetRenterLocations(c *fiber.Ctx) error {

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

func GetAllCoordinates(c *fiber.Ctx) error {

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	// var location models.Location
	var renterInfo []models.Coordinates
	defer cancel()

	// //validate the request body
	// if err := c.BodyParser(&location); err != nil {
	// 	return c.Status(http.StatusBadRequest).JSON(responses.UserResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	// }

	// // use the validator library to validate required fields
	// if validationErr := validate.Struct(&location); validationErr != nil {
	// 	return c.Status(http.StatusBadRequest).JSON(responses.UserResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": validationErr.Error()}})
	// }
	opts := options.Find().SetProjection(bson.M{"longitude": 1, "latitude": 1})
	results, err := rentersCollection.Find(ctx, bson.M{}, opts)
	// results, err := rentersCollection.Find(ctx, bson.M{})

	println(results)

	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	//reading from the db in an optimal way
	defer results.Close(ctx)
	for results.Next(ctx) {
		var renterRecord models.Coordinates
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

// func EditARenterProperty(c *fiber.Ctx) error {
// 	//edit a user code goes here

// 	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
// 	userId := c.Params("userId")
// 	var property models.Property
// 	defer cancel()

// 	objId, _ := primitive.ObjectIDFromHex(userId)

// 	//validate the request body
// 	if err := c.BodyParser(&property); err != nil {
// 		return c.Status(http.StatusBadRequest).JSON(responses.UserResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": err.Error()}})
// 	}

// 	//use the validator library to validate required fields
// 	if validationErr := validate.Struct(&property); validationErr != nil {
// 		return c.Status(http.StatusBadRequest).JSON(responses.UserResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": validationErr.Error()}})
// 	}

// 	update := bson.M{
// 		"Id": property.Id,
// 	"Firstname": property.FirstName,
// 	"Lastname": property.LastName,
// 	"Email": property.Email,
// 	"Password": property.Password,
// 	"UserRole": property.UserRole
// }

// 	result, err := Collection.UpdateOne(ctx, bson.M{"id": objId}, bson.M{"$set": update})
// 	if err != nil {
// 		return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
// 	}

// 	//get updated user details
// 	var updatedUser models.User
// 	if result.MatchedCount == 1 {
// 		err := userCollection.FindOne(ctx, bson.M{"id": objId}).Decode(&updatedUser)
// 		if err != nil {
// 			return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
// 		}
// 	}

// 	return c.Status(http.StatusOK).JSON(responses.UserResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": updatedUser}})
// }
