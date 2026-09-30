// Service: responsável pelas regras de negócio da aplicação

import alunoRepository from "../repositories/AlunoRepository.js";
import cursoRepository from "../repositories/CursoRepository.js";

class AlunoService {

    // Regra de negócio: Aluno só pode ser cadastrado se o curso existir.
    async cadastrar({ nome, curso_id}){

        const curso = await cursoRepository.findById(curso_id)

        if (!curso) {
            throw new Error("Curso não encontrado. Não é possível cadastrar o aluno.")
        }

        const aluno = await alunoRepository.create({
            nome,
            curso_id
        })

        return aluno

    }
    
}

export default new AlunoService()