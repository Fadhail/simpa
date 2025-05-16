package router

import (
	"simpa/handler"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api")

	api.Get("/", handler.Homepage)

	// Routes untuk Pesawat
	api.Get("/planes", handler.GetAllPlanes)
	api.Get("/planes/:kodePesawat", handler.GetPlaneByCode)
	api.Post("/planes/add", handler.InsertPlane)
	api.Put("/planes/:kodePesawat", handler.UpdatePlane)
	api.Delete("/planes/delete/:kodePesawat", handler.DeletePlane)

	// Routes untuk Penumpang
	api.Get("/passengers", handler.GetAllPassenger)
	api.Get("/passengers/:nik", handler.GetPassengerByNIK)
	api.Post("/passengers/add", handler.InsertPassenger)
	api.Put("/passengers/:nik", handler.UpdatePassenger)
	api.Delete("/passengers/delete/:nik", handler.DeletePassenger)

	// Routes untuk Jadwal
	api.Get("/schedules", handler.GetAllSchedules)
	api.Get("/schedules/:id", handler.GetScheduleByKodePenerbangan)
	api.Post("/schedules/add", handler.InsertSchedule)
	api.Put("/schedules/:id", handler.UpdateSchedule)
	api.Delete("/schedules/delete/:kodePenerbangan", handler.DeleteSchedule)

	// Routes untuk Tiket
	api.Get("/tickets", handler.GetAllTickets)
	api.Get("/tickets/:id", handler.GetTicketByID)
	api.Post("/tickets/add", handler.InsertTicket)
	api.Put("/tickets/:id", handler.UpdateTicket)
	api.Delete("/tickets/delete/:id", handler.DeleteTicket)
}
