import app from './app.js'
import pool from './database/pool.js'

const port = Number(process.env.PORT) || 3000

// Função responsável por iniciar o servidor.
async function startServer() {
  try {
    await pool.query('SELECT 1') // Executa uma consulta simples para verificar se a aplicação consegue se conectar ao MySQL.

    console.log('Conexão com o MySQL estabelecida')

    app.listen(port, () => { // Inicia o servidor HTTP somente depois que a conexão com o banco de dados foi confirmada.
      console.log(`Servidor rodando em http://localhost:${port}`)
    })
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados')
    console.error(error.message)

    process.exit(1)
  }
}

startServer()