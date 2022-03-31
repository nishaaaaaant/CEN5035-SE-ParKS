package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	// "golang.org/x/text/date"
	"time"
)

type Buyer struct {
	Id        primitive.ObjectID `json:"id,omitempty"`
	UserId    string             `json:"userId,omitempty" validate:"required"`
	RenterId  string             `json:"renteid,omitempty" validate:"required"`
	Flag      string             `json:"flag,omitempty" validate:"required"`
	Rate      int                `json:"rate,omitempty" validate:"required"`
	NoOfSpace string             `json:"noOfSpace,omitempty" validate:"required"`
	Date      time.Time          `json:"date,omitempty" validate:"required"`
}
