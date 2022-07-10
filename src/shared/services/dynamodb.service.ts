import DatabaseService from "./database.service";
import { validateAgainstConstraints } from "../utils/validateAgainstConstraints";
import DynamoDBModel from "../models/dynamodb.model";

class DynamoDbService  {
    protected databaseService: DatabaseService;
    protected model: DynamoDBModel
    protected tableName: string; 

    public async getAll(details: any) {
        const { 
            indexName, 
            conditionalExpersion, 
            expressionAttributeValues, 
            requestConstraints, 
            data 
        } = details

        const params = {
            TableName: this.tableName,
            IndexName : indexName,
            KeyConditionExpression : conditionalExpersion,
            ExpressionAttributeValues : expressionAttributeValues
        };

        await validateAgainstConstraints(data, requestConstraints);
        return this.databaseService.query(params);
    }
    
    public async get(details: any) {
        const { requestConstraints, data } = details;
        const { id } = data;
        const item = await this.databaseService.get({Key: id, TableName: this.tableName})
        if(!item) { throw new Error(`${item} does not exist.`); }
        await validateAgainstConstraints(data, requestConstraints);
        return this.databaseService.get({Key: id, TableName: this.tableName});
    }

    public async create(data: any) {
        const { requestConstraints, details } = data;
        const modelData = this.model.getEntityMappings();
    
        const params = {
            TableName: this.tableName,
            Item: {
                id: modelData.id,
                name: modelData.name,
                createdAt: modelData.timestamp,
                updatedAt: modelData.timestamp,
            }
        }

        await validateAgainstConstraints(details, requestConstraints)

        await this.databaseService.create(params);
        return data.id;
    }

    public async update(details: any) {
        const { 
            updateExpression, 
            expressionAttributeNames, 
            expressionAttributeValues, 
            data, 
            requestConstraints 
        }: any = details;
        const {id} = data;

        await validateAgainstConstraints(data, requestConstraints);
        const item = await this.databaseService.get({Key: id, TableName: this.tableName})
        if(!item) { throw new Error(`${item} does not exist.`); }

        const params = {
            TableName: this.tableName,
            Key: {
                "id": id
            },
            UpdateExpression: updateExpression,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: "UPDATED_NEW"
        }

        return this.databaseService.update(params);
    }

    public async delete(details: any) {
        const {
            requestConstraints, 
            data
        } = details;
        const {id} = data;

        await validateAgainstConstraints(data, requestConstraints);
        const item = await this.databaseService.get({Key: id, TableName: this.tableName})
        if(!item) { throw new Error(`${item} does not exist.`); }

        const params = {
            TableName: this.tableName,
            Key: { id: id },
        }
        
        return this.databaseService.delete(params);
    }
}

export default DynamoDbService;