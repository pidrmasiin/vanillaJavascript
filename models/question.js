const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    question: String,
    answer: String,
    synonyms: [],
    altAnswers: [],
    time: Date,
    wordsInQuestion: [],
   })

questionSchema.statics.format = (question) => {
  return{
    question: question.question,
    answer: question.answer,
    synonyms: question.synonyms,
    altAnswers: question.altAnswers,
    time: question.time,
    wordsInQuestion: question.wordsInQuestion,
  }
}

const Question = mongoose.model('Question', questionSchema)

module.exports = Question