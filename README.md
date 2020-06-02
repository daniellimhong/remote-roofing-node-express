# Remote Roofing Server

Current Status: Server set-up + db connection. Need to add data and test

## Dependencies

- Express
- Sequelize
- pg
- pg-hstore
- dotenv
- body-parser

## Queries
### DB Init
```sql
drop table if exists users cascade;
drop table if exists projects cascade;
drop table if exists tasks cascade;

create table users (
    user_id serial primary key,
    name text not null,
    surname text not null,
    email text not null
);

create table projects (
    project_id serial primary key,
    project_name text not null,
    body text not null,
    status text not null,
    user_id int references users(user_id)
);

create table tasks (
    task_name text not null,
    description text not null,
    score int,
    status text not null,
    user_id int references users(user_id),
    project_id int references projects(project_id)
);
```

### Joins

```sql
-- Joining user and project table
select * from users join projects
on (users.user_id = projects.user_id);

-- Joining project and task table
select * from projects join tasks
on (projects.project_id = tasks.project_id); 

-- Joining task and user table
select * from tasks join users
on (tasks.user_id = tasks.user_id); 
```

### Inserts
```sql
insert into users(name, users, email)
values($1, $2, $3);

insert into projects(project_name, body, status, user_id)
values($1, $2, $3, $4);

insert into tasks(task_name, description, score, status, user_id, project_id)
values($1, $2, $3, $4, $5, $6);
```