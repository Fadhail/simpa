package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Schedule struct {
	ID              primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	KodePenerbangan string             `bson:"kodePenerbangan" json:"kodePenerbangan"`
	PlaneID         string             `bson:"planeId" json:"planeId"`
	Asal            string             `bson:"asal" json:"asal"`
	Tujuan          string             `bson:"tujuan" json:"tujuan"`
	WaktuBerangkat  time.Time          `bson:"waktuBerangkat" json:"waktuBerangkat"`
	WaktuTiba       time.Time          `bson:"waktuTiba" json:"waktuTiba"`
	Status          string             `bson:"status" json:"status"` // Terjadwal, Delay, Dibatalkan, Selesai
	HargaTiket      float64            `bson:"hargaTiket" json:"hargaTiket"`
}
