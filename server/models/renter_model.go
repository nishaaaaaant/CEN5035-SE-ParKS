package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Property struct {
	Id        primitive.ObjectID `json:"id,omitempty"`
	UserId    string             `json:"userid,omitempty" validate:"required"`
	Address1  string             `json:"address1,omitempty" validate:"required"`
	Address2  string             `json:"address2"`
	City      string             `json:"city,omitempty" validate:"required"`
	State     string             `json:"state,omitempty" validate:"required"`
	Zip       int                `json:"zip,omitempty" validate:"required"`
	Mobile    int                `json:"mobile,omitempty" validate:"required"`
	Rate      int                `json:"rate,omitempty" validate:"required"`
	NoOfSpace string             `json:"noofspace,omitempty" validate:"required"`
	Latitude  float32            `json:"latitude,omitempty" validate:"required"`
	Longitude float32            `json:"longitude,omitempty" validate:"required"`
}

type Location struct {
	Id        primitive.ObjectID `json:"id,omitempty"`
	UserId    string             `json:"userid"`
	Latitude  float32            `json:"latitude"`
	Longitude float32            `json:"longitude"`
	StartDate time.Time          `json:"startdate"`
}

type Coordinates struct {
	Id        primitive.ObjectID `json:"id,omitempty"`
	Latitude  float32            `json:"latitude"`
	Longitude float32            `json:"longitude"`
}
