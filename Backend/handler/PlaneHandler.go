package handler

import (
	"fmt"
	"simpa/models"
	"simpa/repository"

	"github.com/gofiber/fiber/v2"
)

func Homepage(c *fiber.Ctx) error {
	return c.SendString("Welcome to the homepage!")
}

// Mencari Semua Data Pesawat
func GetAllPlanes(c *fiber.Ctx) error {
	data, err := repository.GetAllPlanes(c.Context())
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Internal Server Error",
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":  fiber.StatusOK,
		"message": "Data retrieved successfully",
		"data":    data,
	})
}

// Mencari Data Pesawat berdasarkan Kode
func GetPlaneByCode(c *fiber.Ctx) error {
	kodePesawat := c.Params("kodePesawat")

	plane, err := repository.GetPlaneByCode(c.Context(), kodePesawat)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	if plane == nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Plane not found",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":  fiber.StatusOK,
		"message": "Data retrieved successfully",
		"data":    plane,
	})
}

// Menambahkan Data Pesawat
func InsertPlane(c *fiber.Ctx) error {
	var plane models.Plane

	if err := c.BodyParser(&plane); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request data",
		})
	}

	insertedID, err := repository.InsertPlane(c.Context(), plane)
	if err != nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"error": fmt.Sprintf("Gagal menambahkan pesawat: %v", err),
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "Pesawat berhasil ditambahkan",
		"id":      insertedID,
		"status":  fiber.StatusCreated,
	})
}

// Mengedit Data Pesawat
func UpdatePlane(c *fiber.Ctx) error {
	kodePesawat := c.Params("kodePesawat")
	var plane models.Plane

	if err := c.BodyParser(&plane); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request data",
		})
	}

	updatedKodePesawat, err := repository.UpdatePlane(c.Context(), kodePesawat, plane)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": fmt.Sprintf("Error Update Data Pesawat %s : %v", kodePesawat, err),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":     "Data pesawat berhasil diupdate",
		"kodePesawat": updatedKodePesawat,
		"status":      fiber.StatusOK,
	})
}

// Menghapus Data Pesawat
func DeletePlane(c *fiber.Ctx) error {
	kodePesawat := c.Params("kodePesawat")

	deletedKodePesawat, err := repository.DeletePlane(c.Context(), kodePesawat)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": fmt.Sprintf("Pesawat dengan kode %s tidak ditemukan: %v", kodePesawat, err),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":     "Pesawat berhasil dihapus",
		"kodePesawat": deletedKodePesawat,
		"status":      fiber.StatusOK,
	})
}
