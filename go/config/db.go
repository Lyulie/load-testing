package config

import (
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type DBConfig struct {
	Host     string
	User     string
	Password string
	DBName   string
	Port     int
	SSLMode  string
}

func (c DBConfig) ToString() string {
	return fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%d sslmode=%s",
		c.Host, c.User, c.Password, c.DBName, c.Port, c.SSLMode)
}

var DB *gorm.DB

func Connect() {
	dsn := DBConfig{
		Host:     "localhost",
		User:     "postgres",
		Password: "postgres",
		DBName:   "asyncTeste",
		Port:     5433,
		SSLMode:  "disable",
	}

	var err error

	DB, err = gorm.Open(
		postgres.Open(dsn.ToString()),
		&gorm.Config{},
	)

	if err != nil {
		log.Fatal("failed to connect database", err)
	}
}
