import models from '../api/models'
import uuid from 'uuid'
import { CLIENT_URL } from '../config'

const { User, Friendship, Chat} = models

export const onFriendRequest = async (data, socket, io, connectedUsers) => {
  const { id } = data
  console.log(data)
  const { decoded_token } = socket

  if (id === decoded_token.id) {
    return io.to(decoded_token.id).emit('add_friend_error', {
      message: 'Cannot add yourself as friend'
    })
  }

  const friendship = await Friendship.findOne({ 
    where: { 
      $or: [
        { friendId: id, userId: decoded_token.id }, 
        { friendId: decoded_token.id, userId: id }
      ]
    }
  })
  if (friendship) { 
    return io.to(connectedUsers[decoded_token].id)
      .emit('add_friend_error', { message: ' You are already friends with this person'})
  }
  const [receiver, sender] = await Promise.all([
    User.findOne({ where: { id }}),
    User.findOne({ where: { id: decoded_token.id }})
  ])

  await sender.addFriend(receiver)
  const sentFriendRequests = await sender.sentFriendRequests()

  await io.to(connectedUsers[decoded_token.id]).emit('friend_request_sent', {
    message: 'Friend added!',
    sentFriendRequests,
    userId: id,
  })

  console.log(connectedUsers[id])
  io.to(connectedUsers[id]).emit('friend_request_gotten', {
    friend: sender,
  })
}