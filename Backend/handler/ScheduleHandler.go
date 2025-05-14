package handler

import (
	"fmt"
	"simpa/models"
	"simpa/repository"

	"github.com/gofiber/fiber/v2"
)

// Mencari Semua Data Jadwal
func GetAllSchedules(c *fiber.Ctx) error {
	data, err := repository.GetAllSchedules(c.Context())
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

// Mencari Data Jadwal berdasarkan ID
func GetScheduleByKodePenerbangan(c *fiber.Ctx) error {
	id := c.Params("id")

	schedule, err := repository.GetScheduleByKodePenerbangan(c.Context(), id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	if schedule == nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Schedule not found",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":  fiber.StatusOK,
		"message": "Data retrieved successfully",
		"data":    schedule,
	})
}

// Menambahkan Data Jadwal
func InsertSchedule(c *fiber.Ctx) error {
	var schedule models.Schedule

	if err := c.BodyParser(&schedule); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request data",
		})
	}

	insertedID, err := repository.InsertSchedule(c.Context(), schedule)
	if err != nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"error": fmt.Sprintf("Gagal menambahkan jadwal: %v", err),
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "Jadwal berhasil ditambahkan",
		"id":      insertedID,
		"status":  fiber.StatusCreated,
	})
}

// Mengedit Data Jadwal
func UpdateSchedule(c *fiber.Ctx) error {
	id := c.Params("id")
	var schedule models.Schedule

	if err := c.BodyParser(&schedule); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request data",
		})
	}

	updatedID, err := repository.UpdateSchedule(c.Context(), id, schedule)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": fmt.Sprintf("Error Update Data Jadwal %s : %v", id, err),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Data jadwal berhasil diupdate",
		"id":      updatedID,
		"status":  fiber.StatusOK,
	})
}

// Menghapus Data Jadwal
func DeleteSchedule(c *fiber.Ctx) error {
	id := c.Params("id")

	deletedScheduleID, err := repository.DeleteSchedule(c.Context(), id)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": fmt.Sprintf("Jadwal dengan ID %s tidak ditemukan: %v", id, err),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Jadwal berhasil dihapus",
		"id":      deletedScheduleID,
		"status":  fiber.StatusOK,
	})
}
