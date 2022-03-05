package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"testing"
)

func TestGetAllUsers(t *testing.T) {
	response, err := http.Get("http://localhost:8080/users")

	if err != nil {
		fmt.Print(err.Error())
		os.Exit(1)
	}

	responseData, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Fatal(err)
	}

	if string(responseData) != "" {
		fmt.Println("Users present.")
	}
}
