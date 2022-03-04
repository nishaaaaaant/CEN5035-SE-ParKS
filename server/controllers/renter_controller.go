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
	//other import goes here
)

var renterCollection *mongo.Collection = configs.GetCollection(configs.DB, "renters")
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
	}

	result, err := renterCollection.InsertOne(ctx, newAddress)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	return c.Status(http.StatusCreated).JSON(responses.UserResponse{Status: http.StatusCreated, Message: "success", Data: &fiber.Map{"data": result}})
}