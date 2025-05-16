package repository

import (
	"context"
	"fmt"
	"simpa/config"
	"simpa/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func InsertPlane(ctx context.Context, pln models.Plane) (insertedID interface{}, err error) {
	collection := config.MongoConnect(config.DBName).Collection(config.PlaneCollection)

	// Cek apakah Pesawat sudah ada
	filter := bson.M{"kodePesawat": pln.KodePesawat}
	count, err := collection.CountDocuments(ctx, filter)
	if err != nil {
		fmt.Printf("InsertPlane - Count: %v\n", err)
		return nil, err
	}
	if count > 0 {
		return nil, fmt.Errorf("kode pesawat %v sudah terdaftar", pln.KodePesawat)
	}

	// Insert jika Kode Pesawat belum ada
	insertResult, err := collection.InsertOne(ctx, pln)
	if err != nil {
		fmt.Printf("InsertPlane - Insert: %v\n", err)
		return nil, err
	}

	fmt.Printf("InsertPlane - InsertedID: %v\n", insertResult.InsertedID)

	return insertResult.InsertedID, nil
}

func GetPlaneByCode(ctx context.Context, kodePesawat string) (plane *models.Plane, err error) {
	collection := config.MongoConnect(config.DBName).Collection(config.PlaneCollection)
	filter := bson.M{"kodePesawat": kodePesawat}
	err = collection.FindOne(ctx, filter).Decode(&plane)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		return nil, fmt.Errorf("GetPlaneByCode: %v", err)
	}
	return plane, nil
}

func GetAllPlanes(ctx context.Context) ([]models.Plane, error) {
	collection := config.MongoConnect(config.DBName).Collection(config.PlaneCollection)
	filter := bson.M{}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		fmt.Println("GetAllPlanes (Find):", err)
		return nil, err
	}

	var data []models.Plane
	if err := cursor.All(ctx, &data); err != nil {
		fmt.Println("GetAllPlanes (Decode):", err)
		return nil, err
	}

	return data, nil
}

func UpdatePlane(ctx context.Context, kodePesawat string, update models.Plane) (updatedKodePesawat string, err error) {
	collection := config.MongoConnect(config.DBName).Collection(config.PlaneCollection)

	filter := bson.M{"kodePesawat": kodePesawat}
	updateData := bson.M{"$set": update}

	result, err := collection.UpdateOne(ctx, filter, updateData)
	if err != nil {
		fmt.Printf("UpdatePlane: %v\n", err)
		return "", err
	}
	if result.ModifiedCount == 0 {
		return "", fmt.Errorf("tidak ada data yang diupdate untuk kode pesawat %v", kodePesawat)
	}
	return kodePesawat, nil
}

func DeletePlane(ctx context.Context, kodePesawat string) (deletedKodePesawat string, err error) {
	collection := config.MongoConnect(config.DBName).Collection(config.PlaneCollection)

	filter := bson.M{"kodePesawat": kodePesawat}
	result, err := collection.DeleteOne(ctx, filter)
	if err != nil {
		fmt.Printf("DeletePlane: %v\n", err)
		return "", err
	}
	if result.DeletedCount == 0 {
		return "", fmt.Errorf("tidak ada data yang dihapus untuk kode pesawat %v", kodePesawat)
	}
	return kodePesawat, nil
}
