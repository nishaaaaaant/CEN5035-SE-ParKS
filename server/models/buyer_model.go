package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	// "golang.org/x/text/date"
	"time"
)

type Buyer struct {
	Id        primitive.ObjectID `json:"id,omitempty"`
	UserId    string             `json:"userid,omitempty" validate:"required"`
	RenterId  string             `json:"renterid,omitempty" validate:"required"`
	Flag      string             `json:"flag,omitempty" validate:"required"`
	Rate      int                `json:"rate,omitempty" validate:"required"`
	NoOfSpace string             `json:"noofspace,omitempty" validate:"required"`
	StartDate time.Time          `json:"startdate"`
	EndDate   time.Time          `json:"enddate"`
	Features  Feature            `json:"features" bson:"features"`
}

type BuyerInfo struct {
	Id       primitive.ObjectID `json:"id,omitempty"`
	UserId   string             `json:"userid,omitempty" validate:"required"`
	RenterId string             `json:"renterid"`
	Flag     string             `json:"flag"`
}
