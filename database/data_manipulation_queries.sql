-- FOR REFERENCE ONLY **not in use** 

-- USERS --
-- get all Usernames to populate the Delete a User dropdown
SELECT username FROM Users

-- add a new user
INSERT INTO Users (username, email, first_name, last_name) 
    VALUES (:username_input, :email_input, :first_name_input, :last_name_input)

-- delete a user
DELETE FROM Users WHERE username = “:username_delete_input”

-- WORKSPACES --
-- get all user_id's to populate the Administrator dropdown
SELECT user_id FROM Users

-- get all workspace_id's populate the Delete a Workspace dropdown
SELECT workspace_id FROM Workspaces

-- create a workspace
INSERT INTO Workspaces (workspace_name, administrator)
    VALUES (:workspace_name_input, :administrator_input)

-- delete a workspace
DELETE FROM Workspaces WHERE workspace_id = “:workspace_id_delete_input”


-- CHANNELS --
-- get all workspace_id's populate the Workspace ID dropdown *** change to workspace_name
SELECT workspace_id FROM Channels

-- get all category_id's populate the Workspace ID dropdown *** change to category_name
SELECT category_id FROM Channels

-- get all channel_id's populate the Channel ID dropdown *** use channel_name get channel_id?
SELECT channel_id FROM Channels

-- create a channel
INSERT INTO Channels (channel_name, workspace_id, category_id) 
    VALUES (:channel_name_input, :workspace_id_input, :category_id_input)

-- update a channel data based on submission of the Update a Channel form 
UPDATE Channel SET channel_name = :channel_name_update_input, 
workspace_id = :workspace_id_update_input, 
category_id = :category_id_update_input

-- CATEGORIES --
-- get all category_id's populate the Delete a Category dropdown *** change to category_name
SELECT category_id FROM Categories

-- create a category
INSERT INTO Categories (category_name) VALUES (:category_name_input)

-- delete a category
DELETE FROM Categories WHERE category_id = “:category_id_delete_input”


-- MESSAGES --
-- get all user_id's to populate the Username dropdown *** change to users
SELECT user_id FROM Users

-- get all channel_id's populate the Channel ID dropdown *** use channel_name
SELECT channel_id FROM Channels

-- get all message_id's populate the Delete a Message dropdown
SELECT message_id FROM Messages

-- get messages where user_id is the filter
SELECT content FROM Messages WHERE user = “user_id_input”

-- create a message
INSERT INTO Messages (user, channel, time, date, content) 
VALUES (:user_input, :channel_input, :time_input, :date_input, :content_input)

-- delete a message
DELETE FROM Categories WHERE category_id = “:category_id_delete_input”


-- USERS_WORKSPACES --
-- get all user_id's to populate the User dropdown *** change to username
SELECT user_id FROM Users

-- get all workspace_id's to populate the Workspace dropdown *** change to workspace_name
SELECT workspace_id FROM Workspaces

-- associate a user with a workspace (M-to-M relationship addition)
INSERT INTO Users_Workspaces (user_id, workspace_id)
    VALUES (:user_id_input, :workspace_id_input)

-- dis-associate a user from a workspace (M-to-M relationship deletion)
DELETE FROM Users_Workspaces 
WHERE user_id = :user_id_delete_input 
AND workspace_id = :workspace_id_delete_input

-- get all Users and Workspaces with their current associated Workspaces and Users to display on the list
SELECT user_id, workspace_id FROM Users_Workspaces
