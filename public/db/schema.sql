
USE employees;
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;


CREATE TABLE department (
  id INTEGER AUTO_INCREMENT ,
  name VARCHAR(30) NOT NULL PRIMARY KEY
);

CREATE TABLE role (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id VARCHAR(50) FOREIGN KEY REFERENCES department(name)
);

CREATE TABLE employee (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(30) NOT NULL FOREIGN KEY REFERENCES department(name),
  role_id VARCHAR(50) NOT NULL FOREIGN KEY REFERENCES role(title),
  manager_id VARCHAR(30) NOT NULL 
  
);
