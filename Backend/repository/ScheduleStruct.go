package repository

import (
	"context"
	"fmt"
	"simpa/config"
	"simpa/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func InsertSchedule(ctx context.Context, sdl models.Schedule) (insertedID interface{}, err error) {
	collection := config.MongoConnect(config.DBName).Collection(config.ScheduleCollection)

	// Cek apakah Jadwal sudah ada
	filter := bson.M{"KodePenerbangan": sdl.KodePenerbangan}
	count, err := collection.CountDocuments(ctx, filter)
	if err != nil {
		fmt.Printf("Insert Schedule - Count: %v\n", err)
		return nil, err
	}
	if count > 0 {
		return nil, fmt.Errorf("schedule %v sudah terdaftar", sdl.KodePenerbangan)
	}

	// Insert jika Kode Penerbangan belum ada
	insertResult, err := collection.InsertOne(ctx, sdl)
	if err != nil {
		fmt.Printf("Insert Schedule - Insert: %v\n", err)
		return nil, err
	}

	return insertResult.InsertedID, nil
}

func GetScheduleByKodePenerbangan(ctx context.Context, kodePenerbangan string) (schedule *models.Schedule, err error) {
	collection := config.MongoConnect(config.DBName).Collection(config.ScheduleCollection)
	filter := bson.M{"KodePenerbangan": kodePenerbangan}
	err = collection.FindOne(ctx, filter).Decode(&schedule)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		return nil, fmt.Errorf("get Schedule By KodePenerbangan: %v", err)
	}
	return schedule, nil
}

func GetAllSchedules(ctx context.Context) ([]models.Schedule, error) {
	collection := config.MongoConnect(config.DBName).Collection(config.ScheduleCollection)
	filter := bson.M{}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		fmt.Println("Get All Schedules (Find):", err)
		return nil, err
	}

	var data []models.Schedule
	if err := cursor.All(ctx, &data); err != nil {
		fmt.Println("Get All Schedules (Decode):", err)
		return nil, err
	}

	return data, nil
}

func UpdateSchedule(ctx context.Context, kodePenerbangan string, update models.Schedule) (updatedKodePenerbangan string, err error) {
	collection := config.MongoConnect(config.DBName).Collection(config.ScheduleCollection)

	filter := bson.M{"KodePenerbangan": kodePenerbangan}
	updateData := bson.M{"$set": update}

	result, err := collection.UpdateOne(ctx, filter, updateData)
	if err != nil {
		fmt.Printf("Update Schedule: %v\n", err)
		return "", err
	}
	if result.ModifiedCount == 0 {
		return "", fmt.Errorf("tidak ada data yang diupdate untuk Schedule %v", kodePenerbangan)
	}
	return kodePenerbangan, nil
}

func DeleteSchedule(ctx context.Context, kodePenerbangan string) (deletedKodePenerbangan string, err error) {
	collection := config.MongoConnect(config.DBName).Collection(config.ScheduleCollection)

	filter := bson.M{"KodePenerbangan": kodePenerbangan}
	result, err := collection.DeleteOne(ctx, filter)
	if err != nil {
		fmt.Printf("Delete Schedule: %v\n", err)
		return "", err
	}
	if result.DeletedCount == 0 {
		return "", fmt.Errorf("tidak ada data yang dihapus untuk Schedule %v", kodePenerbangan)
	}
	return kodePenerbangan, nil
}
