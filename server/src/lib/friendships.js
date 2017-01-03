import models from '../api/models'
import uuid from 'uuid'
import { CLIENT_URL } from '../config'

const { User, Friendship, Chat} = models

export const onFriendRequest = async (data, socket, io, connectedUsers) => {
  const { id } = data
  const { decoded_token } = socket

  if (id === decoded_token.id) {
    return io.to(decoded_token.id).emit('add_friend_error', {
      message: 'Cannot add yourself as friend',
    })
  }

  const friendship = await Friendship.findOne({
    where: {
      $or: [
        { friendId: id, userId: decoded_token.id },
        { friendId: decoded_token.id, userId: id },
      ],
    },
  })
  if (friendship) {
    return io.to(connectedUsers[decoded_token].id)
      .emit('add_friend_error', { message: ' You are already friends with this person'})
  }

  // Create the chat upon a sent friend request. Otherwise, the
  // client will try to the chat before it was created upon
  // accepting a friend request. This is not optimal
  const [receiver, sender] = await Promise.all([
    User.findOne({ where: { id }}),
    User.findOne({ where: { id: decoded_token.id }}),
  ])

  await sender.addFriend(receiver)
  const sentFriendRequests = await sender.sentFriendRequests()

  const chat = await Chat.create({ id: uuid.v4() })
  await Promise.all([
    chat.addUser(receiver),
    chat.addUser(sender),
  ])

  await io.to(connectedUsers[decoded_token.id]).emit('friend_request_sent', {
    message: 'Friend added!',
    sentFriendRequests,
    userId: id,
  })

  io.to(connectedUsers[id]).emit('friend_request_gotten', {
    friend: sender,
  })
}

export const onFriendRequestAccept = async (data, socket, io, connectedUsers) => {
  // const { id, friendId } = data
  // const [receiver, sender] = await Promise.all([
  //   User.findOne({ where: { id }}),
  //   User.findOne({ where: { id: friendId }}),
  // ])
  // const chat = await Chat.create({ id: uuid.v4() })
  // await Promise.all([
  //   chat.addUser(sender),
  //   chat.addUser(receiver),
  // ])
  io.to(connectedUsers[data.id]).emit('friend_request_accepted', data)
}
