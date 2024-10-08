package main

import (
	"asynctest/config"
	"asynctest/routes"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	// Inicializa o Echo
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// Conecta ao banco de dados
	config.Connect()

	// Inicializa as rotas
	routes.InitRoutes(e)

	// Inicia o servidor
	e.Logger.Fatal(e.Start(":8081"))
}