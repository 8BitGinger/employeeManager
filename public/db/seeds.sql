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

INSERT INTO employee (first_name, last_name, department_name, salary, manager_id)
VALUES 
("Jim", "Halper", "Sales", 80000, "Micheal Scott"), 
("Micheal", "Scott","Sales", 100000, "David Wallace"), 
("Oscar", "Martinez", "Finance", 125000, "Micheal Scott"),
("Ryan", "Howard", "Engineering", 120000, "Micheal Scott"),  
("Holly", "Flax", "Legal", 190000, "Micheal Scott");