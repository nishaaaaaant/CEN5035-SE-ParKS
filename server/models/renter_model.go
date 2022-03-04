package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Property struct {
	Id        primitive.ObjectID `json:"id,omitempty"`
	UserId    string             `json:"userId,omitempty" validate:"required"`
	Address1  string             `json:"address1,omitempty" validate:"required"`
	Address2  string             `json:"address2"`
	City      string             `json:"city,omitempty" validate:"required"`
	State     string             `json:"state,omitempty" validate:"required"`
	Zip       int                `json:"zip,omitempty" validate:"required"`
	Mobile    int                `json:"mobile,omitempty" validate:"required"`
	Rate      int                `json:"rate,omitempty" validate:"required"`
	NoOfSpace string             `json:"noOfSpace,omitempty" validate:"required"`
}
