USE employee_db;

INSERT INTO department (name)
VALUES 
('IT'), ('Finance'), ('Legal Professional'), ('Human Resources'), ('Engineering'), ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
('Debugger', 100000, 1), ('Administrative assistant', 80000, 2), ('Ace attorney', 500000, 3), ('VP Human Resources', 110000, 4), ('Engineer', 80000, 5), ('Sales Rep', 40000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Ron', 'Mcdonald', 1, NULL),
('Road', 'Dahl', 2, NULL),
('Mikael', 'Danner', 3, NULL),
('JC', 'Christensin', 4, NULL),
('Rachel', 'Finn', 5, NULL),
('Ashanti', 'Williamson', 6, NULL);
