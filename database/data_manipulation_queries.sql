-- FOR REFERENCE ONLY **not in use** 

-- USERS --
-- get all Users data
SELECT user_id, username, email, first_name, last_name FROM Users;

-- get filtered Users
SELECT user_id, email, username, first_name, last_name FROM Users WHERE username=:input_username_filter;

-- *user_id_query: get a user_id from a given username 
SELECT user_id FROM Users WHERE username=:input_administrator_username;

-- add a new user
INSERT INTO Users (username, email, first_name, last_name) 
    VALUES (:username_input, :email_input, :first_name_input, :last_name_input);


-- WORKSPACES --
-- get all Workspaces data
SELECT * FROM Workspaces;

-- *workspace_query: get a workspace id from a given workspace name 
SELECT workspace_id FROM Workspaces WHERE workspace_name=:input_workspace_name;

-- add a new workspace
INSERT INTO Workspaces (workspace_name, administrator) 
    VALUES (:input_workspace_name, *user_id_query);


-- CHANNELS --
-- get all Channels data
SELECT * FROM Channels;

-- *channel_query: get a Channel ID from a given Channel name 
SELECT channel_id FROM Channels WHERE channel_name=:input_channel_name;

-- add a new channel
INSERT INTO Channels (channel_name, workspace_id, category_id) 
    VALUES (:input_channel_name, *workspace_query, *category_query);


-- CATEGORIES --
-- get all Categories data
SELECT * FROM Categories;

-- *category_query: get a category_id from a given category name 
SELECT category_id FROM Categories WHERE category_name=:input_category_name;

-- create a Category
INSERT INTO Categories (category_name) VALUES (:input_data.category_name);

-- update a Category
UPDATE Categories SET category_name = :input_category_name WHERE category_id = :input_category_id;


-- MESSAGES --
-- get all Messages data
SELECT * FROM Messages;

-- create a Message
INSERT INTO Messages (user, channel, time, date, content)
     VALUES (*user_id_query, *channel_query, :input_time, :input_date, :input_content);

-- delete a Message
DELETE FROM Messages WHERE message_id = :input_message_id;


-- USERS_WORKSPACES --
-- get all Users_Workspaces data
SELECT * FROM Users_Workspaces;

-- create a Users Workspaces relationship
INSERT INTO Users_Workspaces (user_id, workspace_id) VALUES (*user_id_query, *workspace_query);

-- delete a Users_Workspaces
DELETE FROM Users_Workspaces WHERE user_id = :input_user_id AND workspace_id = :input_workspace_id;
