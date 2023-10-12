# Add users script

We are currently in private beta, running in the preproduction environment. At present we have no interface for adding new users to the beta; instead, we use this script which generates SQL to be run on the preprod database.

## Prerequisites

You will need:

* Login credentials for the preprod database. You can get these by logging into AWS, going to **Secrets Manager** and finding `db/details`.
* Host and port for the preprod database. You can get these by logging into AWS, going to **RDS > Databases** and finding the appropriate database.
* Some way of running SQL on a database. A db management tool like [DBeaver](https://dbeaver.com/) will allow you to do this.
* This repo pulled down to your local machine and script dependencies installed (ie. `cd add-users-script && npm ci`)

## Generating the SQL

In the `add-users-script` folder, create a file `users.json` containing an array of objects each with a `user` and `password` property representing the users to be registered. Use `example.users.json` as a guide:

```json
[
  { "email": "user@email.com", "password": "xxxxWl5!" }
]
```

Passwords have all previously been in the format `xxxxWl5!`, where `xxxx` is a mix of letters and numbers.

When you have this, run `npm start`. This will output the SQL to the console:

```
$ npm start

> add-users-script@1.0.0 start
> node index.js

----- CUT HERE -----
insert into users (id, username, password, created_at, updated_at)
                values ('9cdf6fbd-afa7-4f3d-b8e9-830f5fd67480', 'user@email.com', '$argon2id$v=19$m=65536,t=3,p=4$NvLM/aYRkCv7zRw+fVmdKQ$6p61jj537PPE9AmNYcz6drjPsp7FyKZ/nqkdMCTdTeg', now(), now());

commit;
----- CUT HERE -----
```

Copy the lines between `----- CUT HERE -----`

## Running the SQL

Log into the db using your db management tool of choice. Paste in the SQL lines and run them. This will add the users to the `users` table in the db.
