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
