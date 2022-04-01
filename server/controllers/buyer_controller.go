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

var buyerCollection *mongo.Collection = configs.GetCollection(configs.DB, "buyer")
var renterCollection *mongo.Collection = configs.GetCollection(configs.DB, "renters")
var buyerValidate = validator.New()
var renterValidate = validator.New()

func AddNewBuyerRecord(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var buyer models.Buyer
	defer cancel()

	//validate the request body
	if err := c.BodyParser(&buyer); err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.UserResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	//use the validator library to validate required fields
	if validationErr := buyerValidate.Struct(&buyer); validationErr != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.UserResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": validationErr.Error()}})
	}

	newBuyerRecord := models.Buyer{
		Id:        primitive.NewObjectID(),
		UserId:    buyer.UserId,
		RenterId:  buyer.RenterId,
		Flag:      buyer.Flag,
		NoOfSpace: buyer.NoOfSpace,
		Rate:      buyer.Rate,
		StartDate: buyer.StartDate,
		EndDate:   buyer.EndDate,
	}

	result, err := buyerCollection.InsertOne(ctx, newBuyerRecord)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	return c.Status(http.StatusCreated).JSON(responses.UserResponse{Status: http.StatusCreated, Message: "success", Data: &fiber.Map{"data": result}})
}

func GetBuyerRecord(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var buyerInfo models.BuyerInfo
	var buyers []models.Buyer
	defer cancel()

	//validate the request body
	if err := c.BodyParser(&buyerInfo); err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.UserResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	// use the validator library to validate required fields
	if validationErr := validate.Struct(&buyerInfo); validationErr != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.UserResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": validationErr.Error()}})
	}
	// if buyerInfo.RenterId == "" {
	// 	println(buyerInfo.RenterId)
	// }
	results, err := buyerCollection.Find(ctx, bson.M{"userid": buyerInfo.UserId})

	println(results)

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
}
