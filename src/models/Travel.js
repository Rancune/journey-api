import { JourneyTravel } from '../models/travel.model.js'; 



export class Travel {

    constructor(id, name, description, startDate, endDate, flightId, accomodationID, userId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.flightId = flightId;
        this.accomodationID = accomodationID;
        this.userId = userId;
    }

    static fromJson(json) {
        return new Travel(json.id, json.name, json.description, json.startDate, json.endDate, json.flightId, json.accomodationID, json.userId);
    }

    toJson() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            startDate: this.startDate,
            endDate: this.endDate,
            flightId: this.flightId,
            accomodationID: this.accomodationID,
            userId: this.userId, 
        };
    }

    static fromJsonList(jsonList) {

        return jsonList.map(Travel.fromJson);
    }

    static toJsonList(travelList) {
        return travelList.map(travel => travel.toJson());
    }

    static async getAll() {
        const db = await mongoose.connect('mongodb://localhost:27017/journey-back', { useNewUrlParser: true });
        const travel = new Travel(db);
        return await travel.getAll();
    }

    async getAll() {
        return await this.db.collection('travels').find({}).toArray();
    }

    async getById(id) {
        return await this.db.collection('travels').findOne({ _id: new mongoose.Types.ObjectId(id) });
    }

    async create(travel) {
        return await this.db.collection('travels').insertOne(travel);
    }

    async update(id, travel) {
        return await this.db.collection('travels').updateOne({ _id: new mongoose.Types.ObjectId(id) }, { $set: travel });
    }

    


}


export class TravelModel {
    constructor(db) {
        this.db = db;
    }

    async getAll() {
        return await this.db.collection('travels').find({}).toArray();
    }

    async getById(id) {
        return await this.db.collection('travels').findOne({ _id: new mongoose.Types.ObjectId(id) });
    }

    async add(travel) {
        return await this.db.collection('travels').insertOne(travel);
    }

    async update(id, travel) {
        return await this.db.collection('travels').updateOne({ _id: new mongoose.Types.ObjectId(id) }, { $set: travel });
    }

    async delete(id) {
        return await this.db.collection('travels').deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    }
}


