package handler

import (
	"fmt"
	"simpa/models"
	"simpa/repository"

	"github.com/gofiber/fiber/v2"
)

// Mencari Semua Data Penumpang
func GetAllPassenger(c *fiber.Ctx) error {
	data, err := repository.GetAllPassenger(c.Context())
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

// Mencari Data Penumpang berdasarkan ID
func GetPassengerByNIK(c *fiber.Ctx) error {
	NIK := c.Params("NIK")

	passenger, err := repository.GetPassengerByNIK(c.Context(), NIK)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	if passenger == nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Passenger not found",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":  fiber.StatusOK,
		"message": "Data retrieved successfully",
		"data":    passenger,
	})
}

// Menambahkan Data Penumpang
func InsertPassenger(c *fiber.Ctx) error {
	var passenger models.Passenger

	if err := c.BodyParser(&passenger); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request data",
		})
	}

	insertedID, err := repository.InsertPassenger(c.Context(), passenger)
	if err != nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"error": fmt.Sprintf("Gagal menambahkan penumpang: %v", err),
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "Penumpang berhasil ditambahkan",
		"id":      insertedID,
		"status":  fiber.StatusCreated,
	})
}

// Mengedit Data Penumpang
func UpdatePassenger(c *fiber.Ctx) error {
	NIK := c.Params("NIK")
	var passenger models.Passenger

	if err := c.BodyParser(&passenger); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request data",
		})
	}

	updatedNIK, err := repository.UpdatePassenger(c.Context(), NIK, passenger)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": fmt.Sprintf("Error Update Data Penumpang %s : %v", NIK, err),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Data penumpang berhasil diupdate",
		"NIK":     updatedNIK,
		"status":  fiber.StatusOK,
	})
}

// Menghapus Data Penumpang
func DeletePassenger(c *fiber.Ctx) error {
	nik := c.Params("nik")

	deletedPassengerID, err := repository.DeletePassenger(c.Context(), nik)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": fmt.Sprintf("Penumpang dengan ID %s tidak ditemukan: %v", nik, err),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Penumpang berhasil dihapus",
		"NIK":     deletedPassengerID,
		"status":  fiber.StatusOK,
	})
}
