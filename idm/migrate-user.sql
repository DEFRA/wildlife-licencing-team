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