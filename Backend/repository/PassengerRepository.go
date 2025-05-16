package repository

import (
	"context"
	"fmt"
	"simpa/config"
	"simpa/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func InsertPassenger(ctx context.Context, psg models.Passenger) (insertedID interface{}, err error) {
	collection := config.MongoConnect(config.DBName).Collection(config.PassengerCollection)

	// Cek apakah Penumpang sudah ada
	filter := bson.M{"NIK": psg.NIK}
	count, err := collection.CountDocuments(ctx, filter)
	if err != nil {
		fmt.Printf("Insert Passenger - Count: %v\n", err)
		return nil, err
	}
	if count > 0 {
		return nil, fmt.Errorf("nik %v sudah terdaftar", psg.NIK)
	}

	// Insert jika Kode Pesawat belum ada
	insertResult, err := collection.InsertOne(ctx, psg)
	if err != nil {
		fmt.Printf("Insert Passenger - Insert: %v\n", err)
		return nil, err
	}

	return insertResult.InsertedID, nil
}

func GetPassengerByNIK(ctx context.Context, NIK string) (passenger *models.Passenger, err error) {
	collection := config.MongoConnect(config.DBName).Collection(config.PassengerCollection)
	filter := bson.M{"NIK": NIK}
	err = collection.FindOne(ctx, filter).Decode(&passenger)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		return nil, fmt.Errorf("get Passenger By NIK: %v", err)
	}
	return passenger, nil
}

func GetAllPassenger(ctx context.Context) ([]models.Passenger, error) {
	collection := config.MongoConnect(config.DBName).Collection(config.PassengerCollection)
	filter := bson.M{}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		fmt.Println("Get All Passenger (Find):", err)
		return nil, err
	}

	var data []models.Passenger
	if err := cursor.All(ctx, &data); err != nil {
		fmt.Println("GetAllPlanes (Decode):", err)
		return nil, err
	}

	return data, nil
}

func UpdatePassenger(ctx context.Context, NIK string, update models.Passenger) (updatedNIK string, err error) {
	collection := config.MongoConnect(config.DBName).Collection(config.PassengerCollection)

	filter := bson.M{"NIK": NIK}
	updateData := bson.M{"$set": update}

	result, err := collection.UpdateOne(ctx, filter, updateData)
	if err != nil {
		fmt.Printf("Update Passenger: %v\n", err)
		return "", err
	}
	if result.ModifiedCount == 0 {
		return "", fmt.Errorf("tidak ada data yang diupdate untuk Passenger %v", NIK)
	}
	return NIK, nil
}

func DeletePassenger(ctx context.Context, nik string) (deletedNIK string, err error) {
	collection := config.MongoConnect(config.DBName).Collection(config.PassengerCollection)

	filter := bson.M{"nik": nik}
	result, err := collection.DeleteOne(ctx, filter)
	if err != nil {
		fmt.Printf("nik: %v\n", err)
		return "", err
	}
	if result.DeletedCount == 0 {
		return "", fmt.Errorf("tidak ada data yang dihapus untuk Passenger %v", nik)
	}
	return nik, nil
}
