import http from 'http'

import models from '../api/models'
import uuid from 'uuid'

import { CLIENT_URL } from '../config'

const { User, Message, ChatParticipant, ChatHistory, Chat } = models

export const onNewMessage = async (data, io) => {
  const message = await Message.create({
    id: uuid.v4(),
    content: data.content,
    messageType: data.messageType,
    userId: data.userId,
    chatId: data.chatId,
  })

  const author = await message.getUser()

  io.to(data.chatId).emit('new_message', {
    id: message.dataValues.id,
    content: data.content,
    messageType: data.messageType,
    userId: data.userId,
    chatId: data.chatId,
    createdAt: message.dataValues.createdAt,
    updatedAt: message.dataValues.updatedAt,
  })
}
export const onPrivateGroupConversation = async (data, socket) => {
  console.log('ny gruppchatt');
  console.log(data.chatId);
  const { friends, chatId } = data
  const { id } = socket.decoded_token
  const from = await User.findOne({ where: { id }})
  const oldChat = await Chat.find({where: {id: chatId}})
  const oldChatUsers = await oldChat.getUsers()
  const oldChatMessages = await oldChat.getMessages()

  const to = await Promise.all(friends.map(async id => {
    const user =  await User.findOne({ where: {id}})
    console.log(user.firstname);
    return user
  }))
  to.push.apply(to, oldChatUsers)
  //to.forEach(u => console.log(u.firstname))
//TODO: Kolla alla konversationer om de har to arrayn med användare i sig

  //göra ny chatt med nya anändare
  const newChat = await Chat.create({ id: uuid.v4() })
  await Promise.all([
    newChat.addUser(from),
    to.map(user => newChat.addUser(user)),
    oldChatMessages.map(m => newChat.addMessages(m)),
  ])
  const messages = await newChat.getMessages()
  const friendIds = await newChat.getUsers().map(u => {return u.id})
  const friendNames = await newChat.getUsers().map(u => {return u.firstname+' '+u.lastname})

  socket.join(newChat.id)
  socket.emit('private_group_conversation_start', {
    friendNames,
    friendIds,
    chatId: newChat.id,
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

  //theChat.users.forEach(u => console.log(u.dataValues.email))

  const { chat, users } = theChat // meh
  const messages = await chat.getMessages()
  socket.join(chat.dataValues.id)
  socket.emit('private_conversation_start', {
    friendId: id,
    chatId: chat.dataValues.id,
    messages,
  })
}


const getWholeDate = () => {
  const today = new Date()
  let dd = today.getDate()
  let mm = today.getMonth()+1 //January is 0!
  const yyyy = today.getFullYear()
  if(dd<10) dd='0'+dd
  if(mm<10) mm='0'+mm
  return yyyy+'-'+mm+'-'+dd
}
export const onDeleteConversation = async ({ chatId, friendId }, io, connectedUsers) => {
  //Delete conversation
  try {
    await Message.destroy({
      where: {
        chatId,
      },
    })
    const admin = await User.find({where: {isAdmin: true}})
    const message = await Message.create({
      id: uuid.v4(),
      content: 'This conversation was deleted '+getWholeDate()+'.',
      userId: admin.id,
      chatId: chatId,
    })
    io.to(connectedUsers[friendId]).emit('delete_conversation', { chatId })
    io.to(chatId).emit('new_message', {
      id: message.id,
      content: message.content,
      userId: message.userId,
      chatId: message.chatId,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
    })
  }catch(e){
    console.log(e)
  }


}
