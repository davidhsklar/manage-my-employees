USE employee_management
INSERT INTO department (dept_name)
VALUES ("Accouting"),
       ("Legal"),
       ("Sales"),
       ("Operations"),
       ("Marketing");

INSERT INTO roles (title, salary, department_id)
VALUES ("Account Manager", 170000, 1),
       ("Legal Eagle", 110000, 2),
       ("Sales Leader", 130000, 3),
       ("Ops Manager", 190000, 4),
       ("Marketing Lead", 100000, 5),
       ("Accountant", 141000, 6),
       ("Other Accountant", 110000, 7),
       ("Software Engineer", 125000, 8);

INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES ("Gary", "Trent", 3, 4),
       ("Nick", "Nurse", 2, null),
       ("Kyle", "Lowry", 3, null),
       ("Pascal", "Siakam", 4, null),
       ("Fred", "VanVleet", 5, 1),
       ("OG", "Ananouby", 6, null),
       ("Khem", "Birch", 7, null),
       ("Scottie", "Barnes", 8, 8);