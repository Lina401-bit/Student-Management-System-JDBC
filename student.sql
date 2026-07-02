## Database

Run the following SQL script before executing the project.

```sql
CREATE DATABASE studentdb;

USE studentdb;

CREATE TABLE student(
id INT PRIMARY KEY,
name VARCHAR(50),
course VARCHAR(50),
marks DOUBLE
);
