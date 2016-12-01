import http from 'http'
import SocketIO from 'socket.io'
import socketioJwt from 'socketio-jwt'
import models from '../api/models'
import uuid from 'uuid'

import { CLIENT_URL } from '../config'

const { User, Message, ChatParticipant, ChatHistory, Chat } = models
let io 

export const createSocket = (app, server) => {
  io = new SocketIO(server)
  io.set('origins', CLIENT_URL)
  return io
} 

export const startSocket = io => {
  io.sockets.on('connection', socketioJwt.authorize({
    secret: 'supersecret',
    timeout: 15000,
  })).on('authenticated', connection)
  
}

function startChat(userId) {
  console.log('Private chat ', userId)
}

function startGroupChat(chatId) {

}

function connection(socket) {
  socket.emit('dong', 'hehe')
  socket.on('ding', () => console.log('DONG'))
  socket.on('new_message', async data => {
    console.log("new_message")
    console.log(data)
    const message = await models.Message.create({
      id: uuid.v4(),
      content: data.content,
      userId: data.userId,
      chatId: data.chatId,
    })

    console.log('USERS CHAT ID: ', data.chatId)
    const author = await message.getUser()
    io.to(data.chatId).emit('new_message', {
      content: data.content,
      author: author.fullname(),
      userId: data.userId,
      chatId: data.chatId,
    })
  })
  socket.on('private_conversation', async data => {
    const { id } = data
    const [user, userToChatWith] = await Promise.all([
      models.User.findOne({ where: { id: socket.decoded_token.id }}),
      models.User.findOne({ where: { id }}),
    ])

    user.getChats()
      .then(async chats => {

        const chatsInfo = await Promise.all(chats.map(async c => ({
          chatId: c.dataValues.id,
          users: await c.getUsers(),
        })))

        const chat = chatsInfo.find(c => {
          console.log(c.users[1])
          return (c.users[0].dataValues.id === user.dataValues.id && c.users[1].dataValues.id === userToChatWith.dataValues.id) ||
                 (c.users[1].dataValues.id === user.dataValues.id && c.users[0].dataValues.id === userToChatWith.dataValues.id)
        })

        return chat ? chat.chatId : null
      })
      .then(async chatId => {
        if (chatId) {

          return models.Chat.findOne({ where: { id: chatId }})

        } else {

          const chat = await models.Chat.create({ id: uuid.v4() })
          await Promise.all([
            chat.addUser(user),
            chat.addUser(userToChatWith),
          ])
          return chat
        }
      })
      .then(async chat => {
        const messages = await chat.getMessages()
        messages.forEach(m => console.log(m.dataValues.content))
        socket.join(chat.dataValues.id)
        socket.emit('private_conversation_start', {
          chatId: chat.dataValues.id,
        })
      })

    // const chats = await user.getChats()

    // const chatWithTheUser = chats.find(async chat => {
    //   const chatUsers = await chat.getUsers()

    //   return await chatUsers[0].dataValues.id === user.dataValues.id && chatUsers[1].dataValues.id === userToChatWith.dataValues.id
    //     || chatUsers[1].dataValues.id === user.dataValues.id && chatUsers[0].dataValues.id === userToChatWith.dataValues.id
    // })


    // if (chatWithTheUser !== undefined) {
    //   socket.join(chatWithTheUser.dataValues.id)
    //   console.log('Joined an existing room')
    // } else {
    //   const chat = await models.Chat.create({ id: uuid.v4()})
    //   const you = await models.User.findOne({ where: { id: socket.decoded_token.id }})
    //   await Promise.all([
    //     chat.addUser(user),
    //     chat.addUser(you)
    //   ])
    //   socket.join(chat.dataValues.id)
    //   console.log('No room existed, created it and joined')
    // }

  })
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


// __IF_YOU_REMOVE_THIS_YOU_GET_NO_DOLLARS()
// __SECRET_METHOD_DO_NOT_USE_OR_DELETE_OR_YOU_WILL_NOT_GET_ANY_DOLLARS()
// _SECRET_METHOD_DO_NOT_USE_OR_DELETE_OR_YOU_WILL_NOT_GET_ANY_DOLLARS()




