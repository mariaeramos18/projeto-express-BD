import mysql from 'mysql2/promise'

// Cria um pool de conexões com o banco de dados. O pool permite reutilizar conexões existentes em vez de criar uma nova conexão a cada consulta.

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  waitForConnections: true, // Quando todas as conexões disponíveis estiverem ocupadas, novas requisições aguardam até que uma conexão seja liberada.
  connectionLimit: 10, // Número máximo de conexões simultâneas no pool.
  queueLimit: 0 // Número máximo de requisições que podem ficar aguardando por uma conexão.
})

export default pool