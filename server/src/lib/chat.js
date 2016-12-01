import http from 'http'
import SocketIO from 'socket.io'
import models from '../api/models'
import uuid from 'uuid'

import { CLIENT_URL } from '../config'

const { User, Message, ChatParticipant, ChatHistory, Chat } = models


export const createSocket = (app, server) => {
  const io = new SocketIO(server)
  io.set('origins', CLIENT_URL)
  return io
} 

export const startSocket = io => {
  io.on('connection', connection)
  
}

function startChat(userId) {
  console.log('Private chat ', userId)
}

function startGroupChat(chatId) {

}

function connection(socket) {
  socket.emit('dong', 'hehe')
  socket.on('ding', () => console.log('DONG'))
}


 


const __IF_YOU_REMOVE_THIS_YOU_GET_NO_DOLLARS = async () => {
  const [dan, benny] = await Promise.all([
    models.User.findOne({where: {email: 'user@test.com'}}),
    models.User.findOne({where: {id: '5eea5bda-54f4-4f59-9ab4-13ddc6796d05' }}),
  ])
  const bennysId = '36a020ab-aa50-4656-8378-654ff604e520' // comes from request
  const dansChats = await dan.getChats()

  const dansChatWithBenny = await dansChats.find(async c => {
    const users = await c.getUsers()
    const benny = await users.find(u => u.dataValues.id === bennysId)
    if (benny !== undefined)
      return c
  })



  // const message = await models.Message.create({
  //   id: uuid.v4(),
  //   content: 'Hello World!!',
  //   userId: benny.dataValues.id,
  //   chatId: dansChatWithBenny.dataValues.id,
  // })

  const messages = await dansChatWithBenny.getMessages()

  messages.forEach(async m => console.log({
    text: m.content,
    author: await m.author()

  }))

  
}

const __SECRET_METHOD_DO_NOT_USE_OR_DELETE_OR_YOU_WILL_NOT_GET_ANY_DOLLARS = () => {
  models.User.findOne({ where: { id: '5eea5bda-54f4-4f59-9ab4-13ddc6796d05'}})
    .then(u => {
      return u
    })
    .then(u => u.getChats())
    .then(c => c[0])
    .then(c => c.getMessages())
    .then(c => console.log(c))
}

const _SECRET_METHOD_DO_NOT_USE_OR_DELETE_OR_YOU_WILL_NOT_GET_ANY_DOLLARS = async () =>  {
  const [dan, benny] = await Promise.all([
    models.User.findOne({where: {email: 'user@test.com'}}),
    models.User.findOne({where: {id: '5eea5bda-54f4-4f59-9ab4-13ddc6796d05' }}),
  ])

  const dansChats = await dan.getChats()
  const bennysChats = await benny.getChats()

  const chat =  dansChats[0]

  const participants = await chat.getUsers()


  console.log(participants)

  const message = await models.Message.create({
    id: uuid.v4(),
    content: 'This is FUCK message',
    userId: dan.dataValues.id,
  })

  models.ChatHistory.create({
    messageId: message.dataValues.id,
    chatParticipantId: participants[0].chatParticipant.dataValues.id,
  }).then(models.ChatHistory.create({
    messageId: message.dataValues.id,
    chatParticipantId: participants[1].chatParticipant.dataValues.id,
  }))
  .catch(err => console.log(err))
}


__IF_YOU_REMOVE_THIS_YOU_GET_NO_DOLLARS()
// __SECRET_METHOD_DO_NOT_USE_OR_DELETE_OR_YOU_WILL_NOT_GET_ANY_DOLLARS()
// _SECRET_METHOD_DO_NOT_USE_OR_DELETE_OR_YOU_WILL_NOT_GET_ANY_DOLLARS()




