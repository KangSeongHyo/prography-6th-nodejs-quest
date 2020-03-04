CREATE TABLE TodoList(
	id int AUTO_INCREMENT,
	title varchar(255) NOT NULL,
	description varchar (255) NOT NULL,
	isCompleted boolean default false,
	tags varchar(255),
	createdAt datetime default CURRENT_TIMESTAMP,
	updatedAt datetime default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);
