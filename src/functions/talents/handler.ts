import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';


export const getTodo = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    return formatJSONResponse({
      message: `Hello welcome to the exciting Serverless world!`,
      event,
    });
  } catch (e) {
      return formatJSONResponse({
          status: 500,
          message: e
      });
  }
})

