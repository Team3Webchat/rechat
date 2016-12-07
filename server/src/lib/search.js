import models from '../api/models'

const { User } = models

export async function search(req, res, next, message) {
  try{
    const { searchValue } = req.body
    const searchValues = searchValue.split(' ').filter(s => s.length > 0)
    const query = [].concat.apply([], searchValues.map(s => {
      return [
        { firstname: { $iLike: '%' + s + '%' } },
        { lastname: { $iLike: '%' + s + '%' } },
      ]
    }))
    const users = await User.findAll({
      where: {
        $or: query,
      },
    })
    /*console.log('USERS friendship')
    const users2 = await Promise.all(users.map(async (user) => {
      const [friends, friendRequests] = await Promise.all([
        user.friends(),
        user.friendRequests(),
      ])

      if(friends.find(f => f.id === fromUser) != null || friendRequests.find(f => f.id === fromUser)){
        user.isFriends = true
        //console.log(user.fullname()+'is friends')
      }else{
        user.isFriends = false
        //console.log(user.fullname()+'is NOT friends')
      }
    }))
    console.log(users.filter(u => u.isFriends === true).map((user) => {return user.fullname()}))
*/
    if(users.length === 0){
      const message = JSON.stringify({results: {status: 'error', code: ['User not found']}})
      res.send(message)
    }else{
      res.send(JSON.stringify({results: users}))

    }
  }catch(e){

    const message = JSON.stringify({results: {status: 'error', code: e}})
    res.send(message)
  }
}
