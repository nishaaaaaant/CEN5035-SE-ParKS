package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// type Property struct {
// 	Id        primitive.ObjectID `json:"id,omitempty"`
// 	UserId    string             `json:"userid,omitempty" validate:"required"`
// 	Address1  string             `json:"address1,omitempty" validate:"required"`
// 	Address2  string             `json:"address2"`
// 	City      string             `json:"city,omitempty" validate:"required"`
// 	State     string             `json:"state,omitempty" validate:"required"`
// 	Zip       int                `json:"zip,omitempty" validate:"required"`
// 	Mobile    int                `json:"mobile,omitempty" validate:"required"`
// 	Rate      int                `json:"rate,omitempty" validate:"required"`
// 	NoOfSpace string             `json:"noofspace,omitempty" validate:"required"`
// 	Feature
// 	Latitude  float32            `json:"latitude,omitempty" validate:"required"`
// 	Longitude float32            `json:"longitude,omitempty" validate:"required"`
// }

// Feature Collection
type Property struct {
	Id       primitive.ObjectID `json:"id,omitempty"`
	UserId   string             `json:"userid,omitempty" validate:"required"`
	Features Feature            `json:"features" bson:"features"`
	Type     string             `json:"type" bson:"type"`
}

// Individual Feature
type Feature struct {
	Type       string     `json:"type" bson:"type"`
	Properties Properties `json:"properties" bson:"properties"`
	Geometry   Geometry   `json:"geometry" bson:"geometry"`
}

// Feature Properties
type Properties struct {
	Address1  string `json:"address1,omitempty"`
	Address2  string `json:"address2"`
	City      string `json:"city,omitempty"`
	State     string `json:"state,omitempty"`
	Zip       int    `json:"zip,omitempty"`
	Mobile    int    `json:"mobile,omitempty"`
	Rate      int    `json:"rate,omitempty"`
	NoOfSpace string `json:"noofspace,omitempty"`
}

// Feature Geometry
type Geometry struct {
	Type        string      `json:"type" bson:"type"`
	Coordinates interface{} `json:"coordinates" bson:"coordinates"`
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
