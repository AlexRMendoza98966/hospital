import pool from './lib/db';

async function checkTable() {
    try {
        const result = await pool.query("SELECT to_regclass('public.departamentos')");
        console.log(result.rows[0]);
    } catch (error) {
        console.error(error);
    } finally {
        process.exit();
    }
}

checkTable();
