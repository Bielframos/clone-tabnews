import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseName = process.env.POSTGRES_DB;
  const dbStatuResult = await database.query({
    text: `SELECT json_build_object(
      'version', current_setting('server_version'),
      'max_connections', current_setting('max_connections')::INTEGER,
      'current_connections', (SELECT COUNT(*) FROM pg_stat_activity WHERE datname = $1)
      ) AS db_status;`,
    values: [databaseName],
  });
  const dbStatus = dbStatuResult.rows[0].db_status;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        ...dbStatus,
      },
    },
  });
}

export default status;
