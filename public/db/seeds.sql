USE employees;
INSERT INTO department (name)
VALUES
 ("Sales"),
 ("Engineering"),
 ("Finance"),
 ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES 
("Sales Lead", 100000, "Sales"), 
("Salesperson", 80000, "Sales"), 
("Lead Engineer", 150000, "Engineering"), 
("Software Engineer", 120000, "Engineering"),
("Account Manager", 160000, "Finance"),
("Accountant", 125000, "Finance"), 
("Legal Team Lead", 250000, "Legal"), 
("Lawyer", 190000, "Legal");

INSERT INTO employee (first_name, last_name, department_name, role_id, manager_id)
VALUES 
("Jim", "Halper", "Sales", "Salesperson", "Micheal Scott"), 
("Micheal", "Scott","Sales", "Sales Lead", "David Wallace"), 
("Oscar", "Martinez", "Finance", "Accountant", "Micheal Scott"),
("Ryan", "Howard", "Engineering", "Software Engineer", "Micheal Scott"),  
("Holly", "Flax", "Legal", "Legal Team Lead", "Micheal Scott");