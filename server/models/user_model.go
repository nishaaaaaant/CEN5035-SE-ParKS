package models

import "go.mongodb.org/mongo-driver/bson/primitive"

// Feature User
type User struct {
	Id        primitive.ObjectID `json:"id,omitempty"`
	FirstName string             `json:"firstname,omitempty" validate:"required"`
	LastName  string             `json:"lastname,omitempty" validate:"required"`
	Email     string             `json:"email,omitempty" validate:"required"`
	Password  string             `json:"password,omitempty" validate:"required"`
	UserRole  string             `json:"userrole,omitempty" validate:"required"`
}

// Feature Login
type Login struct {
	Id       primitive.ObjectID `json:"id,omitempty"`
	Email    string             `json:"email,omitempty" validate:"required"`
	Password string             `json:"password,omitempty" validate:"required"`
	UserRole string             `json:"userrole,omitempty" validate:"required"`
}
