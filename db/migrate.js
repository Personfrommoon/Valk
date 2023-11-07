import { MySqlDateColumnBaseBuilder } from "drizzle-orm/mysql-core/columns/date.common";
import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { createConnection } from "mysql2";

const connection = createConnection({
    host: "localhost",
    user: "root",
    password: "Passw0rd",
    database: "fcvalkdrizzle",
});

export const db = drizzle(connection);
migrate(db, { migrationsFolder: "db/migrations" }).then(process.exit);