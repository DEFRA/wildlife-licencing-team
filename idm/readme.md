## Moving the applications over to a new IDM account

Firstly you need to find out what the old account for the user is. To do this ask the user to provide the email/username for their old account and run the following query: 

```sql
SELECT id from users WHERE username = 'richard.mohammed@defra.gov.uk'
Its worth also asking if they user the same email address for the new account as the old one. If they did you can find their new account id with the following query: 
```

```sql
SELECT id
FROM users
WHERE users.user->'contactDetails'->>'email' = 'richard.mohammed@defra.gov.uk';
```

To move applications simply update the user_id from the  old_user_id to the new_user_id using the following query


```sql
update
  "public"."application-users"
set
  "user_id" = '<new_user_id>'
where
  "user_id" = '<old_user_id>';
```

example:


```sql
update
  "public"."application-users"
set
  "user_id" = 'e6a37e88-4e43-ee11-bdf3-6045bd905113'
where
  "user_id" = '6010bdb5-478c-46dc-8511-442fd26e298b';
```

We can condense this down into one SQL script where we provide the old email and the new email to move the applications over - The following example assumes they are the same email: 

```sql
DO $$
DECLARE
    old_email VARCHAR := 'richard.mohammed@defra.gov.uk';
    new_email VARCHAR := 'richard.mohammed@defra.gov.uk';
    old_user_id UUID;
    new_user_id UUID;
BEGIN
    -- Fetch the old user ID
    SELECT id INTO old_user_id
    FROM users
    WHERE username = old_email;

    -- Fetch the new user ID
    SELECT id INTO new_user_id
    FROM users
    WHERE users.user->'contactDetails'->>'email' = new_email;

    -- Update the application-users table
    UPDATE "public"."application-users"
    SET "user_id" = new_user_id
    WHERE "user_id" = old_user_id;
END $$;
```

The script can also be found in `migrate-user.sql`