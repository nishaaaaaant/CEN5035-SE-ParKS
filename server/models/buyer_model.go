package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Feature Buyer
type Buyer struct {
	Id        primitive.ObjectID `json:"id,omitempty"`
	UserId    string             `json:"userid,omitempty" validate:"required"`
	RenterId  string             `json:"renterid,omitempty" validate:"required"`
	Flag      string             `json:"flag,omitempty" validate:"required"`
	Rate      int                `json:"rate,omitempty" validate:"required"`
	NoOfSpace string             `json:"noofspace,omitempty" validate:"required"`
	StartDate time.Time          `json:"startdate"`
	EndDate   time.Time          `json:"enddate"`
	StartTime string             `json:"starttime"`
	EndTime   string             `json:"endtime"`
	Features  Feature            `json:"features" bson:"features"`
}

// Feature BuyerInfo
type BuyerInfo struct {
	Id        primitive.ObjectID `json:"id,omitempty"`
	UserId    string             `json:"userid,omitempty"`
	RenterId  string             `json:"renterid"`
	Flag      string             `json:"flag"`
	StartDate time.Time          `json:"startdate"`
}
