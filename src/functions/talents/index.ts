import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export const getTalents =  {
  handler: `${handlerPath(__dirname)}/handler.getTodo`,
  events: [
    {
      http: {
        method: 'get',
        path: 'talents',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
