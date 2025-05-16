package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Passenger struct {
	ID           primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	NIK          string             `bson:"nik" json:"nik"`
	NamaLengkap  NamaLengkap        `bson:"namaLengkap" json:"namaLengkap"`
	JenisKelamin string             `bson:"jenisKelamin" json:"jenisKelamin"`
	TanggalLahir string             `bson:"tanggalLahir" json:"tanggalLahir"`
	Alamat       Alamat             `bson:"alamat" json:"alamat"`
	Email        string             `bson:"email" json:"email"`
	Telepon      string             `bson:"telepon" json:"telepon"`
}

type NamaLengkap struct {
	NamaDepan    string `bson:"namaDepan" json:"namaDepan"`
	NamaBelakang string `bson:"namaBelakang" json:"namaBelakang"`
}

type Alamat struct {
	Jalan     string `bson:"jalan" json:"jalan"`
	Kelurahan string `bson:"kelurahan" json:"kelurahan"`
	Kota      string `bson:"kota" json:"kota"`
}
