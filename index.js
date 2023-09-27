import {DynamoDBClient, GetItemCommand} from '@aws-sdk/client-dynamodb'

const ddbClient = new DynamoDBClient({region: 'ap-south-1'});

const getItem = async() => {
    const params = {
        TableName: "object-locations",
        Key: {
            objectLocationId: {S: 'c4c42c24-2251-529a-9de0-8b1fc4cc56a8'}
        }
    }

const data = await ddbClient.send(new GetItemCommand(params));
console.log(data.Item);
}

getItem();