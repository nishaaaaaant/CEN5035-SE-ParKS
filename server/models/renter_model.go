package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

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
