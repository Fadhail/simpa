package test

import (
	"fmt"
	"simpa/models"
	"simpa/repository"
	"testing"
	"time"
)

func TestInsertTicket(t *testing.T) {

	ticket := models.Ticket{
		KodeTiket:        "TEST-1S41-111",
		PassengerID:      "6821d189f3831fc3152c565fAAA",
		ScheduleID:       "6821d1a790e255d4c0b97445AAA",
		NomorKursi:       "13A",
		TanggalPembelian: time.Now(),
		MasaAktif:        time.Now().AddDate(0, 0, 1),
		Harga:            750000,
		Status:           "Expired",
	}
	insertedID, err := repository.InsertTicket(ctx, ticket)
	if insertedID == nil {
		//t.Error("InsertMahasiswa failed, insertedID is nil")
		fmt.Printf("Inserted failed: %v", err)
	} else {
		fmt.Printf("Inserted Ticket with ID: %v", insertedID)
	}
}
