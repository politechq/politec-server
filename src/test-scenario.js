const testScenario = async ({ DataTable, Role, User }) => {
  const a$apRocky = await User.create({
    email: 'asap.rocky@gmail.com',
    password: 'asap123',
    firstName: 'A$AP',
    lastName: 'Rocky',
  })
  const billieEilish = await User.create({
    email: 'billie.eilish@gmail.com',
    password: 'billie123',
    firstName: 'Billie',
    lastName: 'Eilish',
  })
  const drake = await User.create({
    email: 'drake@gmail.com',
    password: 'drake123',
    firstName: 'Drake',
    lastName: 'Graham',
  })
  const juiceWrld = await User.create({
    email: 'juice.wrld@gmail.com',
    password: 'juice123',
    firstName: 'Juice',
    lastName: 'Wrld',
  })
  const kanyeWest = await User.create({
    email: 'kanye.west@gmail.com',
    password: 'kanye123',
    firstName: 'Kanye',
    lastName: 'West',
  })
  const kendrickLamar = await User.create({
    email: 'kendrick.lamar@gmail.com',
    password: 'kendrick123',
    firstName: 'Kendrick',
    lastName: 'Lamar',
  })
  const nickiMinaj = await User.create({
    email: 'nicki.minaj@gmail.com',
    password: 'nicki123',
    firstName: 'Nikci',
    lastName: 'Minaj',
  })
  const lilPeep = await User.create({
    email: 'lil.peep@gmail.com',
    password: 'lil123',
    firstName: 'Lil',
    lastName: 'Peep',
  })
  const lilPump = await User.create({
    email: 'lil.pump@gmail.com',
    password: 'lil123',
    firstName: 'Lil',
    lastName: 'Pump',
  })
  const pushaT = await User.create({
    email: 'pusha.t@gmail.com',
    password: 'pusha123',
    firstName: 'Pusha',
    lastName: 'T',
  })
  const snoopDogg = await User.create({
    email: 'snoop.dogg@gmail.com',
    password: 'snoop123',
    firstName: 'Snoop',
    lastName: 'Dogg',
  })
  const techN9ne = await User.create({
    email: 'tech.n9ne@gmail.com',
    password: 'tech123',
    firstName: 'Tech',
    lastName: 'N9ne',
  })
  const travisScott = await User.create({
    email: 'travis.scott@gmail.com',
    password: 'travis123',
    firstName: 'Travis',
    lastName: 'Scott',
  })
  try {
    const admin = await Role.create(
      {
        name: 'Admin',
        code: 'admin',
        createdBy: drake.id,
      },
      /*
       * {
       *   association: User,
       *   include: ['createdBy'],
       * },
       */
    )
    const moderator = await Role.create({
      name: 'Moderator',
      code: 'moderator',
      createdBy: travisScott.id,
    })
    const logistician = await Role.create({
      name: 'Logistician',
      code: 'logistician',
      createdBy: a$apRocky.id,
    })
    const employee = await Role.create({
      name: 'Employee',
      code: 'employee',
      createdBy: a$apRocky.id,
    })

    setTimeout(async () => {
      await a$apRocky.addRole(admin)
      await drake.addRole(moderator)
      await juiceWrld.addRoles([logistician, employee])
      await kanyeWest.addRoles([admin, moderator])
      await kendrickLamar.addRole(admin)
      await nickiMinaj.addRole(employee)
      await lilPeep.addRole(logistician)
      await lilPump.addRole(logistician)
      await pushaT.addRole(employee)
      await snoopDogg.addRoles([moderator, logistician])
      await techN9ne.addRole(logistician)
      await travisScott.addRole(employee)
    }, 5000)
  } catch (error) {
    console.log('ERR', error)
  }

  await DataTable.create({
    name: 'Tavern',
    code: 'tavern',
    createdBy: drake.id,
    editedBy: drake.id,
    attributes: [
      {
        id: 'name',
        title: 'Name',
        type: 'text',
        required: true,
      },
      {
        id: 'bottle-volume',
        title: 'Bottle Volume',
        type: 'number',
        required: true,
      },
      {
        id: 'price',
        title: 'Price',
        type: 'money',
        required: true,
      },
    ],
  })
  await DataTable.create({
    name: 'Laboratory',
    code: 'laboratory',
    createdBy: lilPeep.id,
    editedBy: lilPeep.id,
    attributes: [
      {
        id: 'name',
        title: 'Name',
        type: 'text',
        required: true,
      },
      {
        id: 'price',
        title: 'Price',
        type: 'money',
        required: true,
      },
    ],
  })
  return false
}

export default testScenario
