import addMessage from './add-message'
import chats from './chats'
import currentUserChats from './current-user-chats'
import messages from './messages'

export default {
  Query: {
    chats,
    currentUserChats,
    // messages,
  },
  Mutation: {
    addMessage,
  },
}
