package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	Id        primitive.ObjectID `json:"id,omitempty"`
	FirstName string             `json:"firstname,omitempty" validate:"required"`
	LastName  string             `json:"lastname,omitempty" validate:"required"`
	Email     string             `json:"email,omitempty" validate:"required"`
	Password  string             `json:"password,omitempty" validate:"required"`
	UserRole  string             `json:"userrole,omitempty" validate:"required"`
}
