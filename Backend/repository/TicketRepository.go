package repository

import (
	"context"
	"fmt"
	"simpa/config"
	"simpa/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func InsertTicket(ctx context.Context, tkt models.Ticket) (insertedID interface{}, err error) {
	collection := config.MongoConnect(config.DBName).Collection(config.TicketCollection)

	// Cek apakah Ticket sudah ada
	filter := bson.M{"kodeTiket": tkt.KodeTiket}
	count, err := collection.CountDocuments(ctx, filter)
	if err != nil {
		fmt.Printf("Insert Ticket - Count: %v\n", err)
		return nil, err
	}
	if count > 0 {
		return nil, fmt.Errorf("tiket %v sudah terdaftar", tkt.KodeTiket)
	}

	// Insert jika TicketID belum ada
	insertResult, err := collection.InsertOne(ctx, tkt)
	if err != nil {
		fmt.Printf("Insert Ticket - Insert: %v\n", err)
		return nil, err
	}

	return insertResult.InsertedID, nil
}

func GetTicketByID(ctx context.Context, kodeTiket string) (ticket *models.Ticket, err error) {
	collection := config.MongoConnect(config.DBName).Collection(config.TicketCollection)
	filter := bson.M{"kodeTiket": kodeTiket}
	err = collection.FindOne(ctx, filter).Decode(&ticket)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		return nil, fmt.Errorf("get Ticket By ID: %v", err)
	}
	return ticket, nil
}

func GetAllTickets(ctx context.Context) ([]models.Ticket, error) {
	collection := config.MongoConnect(config.DBName).Collection(config.TicketCollection)
	filter := bson.M{}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		fmt.Println("Get All Tickets (Find):", err)
		return nil, err
	}

	var data []models.Ticket
	if err := cursor.All(ctx, &data); err != nil {
		fmt.Println("Get All Tickets (Decode):", err)
		return nil, err
	}

	return data, nil
}

func UpdateTicket(ctx context.Context, kodeTiket string, update models.Ticket) (updatedTicketID string, err error) {
	collection := config.MongoConnect(config.DBName).Collection(config.TicketCollection)

	filter := bson.M{"kodeTiket": kodeTiket}
	updateData := bson.M{"$set": update}

	result, err := collection.UpdateOne(ctx, filter, updateData)
	if err != nil {
		fmt.Printf("Update Ticket: %v\n", err)
		return "", err
	}
	if result.ModifiedCount == 0 {
		return "", fmt.Errorf("tidak ada data yang diupdate untuk Ticket %v", kodeTiket)
	}
	return kodeTiket, nil
}

func DeleteTicket(ctx context.Context, kodeTiket string) (deletedTicketID string, err error) {
	collection := config.MongoConnect(config.DBName).Collection(config.TicketCollection)

	filter := bson.M{"kodeTiket": kodeTiket}
	result, err := collection.DeleteOne(ctx, filter)
	if err != nil {
		fmt.Printf("Delete Ticket: %v\n", err)
		return "", err
	}
	if result.DeletedCount == 0 {
		return "", fmt.Errorf("tidak ada data yang dihapus untuk Ticket %v", kodeTiket)
	}
	return kodeTiket, nil
}
