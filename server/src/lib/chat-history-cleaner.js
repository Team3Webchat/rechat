import models from '../api/models'

const { Message } = models
const DAYS_MESSAGE_IS_ALLOWED_TO_LIVE = 30

export const clearOldChatHistory =  () => {
  const thirtyDaysAgo = new Date().setDate(new Date().getDate() - DAYS_MESSAGE_IS_ALLOWED_TO_LIVE)

  Message.destroy({ where: { createdAt: { lte: thirtyDaysAgo }}})
    .then(res => console.log(res))
    .catch(err => console.log(err))
}



