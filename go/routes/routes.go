package routes

import (
	"asynctest/controllers"

	"github.com/labstack/echo/v4"
)

func InitRoutes(e *echo.Echo) {
	e.GET("/items", controllers.FindAll)
	e.GET("/itemsr", controllers.FindAllStream)
	e.GET("/items/:id", controllers.FindOne)
}
