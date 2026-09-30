// Controller: responsável por lidar com a requisição HTTP e definir a resposta ao cliente.

import alunoRepository from "../repositories/AlunoRepository.js";
import alunoService from "../services/AlunoService.js";

class AlunoController {

    async index(req, res) {
        const alunos = await alunoRepository.findAll()

        return res.status(200).json(alunos) // 200(OK): Requisição bem sucedida
    }

    async show(req, res) {
        const id = Number(req.params.id)

        const aluno = await alunoRepository.findById(id)

        if(!aluno) {
            return res.status(404).json({ //404(Not Found): o servidor achou a rede, mas não achou o que foi solicitado
                mensagem: 'Aluno não encontrado'
            })
        }

        return res.status(200).json(aluno)
    }

    async store(req, res) {
        const { nome, curso_id } = req.body // Obtém "nome" e "curso_id" enviados no corpo da requisição

        const aluno = await alunoService.cadastrar({
            nome,
            curso_id
        })

        if (!aluno) {
            return res.status(404).json({
                mensagem: 'Curso não encontrado'
            })
        }

        return res
            .location(`/alunos/${aluno.id}`) // Informa a URL onde o novo aluno pode ser encontrado
            .status(201) //201(Created): a requisição foi bem sucedida e um novo recurso foi criado
            .json(aluno)
    }

    async update(req, res) {
        const id = Number(req.params.id) // Obtém o parâmetro "id" informado diretamente na URL

        const { nome, curso } = req.body

        const aluno = await alunoRepository.update(id, {
            nome,
            curso
        })

        if (!aluno) {
            return res.status(404).json({
                mensagem: 'Aluno não encontrado'
            })
        }

        return res.status(200).json(aluno)
    }

    async delete(req, res) {
        const id = Number(req.params.id)

        const removido = await alunoRepository.delete(id)

        if (!removido) {
            return res.status(404).json({
                mensagem: 'Aluno não encontrado'
            })
        }

        return res.status(204).send() // 204(No Content): a solicitação foi processada com sucesso pelo servidor, mas a resposta não possui nenhum corpo
    }

}

export default new AlunoController()