package controllers

import (
	"asynctest/models"
	"encoding/json"
	"net/http"
	"strconv"
	// "time"

	"asynctest/config"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func FindAll(c echo.Context) error {
	var items []models.Item
	result := config.DB.Find(&items)

	if result.Error != nil {
		return c.JSON(
			http.StatusInternalServerError,
			result.Error,
		)
	}

	return c.JSON(http.StatusOK, items)
}

func FindAllStream(c echo.Context) error {
	var items []models.Item
	result := config.DB.Find(&items)

	if result.Error != nil {
		return c.JSON(
			http.StatusInternalServerError,
			result.Error,
		)
	}

	c.Response().Header().Set(echo.HeaderContentType, "text/event-stream")
	c.Response().WriteHeader(http.StatusOK)

	for _, item := range items {
		data, err := json.Marshal(item)
		if err != nil {
			return c.JSON(
				http.StatusInternalServerError,
				err,
			)
		}

		c.Response().Write([]byte("data: " + string(data) + "\n\n"))
		c.Response().Flush()
		// time.Sleep(1 * time.Second)
	}

	return nil
}

func FindOne(c echo.Context) error {
	Id := c.Param("id")
	IdNumber, err := strconv.Atoi(Id)
	if err != nil {
		return c.JSON(
			http.StatusBadRequest,
			map[string]string{"error": "Invalid ID"},
		)
	}

	var item models.Item
	result := config.DB.First(&item, IdNumber)

	if result.Error != nil {

		if result.Error == gorm.ErrRecordNotFound {
			return c.JSON(
				http.StatusNotFound,
				map[string]string{"error": "Item not found"},
			)
		}

		return c.JSON(
			http.StatusInternalServerError,
			result.Error,
		)
	}

	return c.JSON(http.StatusOK, item)
}
