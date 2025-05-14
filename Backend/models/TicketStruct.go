package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Ticket struct {
	ID               primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	KodeTiket        string             `bson:"kodeTiket" json:"kodeTiket"`
	PassengerID      string             `bson:"passengerId" json:"passengerId"`
	ScheduleID       string             `bson:"scheduleId" json:"scheduleId"`
	NomorKursi       string             `bson:"nomorKursi" json:"nomorKursi"`
	TanggalPembelian time.Time          `bson:"tanggalPembelian" json:"tanggalPembelian"`
	MasaAktif        time.Time          `bson:"masaAktif" json:"masaAktif"`
	Harga            float64            `bson:"harga" json:"harga"`
	Status           string             `bson:"status" json:"status"` // aktif, digunakan, batal
}
