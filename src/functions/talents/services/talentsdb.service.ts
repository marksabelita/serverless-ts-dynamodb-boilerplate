import TalentsModel from "../models/talents.model";
import DatabaseService from "src/shared/services/database.service";
import DynamoDbService from "src/shared/services/dynamodb.service";
import BasesModelInterface from "src/shared/models/interface/basemodel.interface";

class TalentsDbService extends DynamoDbService {
    protected databaseService = new DatabaseService();
    protected model: BasesModelInterface = new TalentsModel({});
    protected tableName: string = process.env.TALENTS_TABLE;

    constructor() {
        super();
    }
}

export default TalentsDbService;