// Repository: responsável pelo acesso e persistência dos dados no banco de dados.

import pool from '../database/pool.js';

class AlunoRepository {

    async findAll() {
        const [rows] = await pool.execute(
            'SELECT id, nome, curso_id FROM alunos ORDER BY id'
        )

        return rows;
    }

    async findById(id) {
        const [rows] = await pool.execute(
            'SELECT id, nome, curso_id FROM alunos WHERE id = ?',
            [id] 
        )

        return rows[0] ?? null // Retorna o primeiro elemento de rows. Se ele não existir, retorna null.
    }

    async create({ nome, curso_id }) {
        const [result] = await pool.execute(
            `
            INSERT INTO alunos (nome, curso_id)
            VALUES (?, ?)
            `,
            [nome, curso_id]
        )

        return {
            id: result.insertId,  // id é auto incrementado
            nome,
            curso_id
        }
    }

    async update(id, { nome, curso_id }) {
        const [result] = await pool.execute(
            `
            UPDATE alunos
            SET nome = ?, curso_id = ?
            WHERE id = ?
            `,
            [nome, curso_id, id]
        )

        if (result.affectedRows === 0) { // Se for 0 é porque o id não foi encontrado
            return null
        }

        return this.findById(id)
    }

    async delete(id) {
        const [result] = await pool.execute(
            'DELETE FROM alunos WHERE id = ?',
            [id]
        )

        return result.affectedRows > 0  // Retorna true se pelo menos um registro foi excluído; caso contrário(se o id não existir), retorna false.
    }    
}

export default new AlunoRepository()