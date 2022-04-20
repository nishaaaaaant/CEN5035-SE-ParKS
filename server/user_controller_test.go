package main

// // // import (
// // // 	"fmt"
// // // 	"io/ioutil"

// // // 	// "log"
// // // 	"net/http"
// // // 	"os"
// // // 	"testing"

// // // 	// "github.com/gofiber/fiber"

// // // 	"github.com/stretchr/testify/assert"
// // // )

// // // // type mockCollection struct {
// // // // }

// // // // func (m *mockCollection) GetAllUsers(c *fiber.Ctx) error {

// // // // }
// // // func TestGetAllUsers(t *testing.T) {
// // // 	response, err := http.Get("http://localhost:8080/users")

// // // 	if err != nil {
// // // 		fmt.Print(err.Error())
// // // 		os.Exit(1)
// // // 	}

// // // 	responseData, err := ioutil.ReadAll(response.Body)
// // // 	// if err != nil {
// // // 	// 	log.Fatal(err)
// // // 	// }

// // // 	if string(responseData) != "" {
// // // 		fmt.Println("Users present.")
// // // 	}
// // // 	assert.Nil(t, err)
// // // 	// assert.Same(t, models.User, response)
// // // }

// // // func TestCreateuser(t *testing.T) {

// // // }
// // package controllers

// import (

// 	// "parks/m/v2/configs"
// 	// "parks/m/v2/routes"
// 	"testing"

// 	"go.mongodb.org/mongo-driver/bson/primitive"
// 	"go.mongodb.org/mongo-driver/mongo/integration/mtest"

// 	// "github.com/gofiber/fiber/v2/middleware/cors"

// 	"github.com/stretchr/testify/assert"
// )

// func TestGetAllUsers(t *testing.T) {
// 	// Define a structure for specifying input and output data
// 	// of a single test case
// 	// if err := godotenv.Load("../.env"); err != nil {
// 	// 	t.Error("Error loading .env file")
// 	// }
// 	// t.Setenv("MONGOURI", "mongodb+srv://parkss:Password123@cluster0.cguk6.mongodb.net/Cluster0?retryWrites=true&w=majority")
// 	// tests := []struct {
// 	// 	description  string // description of the test case
// 	// 	route        string // route path to test
// 	// 	expectedCode int    // expected HTTP status code
// 	// }{
// 	// 	// First test case
// 	// 	{
// 	// 		description:  "get HTTP status 200",
// 	// 		route:        "/users",
// 	// 		expectedCode: 200,
// 	// 	},
// 	// 	// Second test case
// 	// 	{
// 	// 		description:  "get HTTP status 404, when route is not exists",
// 	// 		route:        "/not-found",
// 	// 		expectedCode: 404,
// 	// 	},
// 	// }
// 	// app := fiber.New()
// 	// configs.ConnectDB()

// 	// routes.UserRoute(app)

// 	// app.Listen(":8080")
// 	// // configs.ConnectDB()
// 	// // println("print")
// 	// // app.Use(cors.New(cors.Config{
// 	// // 	AllowCredentials: true,
// 	// // }))

// 	// // app.Listen(":8080")
// 	// // ctx, cancel := contxsext.WithTimeout(context.Background(), 10*time.Second)
// 	// // Create route with GET method for test
// 	// // app.Get("/users", controllers.GetAllUsers)
// 	// app.Get("/users", func(c *fiber.Ctx) error {
// 	// 	// Return simple string as response
// 	// 	// return c.SendString("Hello, World!")
// 	// 	var userCollections *mongo.Collection = configs.GetCollection(configs.DB, "users")
// 	// 	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
// 	// 	// var users []models.User
// 	// 	defer cancel()

// 	// 	_, err := userCollections.Find(ctx, bson.M{})
// 	// 	if err != nil {
// 	// 		return err
// 	// 	}

// 	// 	return c.SendStatus(200)

// 	// })

// 	// // Iterate through test single test cases
// 	// for _, test := range tests {
// 	// 	// Create a new http request with the route from the test case
// 	// 	req := httptest.NewRequest("GET", test.route, nil)

// 	// 	// Perform the request plain with the app,
// 	// 	// the second argument is a request latency
// 	// 	// (set to -1 for no latency)
// 	// 	resp, _ := app.Test(req, 1)

// 	// 	// Verify, if the status code is as expected
// 	// 	assert.Equalf(t, test.expectedCode, resp.StatusCode, test.description)
// 	// }

// 	mt := mtest.New(t, mtest.NewOptions().ClientType(mtest.Mock))
// 	defer mt.Close()

// 	mt.Run("success", func(mt *mtest.T) {
// 		userCollection = mt.Coll
// 		id1 := primitive.NewObjectID()
// 		id2 := primitive.NewObjectID()

// 		first := mtest.CreateCursorResponse(1, "users", mtest.FirstBatch, bson{"id": "suraj"})
// 		second := mtest.CreateCursorResponse(1, "users", mtest.NextBatch, nil)
// 		killCursors := mtest.CreateCursorResponse(0, "users", mtest.NextBatch)
// 		mt.AddMockResponses(first, second, killCursors)

// 		users, err := GetAllUsers("john")
// 		assert.Nil(t, err)
// 		assert.Equal(t, []user{
// 			{ID: id1, Name: "john", Email: "john.doe@test.com"},
// 			{ID: id2, Name: "john", Email: "foo.bar@test.com"},
// 		}, users)
// 	})
// }
