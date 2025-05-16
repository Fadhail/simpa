package test

import (
	"fmt"
	"simpa/models"
	"simpa/repository"
	"testing"
	"time"
)

func TestInsertSchedule(t *testing.T) {

	schedule := models.Schedule{
		KodePenerbangan: "TESwww34",
		PlaneID:         "6821d18ad6c1696a89e5f42911b8f3a0",
		Asal:            "Jakarta",
		Tujuan:          "Surabaya",
		WaktuBerangkat:  time.Date(2025, time.May, 15, 8, 0, 0, 0, time.UTC),
		WaktuTiba:       time.Date(2025, time.May, 15, 9, 30, 0, 0, time.UTC),
		Status:          "Terjadwal",
		HargaTiket:      750000,
	}

	insertedID, err := repository.InsertSchedule(ctx, schedule)
	if insertedID == nil {
		//t.Error("InsertMahasiswa failed, insertedID is nil")
		fmt.Printf("Inserted failed: %v", err)
	} else {
		fmt.Printf("Inserted Schedule with ID: %v", insertedID)
	}
}
