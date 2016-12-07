import http from 'http'

import models from '../api/models'
import uuid from 'uuid'

import { CLIENT_URL } from '../config'

const { User, Message, ChatParticipant, ChatHistory, Chat } = models

export const onNewMessage = async (data, io) => {
  console.log(data)
  const message = await Message.create({
    id: uuid.v4(),
    content: data.content,
    userId: data.userId,
    chatId: data.chatId,
  })

  const author = await message.getUser()

  io.to(data.chatId).emit('new_message', {
    id: message.dataValues.id,
    content: data.content,
    userId: data.userId,
    chatId: data.chatId,
    createdAt: message.dataValues.createdAt,
    updatedAt: message.dataValues.updatedAt,
  })
}

export const onPrivateConversation = async (data, socket) => {
  const { id } = data
  const { decoded_token } = socket
  const [from, to] = await Promise.all([
    User.findOne({ where: { id: socket.decoded_token.id }}),
    User.findOne({ where: { id }}),
  ])

  const chats = await Promise.all(await from.getChats().map(async chat => ({
    chat: chat,
    users: await chat.getUsers(),
  })))

  const theChat = chats.find(c => {
    console.log(c.users[0].dataValues.email, c.users[1].dataValues.email)
    return (c.users[0].dataValues.id === from.dataValues.id && c.users[1].dataValues.id === to.dataValues.id) ||
           (c.users[1].dataValues.id === from.dataValues.id && c.users[0].dataValues.id === to.dataValues.id)
  })
//TODO Bulkdestory ish här med chat id export, socket

  if (theChat) {

    const { chat, users } = theChat // meh
    const messages = await chat.getMessages()
    socket.join(chat.dataValues.id)
    socket.emit('private_conversation_start', {
      friendId: id,
      chatId: chat.dataValues.id,
      messages,
    })
  } else {
    console.log('CHAT DID NOT EXIST!!')
    const chat = await Chat.create({ id: uuid.v4() })
    console.log('Chat did not existst, created. Chat id: ', chat.id)
    await Promise.all([chat.addUser(from), chat.addUser(to)])
    socket.join(chat.dataValues.id)
    socket.emit('private_conversation_start', {
      friendId: id,
      chatId: chat.dataValues.id,
      messages: [],
    })
  }
}


export const onDeleateConversation = async ({ chatId } , socket) => {
  console.log(chatId)
  console.log('bajskörv')
  return Message.destroy({
    where: {
      chatId,
    },
  })
}
// function connection(socket) {

//   socket.on('private_conversation', async data => {
//     const { id } = data
//     const [user, userToChatWith] = await Promise.all([
//       models.User.findOne({ where: { id: socket.decoded_token.id }}),
//       models.User.findOne({ where: { id }}),
//     ])

//     user.getChats()
//       .then(async chats => {

//         const chatsInfo = await Promise.all(chats.map(async c => ({
//           chatId: c.dataValues.id,
//           users: await c.getUsers(),
//         })))

//         const chat = chatsInfo.find(c => {
//           console.log(c.users[1])
//           return (c.users[0].dataValues.id === user.dataValues.id && c.users[1].dataValues.id === userToChatWith.dataValues.id) ||
//                  (c.users[1].dataValues.id === user.dataValues.id && c.users[0].dataValues.id === userToChatWith.dataValues.id)
//         })

//         return chat ? chat.chatId : null
//       })
//       .then(async chatId => {
//         if (chatId) {

//           return models.Chat.findOne({ where: { id: chatId }})

//         } else {

//           const chat = await models.Chat.create({ id: uuid.v4() })
//           await Promise.all([
//             chat.addUser(user),
//             chat.addUser(userToChatWith),
//           ])
//           return chat
//         }
//       })
//       .then(async chat => {
//         const messages = await chat.getMessages()
//         messages.forEach(m => console.log(m.dataValues.content))
//         socket.join(chat.dataValues.id)
//         socket.emit('private_conversation_start', {
//           chatId: chat.dataValues.id,
//         })
//       })

//      socket.emit('dong', 'hehe')
//   socket.on('ding', () => console.log('DONG'))
//   socket.on('new_message', async data => {
//     console.log("new_message")
//     console.log(data)
//     const message = await models.Message.create({
//       id: uuid.v4(),
//       content: data.content,
//       userId: data.userId,
//       chatId: data.chatId,
//     })

//     console.log('USERS CHAT ID: ', data.chatId)
//     const author = await message.getUser()
//     io.to(data.chatId).emit('new_message', {
//       content: data.content,
//       author: author.fullname(),
//       userId: data.userId,
//       chatId: data.chatId,
//     })
//   })

//   })
// }





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
