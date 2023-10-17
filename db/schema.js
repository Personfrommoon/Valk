import { int, mysqlEnum, mysqlTable, bigint, index, varchar, primaryKey, datetime } from 'drizzle-orm/mysql-core';

// declaring enum in database
export const players = mysqlTable('players', {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    name: varchar('name', { length: 256 }),
    birthday: datetime('birthday', { length: 256 }),
    teamId: bigint('teamId', { length: 256 }).references(() => teams.id),
}, (table) => ({
    nameIndex: index('name_idx').on(table.name),
}));

export const guardians = mysqlTable('guardians', {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    name: varchar('name', { length: 256 }),
    phone: varchar('phone', { length: 256 }),
    email: varchar('email', { length: 256 }),
    notes: varchar('notes', { length: 256 }),
}, (table) => ({
    nameIndex: index('name_idx').on(table.name),
}));

export const playerGuardians = mysqlTable('playerGuardians', {
    playerId: bigint('playerId', { mode: 'number' }).references(() => players.id),
    guardianId: bigint('guardianId', { mode: 'number' }).references(() => guardians.id),
}, (table) => ({
    pk: primaryKey(table.playerId, table.guardianId),
}));

export const teams = mysqlTable('teams', {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    name: varchar('name', { length: 256 }),
});
