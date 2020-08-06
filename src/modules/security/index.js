import resolvers from './resolvers'
import schema from './schema'

import RefreshToken from './models/refresh-token'
import Role from './models/role'
import User from './models/user'
import UserChats from './models/user-chats'
import UserRoles from './models/user-roles'

const security = {
  name: 'security',
  models: {
    RefreshToken,
    Role,
    User,
    UserChats,
    UserRoles,
  },
  resolvers,
  schema,
}

export default security
