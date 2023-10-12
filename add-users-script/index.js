import { readFileSync } from 'fs'
import { v4 as uuidv4 } from 'uuid'
import argon2 from 'argon2'

const usersToRegister = JSON.parse(
  await readFileSync(
    new URL('./users.json', import.meta.url)
  )
)

const generateSql = async users => {
  console.log('----- CUT HERE -----')
  for (const user of users) {
    const { email, password } = user
    const id = uuidv4()

    const hashedPassword = await argon2.hash(password, { type: argon2.argon2id })

    console.log(`insert into users (id, username, password, created_at, updated_at)
                values ('${id}', '${email}', '${hashedPassword}', now(), now());\n`)
  }

  console.log('commit;')
  console.log('----- CUT HERE -----')
}

generateSql(usersToRegister)
