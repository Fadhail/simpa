package handler

import (
	"fmt"
	"simpa/models"
	"simpa/repository"

	"github.com/gofiber/fiber/v2"
)

// Mencari Semua Data Jadwal
func GetAllTickets(c *fiber.Ctx) error {
	data, err := repository.GetAllTickets(c.Context())
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
func GetTicketByID(c *fiber.Ctx) error {
	id := c.Params("id")

	schedule, err := repository.GetTicketByID(c.Context(), id)
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
func InsertTicket(c *fiber.Ctx) error {
	var ticket models.Ticket

	if err := c.BodyParser(&ticket); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request data",
		})
	}

	insertedID, err := repository.InsertTicket(c.Context(), ticket)
	if err != nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"error": fmt.Sprintf("Gagal menambahkan ticket: %v", err),
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "Ticket berhasil ditambahkan",
		"id":      insertedID,
		"status":  fiber.StatusCreated,
	})
}

// Mengedit Data Jadwal
func UpdateTicket(c *fiber.Ctx) error {
	id := c.Params("id")
	var ticket models.Ticket

	if err := c.BodyParser(&ticket); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request data",
		})
	}

	updatedID, err := repository.UpdateTicket(c.Context(), id, ticket)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": fmt.Sprintf("Error Update Data Ticket %s : %v", id, err),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Data Ticket berhasil diupdate",
		"id":      updatedID,
		"status":  fiber.StatusOK,
	})
}

// Menghapus Data Jadwal
func DeleteTicket(c *fiber.Ctx) error {
	id := c.Params("id")

	deletedTicketID, err := repository.DeleteTicket(c.Context(), id)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": fmt.Sprintf("Ticket dengan ID %s tidak ditemukan: %v", id, err),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Ticket berhasil dihapus",
		"id":      deletedTicketID,
		"status":  fiber.StatusOK,
	})
}
