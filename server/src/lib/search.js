import models from '../api/models'

const { User } = models

export async function search(req, res, next, message) {
    try{
        const users = await User.findAll({
            where: {
                $or:[
                    {firstname: {
                        $ilike:req.body.searchValue
                    }},
                    {lastname: {
                        $ilike:req.body.searchValue
                    }}
                ]
            }
        })
        console.log(users)
        if(users.length == 0){
            const message = JSON.stringify({results: {status: 'error', code: 'User not found'}})
            res.send(message)
        }else{
            res.send(JSON.stringify({results: users}))
            console.log(users)
        }
    }catch(e){
        const message = JSON.stringify({results: {status: 'error', code: e}})
        res.send(message)
    }
}