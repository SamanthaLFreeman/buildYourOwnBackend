# Build your Own Backend

The focus of this project was to create my own RESTful API using the data of my choice. This API is a one-to-many relationship keeping track of all of the ski resorts available in each state. The API is deployed at: https://ski-resorts-by-state.herokuapp.com/.

## Technology

- Node.js
- SQL
- Express
- Knex
- PostgreSQL

## Learning Goals

- Learn to build my own RESTful API
- An introduction to one-to-many relational database schema design
- Understand how to deploy an application with Heroku

## Schema

![image](https://user-images.githubusercontent.com/45364533/66272115-db763500-e822-11e9-92f5-72b9f5ca40c9.png)

## API - Endpoints

URL: https://ski-resorts-by-state.herokuapp.com/

| Purpose                  |           URL           |  Verb  | Request Body                                                                                         | Sample Success Response                                                                                                                                                                                                          |
| ------------------------ | :---------------------: | :----: | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Get all of the states    |    `/api/v1/states/`    |  GET   | none                                                                                                 | `{states: [array of states]}`                                                                                                                                                                                                    |
| Get a specific state     |  `/api/v1/states/:id`   |  GET   | none                                                                                                 | `{"id": 2, "name": "California", "avgSnow": "3.76 in", "created_at": "2019-10-04T15:58:12.150Z", "updated_at": "2019-10-04T15:58:12.150Z"}`                                                                                      |
| Get all of the mountains |  `/api/v1/mountains/`   |  GET   | none                                                                                                 | `{mountains: [array of mountains]}`                                                                                                                                                                                              |
| Get a specific mountain  | `/api/v1/mountains/:id` |  GET   | none                                                                                                 | `{"id": 2, "name": "Beaver Creek Resort", "mountainHeight": "\t1233 m (2255 m - 3488 m)", "size": "150 km", "skiLifts": 16, "states_id": 1, "created_at": "2019-10-04T15:58:12.219Z", "updated_at": "2019-10-04T15:58:12.219Z"}` |
| Add a new state          |    `/api/v1/states/`    |  POST  | `{"name": <String>, "avgSnow": <String>}`                                                            | `{"id": <Integer>}`                                                                                                                                                                                                              |
| Add a new mountain       |  `/api/v1/mountains/`   |  POST  | `{"name": <String>, "s": <String>, "size": <String>, "skiLifts": <Integer>, "states_id": <Integer>}` | `{"id": <Integer>}`                                                                                                                                                                                                              |
| Delete a mountain        | `/api/v1/mountains/:id` | DELETE | none                                                                                                 | `Mountain has been removed.`                                                                                                                                                                                                     |
