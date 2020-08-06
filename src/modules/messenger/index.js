import resolvers from './resolvers'
import schema from './schema'

import Chat from './models/chat'
import ChatMessages from './models/chat-messages'
import Message from './models/message'

const messenger = {
  name: 'messenger',
  models: {
    Chat,
    ChatMessages,
    Message,
  },
  resolvers,
  schema,
}

export default messenger
