import { DataSource } from 'typeorm'

export const myDataSource = new DataSource({
  type: "mysql",
  host: "mysql",
  port: 3306,
  username: "admin",
  password: "interview-assignment-password",
  database: "interview-assignment",
  entities: ["dist/server/api/entities/*.entity.js"],
  logging: true,
  synchronize: true,
})