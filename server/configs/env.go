package configs

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

const projectDirName = "CEN5035-SE-PARKS"

func EnvMongoURI() string {

	// projectName := regexp.MustCompile(`^(.*` + projectDirName + `)`)
	// currentWorkDirectory, _ := os.Getwd()
	// rootPath := projectName.Find([]byte(currentWorkDirectory))

	// println(rootPath)

	// err := godotenv.Load(string(rootPath) + `/.env`)
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	return os.Getenv("MONGOURI")
}
