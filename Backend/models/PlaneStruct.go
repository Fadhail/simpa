package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Plane struct {
	ID            primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	KodePesawat   string             `bson:"kodePesawat" json:"kodePesawat"`
	NamaMaskapai  string             `bson:"namaMaskapai" json:"namaMaskapai"`
	TipePesawat   string             `bson:"tipePesawat" json:"tipePesawat"`
	Kapasitas     int                `bson:"kapasitas" json:"kapasitas"`
	TahunProduksi int                `bson:"tahunProduksi" json:"tahunProduksi"`
	Status        string             `bson:"status" json:"status"` // Aktif, Perawatan, Nonaktif
}
