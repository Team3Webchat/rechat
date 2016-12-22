import http from 'http'

import models from '../api/models'
import uuid from 'uuid'

import { CLIENT_URL } from '../config'

const { User, Message, ChatParticipant, ChatHistory, Chat } = models

export const onNewMessage = async (data, io) => {
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
export const onPrivateGroupConversation = async (data, socket) => {

  const { id } = data
  const { decoded_token } = socket
  const from = await Promise.all([
    User.findOne({ where: { id: socket.decoded_token.id }}),
  ])
  let to = null

  for (var i = 0; i < id.length; i++) {
    to[i] = User.findOne({ where: {id: id[i] }})
  }

  const chats = await Promise.all(await from.getChats().map(async chat => ({
    chat: chat,
    users: await chat.getUsers(),
  })))

  const theChat = chats.findOrCreate(c => {
    console.log(c)
    console.log(to)
    console.log(from)
    return (c.users[0].dataValues.id === from.dataValues.id && c.users[1].dataValues.id === to[1].dataValues.id) ||
           (c.users[1].dataValues.id === from.dataValues.id && c.users[0].dataValues.id === to.dataValues.id)
  })

  theChat.users.forEach(u => console.log(u.dataValues.email))

  const { chat, users } = theChat // meh
  const messages = await chat.getMessages()
  socket.join(chat.dataValues.id)
  socket.emit('private_group_conversation_start', {
    friendId: id,
    chatId: chat.dataValues.id,
    messages,
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
    return (c.users[0].dataValues.id === from.dataValues.id && c.users[1].dataValues.id === to.dataValues.id) ||
           (c.users[1].dataValues.id === from.dataValues.id && c.users[0].dataValues.id === to.dataValues.id)
  })

  theChat.users.forEach(u => console.log(u.dataValues.email))

  const { chat, users } = theChat // meh
  const messages = await chat.getMessages()
  socket.join(chat.dataValues.id)
  socket.emit('private_conversation_start', {
    friendId: id,
    chatId: chat.dataValues.id,
    messages,
  })
}


export const onDeleteConversation = async ({ chatId, friendId }, io, connectedUsers) => {
  //Delete conversation
  await Message.destroy({
    where: {
      chatId,
    },
  })
  console.log(friendId)
  console.log(connectedUsers)
  io.to(connectedUsers[friendId]).emit('delete_conversation', { chatId })


}
