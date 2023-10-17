import { players } from "./db/schema.js";
import * as db from "./db/migrate.js";

await db.db.insert(players).values({ name: process.argv.slice(2).join(' ') });
