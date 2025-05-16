package test

import (
	"fmt"
	"simpa/models"
	"simpa/repository"
	"testing"
)

func TestInsertPassenger(t *testing.T) {
	passenger := models.Passenger{
		NIK:          "1111111111111111",
		NamaLengkap:  models.NamaLengkap{
			NamaDepan: "Budi",
			NamaBelakang: "Santoso",
		},
		JenisKelamin: "Laki-laki",
		TanggalLahir: "1995-08-17",
		Alamat: models.Alamat{
			Jalan: "Jl. Merdeka No.10",
			Kelurahan: "Cihapit",
			Kota: "Bandung",
		},
		Email:   "budi@example.com",
		Telepon: "081234567890",
	}

	insertedID, err := repository.InsertPassenger(ctx, passenger)
	if insertedID == nil {
		//t.Error("InsertMahasiswa failed, insertedID is nil")
		fmt.Printf("Inserted failed: %v", err)
	} else {
		fmt.Printf("Inserted Plane with ID: %v", insertedID)
	}
}