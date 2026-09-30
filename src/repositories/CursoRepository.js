// Repository: responsável pelo acesso e persistência dos dados no banco de dados.

import pool from '../database/pool.js';

class CursoRepository {

    async findAll() {
        const [rows] = await pool.execute(
            'SELECT id, nome FROM cursos ORDER BY id'
        )

        return rows;
    }

    async findById(id) {
        const [rows] = await pool.execute(
            'SELECT id, nome FROM cursos WHERE id = ?',
            [id] 
        )

        return rows[0] ?? null // Retorna o primeiro elemento de rows. Se ele não existir, retorna null.
    }

    async create({ nome }) {
        const [result] = await pool.execute(
            `
            INSERT INTO cursos (nome)
            VALUES (?)
            `,
            [nome]
        )

        return {
            id: result.insertId,  // id é auto incrementado
            nome
        }
    }

    async update(id, { nome }) {
        const [result] = await pool.execute(
            `
            UPDATE cursos
            SET nome = ?
            WHERE id = ?
            `,
            [nome, id]
        )

        if (result.affectedRows === 0) { // Se for 0 é porque o id não foi encontrado
            return null
        }

        return this.findById(id)
    }

    async delete(id) {
        const [result] = await pool.execute(
            'DELETE FROM cursos WHERE id = ?',
            [id]
        )

        return result.affectedRows > 0  // Retorna true se pelo menos um registro foi excluído; caso contrário(se o id não existir), retorna false.
    }    
}

export default new CursoRepository()