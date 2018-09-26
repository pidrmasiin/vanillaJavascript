const questionRouter = require('express').Router()
const Question = require('../models/question')

questionRouter.get('/', async (request, response) => {
    const questions = await Question.find({})
    response.json(questions.map(Question.format))
})

questionRouter.get('/:id', async (request, response) => {
  try{
    const question = await Question
      .findById(request.params.id)
    response.json(Question.format(question))
  }catch (exception) {
    console.log(exception)
    response.status(400).json({ error: 'cant find user' })
  }
})

questionRouter.post('/', async (request, response) => {
    const body = request.body
    console.log('moi')
    body.time = new Date()
    console.log('body')
    try{
      const question = new Question(body)
     console.log('moi')
      await question.save()
      response.json(Question.format(question))
    } catch (exception) {
      if (exception.name === 'JsonWebTokenError' ) {
        response.status(401).json({ error: exception.message })
      } else {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
      }
    }
  })

  questionRouter.put('/:id', async (request, response) => {
    try{
     
      // request.body form must be => {status: "", id: ""}
      const questionToEdit = await Question.findById(request.params.id)
     
      questionToEdit.answer = request.body.answer
  
      questionToEdit.save()
      response.json("event added").end()
    } catch (exception) {
      if (exception.name === 'JsonWebTokenError' ) {
        response.status(401).json({ error: exception.message })
      } else {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
      }
    }
  })
  

module.exports = questionRouter
