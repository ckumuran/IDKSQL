import express from "express";

import { PostgresAdapter } from "../adapters/postgres";
import { MySQLAdapter } from "../adapters/mysql";
import { SQLiteAdapter } from "../adapters/sqlite";

import { buildPrompt } from "../ai/promptBuilder";
import { generateSQL } from "../ai/ollama";

import { isDangerousQuery } from "../utils/safety";

const router = express.Router();

router.post("/", async (req, res) => {

    try {

        const {
            databaseType,
            userQuery
        } = req.body;

        let adapter: any;

        switch (databaseType) {

            case "postgres":
                adapter = new PostgresAdapter();
                break;

            case "mysql":
                adapter = new MySQLAdapter();
                break;

            case "sqlite":
                adapter = new SQLiteAdapter();
                break;

            default:
                return res.status(400).json({
                    error: "Unsupported database"
                });
        }

        await adapter.connect();

        const schema = await adapter.getSchema();

        const prompt = buildPrompt(
            userQuery,
            schema,
            databaseType
        );

        const sql = await generateSQL(prompt);

        const dangerous = isDangerousQuery(sql);

        if (dangerous) {

            return res.json({
                requiresConfirmation: true,
                sql
            });
        }

        const result = await adapter.query(sql);

        await adapter.disconnect();

        res.json({
            sql,
            result
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Internal server error"
        });
    }
});

export default router;
