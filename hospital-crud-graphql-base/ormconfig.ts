import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions"
require('dotenv').config();

const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/src/**/*.entity.{js,ts}'],
    migrations:[__dirname + '/src/migrations/*.{js,ts}'],
    cli: {
      migrationsDir: './src/migrations'
    },
}

export default config