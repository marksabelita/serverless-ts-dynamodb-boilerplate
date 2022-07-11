import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import TalentsDbService from './services/talentsdb.service';

export const getTodo = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const talentsDbService = new TalentsDbService();
    const insertResult = await talentsDbService.create({details: {
      id: 1,
      name: 'test'
    }});
    console.log(insertResult);

    const data = await talentsDbService.getAll({name: 'test'})

    console.log(data);

    return formatJSONResponse({
      message: `Hello welcome to the exciting Serverless world!`,
      event,
    });
  } catch (e) {
      console.log(e);
      return formatJSONResponse({
          status: 500,
          message: e
      });
  }
})

