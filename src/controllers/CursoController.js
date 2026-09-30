// Controller: responsável por lidar com a requisição HTTP e definir a resposta ao cliente.

import cursoRepository from "../repositories/CursoRepository.js";

class CursoController {

    async index(req, res) {
            const cursos = await cursoRepository.findAll()
    
            return res.status(200).json(cursos) // 200(OK): Requisição bem sucedida
        }
    
        async show(req, res) {
            const id = Number(req.params.id)
    
            const curso = await cursoRepository.findById(id)
    
            if(!curso) {
                return res.status(404).json({ //404(Not Found): o servidor achou a rede, mas não achou o que foi solicitado
                    mensagem: 'Curso não encontrado'
                })
            }
    
            return res.status(200).json(curso)
        }
    
        async store(req, res) {
            const { nome } = req.body // Obtém "nome" enviado no corpo da requisição
    
            const curso = await cursoRepository.create({
                nome
            })
    
            return res
                .location(`/cursos/${curso.id}`) // Informa a URL onde o novo curso pode ser encontrado
                .status(201) //201(Created): a requisição foi bem sucedida e um novo recurso foi criado
                .json(curso)
        }
    
        async update(req, res) {
            const id = Number(req.params.id) // Obtém o parâmetro "id" informado diretamente na URL
    
            const { nome } = req.body
    
            const curso = await cursoRepository.update(id, {
                nome
            })
    
            if (!curso) {
                return res.status(404).json({
                    mensagem: 'Curso não encontrado'
                })
            }
    
            return res.status(200).json(curso)
        }
    
        async delete(req, res) {
            const id = Number(req.params.id)
    
            const removido = await cursoRepository.delete(id)
    
            if (!removido) {
                return res.status(404).json({
                    mensagem: 'Curso não encontrado'
                })
            }
    
            return res.status(204).send() // 204(No Content): a solicitação foi processada com sucesso pelo servidor, mas a resposta não possui nenhum corpo
        }
}

export default new CursoController()