const sql = require('mssql');

// Database configuration
const dbConfig = {
  user: 'sa',
  password: 'password123@###',
  server: 'localhost',
  database: 'CTradeChatbot',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
  port: 1433,
};

let pool;

/**
 * Gets or creates a database connection pool
 * @returns {Promise<sql.ConnectionPool>} The database connection pool
 */
async function getConnection() {
  if (!pool) {
    pool = new sql.ConnectionPool(dbConfig);
    await pool.connect();
  }
  return pool;
}

/**
 * Fetches training data from the database and returns it as JSON
 * @returns {Promise<Array<{input: string, output: string}>>} The training data
 */
async function fetchTrainingData() {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query('SELECT InputData, OutputData FROM TrainingData');

    return result.recordset.map((record) => ({
      input: record.InputData.trim(),
      output: record.OutputData.trim(),
    }));
  } catch (err) {
    console.error('Database query failed:', err);
    throw new Error('Failed to fetch training data');
  }
}

// Example usage:
// fetchTrainingData()
//   .then(data => console.log(data))
//   .catch(err => console.error(err));

module.exports = fetchTrainingData;