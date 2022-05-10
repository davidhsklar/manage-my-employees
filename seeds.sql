USE employee_management

INSERT INTO department (dept_name, id)
VALUES ("Accouting", 1),
       ("Legal", 2),
       ("Sales", 3),
       ("Operations", 4),
       ("Marketing", 5);

INSERT INTO roles (title, salary, department_id)
VALUES ("Account Manager", 170000, null),
       ("Legal Eagle", 110000, null),
       ("Sales Leader", 130000, null),
       ("Ops Manager", 190000, null),
       ("Marketing Lead", 100000, null),
       ("Accountant", 141000, null),
       ("Other Accountant", 110000, null),
       ("Software Engineer", 125000, null);

INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES ("Gary", "Trent", 1, null),
       ("Nick", "Nurse", 2, null),
       ("Kyle", "Lowry", 3, null),
       ("Pascal", "Siakam", 4, null),
       ("Fred", "VanVleet", 5, null),
       ("OG", "Ananouby", 3, null),
       ("Khem", "Birch", 4, null),
       ("Scottie", "Barnes", 5, null);