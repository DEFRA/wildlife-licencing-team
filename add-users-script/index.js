import { v4 as uuidv4 } from 'uuid'
import argon2 from 'argon2'

const usersToRegister = [
  { email: 'user@email.com', pw: 'xxxxWl5!' }
]

const generateSql = async users => {
  for (const user of users) {
    const { email, pw } = user
    const id = uuidv4()

    const hashedPassword = await argon2.hash(pw, { type: argon2.argon2id })

    console.log(`insert into users (id, username, password, created_at, updated_at)
                values ('${id}', '${email}', '${hashedPassword}', now(), now());\n`)
  }

  console.log('commit;')
}

generateSql(usersToRegister)
