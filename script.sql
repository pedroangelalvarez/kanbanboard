use kanbanboard;
---id int, transDate date, transTime time, status varchar(15), priority int, complexity int, description varchar(30), tipo varchar(12), solicitante varchar(10), asignado varchar(10), responsable varchar(10)
insert into usuarios value('71491612','Pedro','Alvarez','pedroangel.alvarez24@gmail.com','9776146140','12345678','sistemas','admin','activo');

insert into incidentes values(1,'2022-01-01','08:00','Abierto','alta','media','Baja velocidad de internet para áreas posteriores','hardware','71491612','71491612','71491612','Cableado en estado precario','Mantemiento de la red de cableado');

insert into tickets values(1, '2022-01-01', '08:00:00', 'Pendiente', 'alta', 'media', 'Mantenimiento de la red principal', 'Hardware', '71491612', '71491612', '71491612',1);