import Sequelize from 'sequelize'

const db = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
    logging: false,
  },
)

export default db
