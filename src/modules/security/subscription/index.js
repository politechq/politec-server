import { PubSub } from 'apollo-server'

import USER_ADDED from './user-added'
import USER_DELETED from './user-deleted'

export const EVENTS = {
  USER_ADDED,
  USER_DELETED,
}

export default new PubSub()
