import DatabaseService from "./database.service";
import { validateAgainstConstraints } from "../utils/validateAgainstConstraints";
import BasesModelInterface from "../models/interface/basemodel.interface";

class DynamoDbService  {
    protected databaseService: DatabaseService;
    protected model: BasesModelInterface;
    protected tableName: string; 

    public async getAll(details: any) {
        // const { 
        //     indexName, 
        //     conditionalExpersion, 
        //     expressionAttributeValues, 
        //     requestConstraints, 
        //     data 
        // } = details

        const params = {
            TableName: this.tableName,
            IndexName: 'talent_index',
            ExpressionAttributeNames: { '#name': 'name' },
            KeyConditionExpression: '#name = :name',
            ExpressionAttributeValues: { ':name': 'test' },
        };

        // console.log(params);
        // await validateAgainstConstraints(data, requestConstraints);
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

    public async create(details: any) {
        const { requestConstraints, data } = details;
        const modelData = this.model.getEntityMappings();
        console.log(this.tableName);

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
        return modelData.id;
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