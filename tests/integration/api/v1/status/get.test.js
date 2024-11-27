test("GET to /api/vi/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  const databaseStatus = responseBody.dependencies.database;
  const {
    version,
    max_connections: maxConnections,
    current_connections: currentConnections,
  } = databaseStatus;

  expect(version).toEqual("16.0");
  expect(maxConnections).toEqual(100);
  expect(currentConnections).toEqual(1);
});
