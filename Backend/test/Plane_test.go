package test

import (
	"context"
	"fmt"
	"simpa/models"
	"simpa/repository"
	"testing"
)

var ctx = context.TODO()
func TestInsertPlane(t *testing.T) {

	plane := models.Plane{
		KodePesawat:   "GA123",
		NamaMaskapai:  "Garuda Indonesia",
		TipePesawat:   "Boeing 737",
		Kapasitas:     180,
		TahunProduksi: 2010,
		Status:        "aktif",
	}

	insertedID, err := repository.InsertPlane(ctx, plane)
	if insertedID == nil {
		//t.Error("InsertMahasiswa failed, insertedID is nil")
		fmt.Printf("Inserted failed: %v", err)
	} else {
		fmt.Printf("Inserted Plane with ID: %v", insertedID)
	}
}
