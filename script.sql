use kanbanboard;
---id int, transDate date, transTime time, status varchar(15), priority int, complexity int, description varchar(30), tipo varchar(12), solicitante varchar(10), asignado varchar(10), responsable varchar(10)
insert into usuarios value('47262447','Daniel','Santillan','daniel.santillan@gmail.com','51949944564','163cb77637d5047f42ab4b4c7cda4730','sistemas','admin','activo');
insert into usuarios value('71491612','Pedro','Alvarez','pedroangel.alvarez24@gmail.com','51977614614','1f7a5cc0ca62425542c8e6841a001211','sistemas','admin','activo');
insert into usuarios value('74292658','Karol','Flores','karol.flores@gmail.com','51996865541','21e43e1ead960b8e3a1a386e8950ccfa','demuna','trabajador','activo');
insert into usuarios value('72858693','Gianella','Espinoza','gianella.espinoza@gmail.com','51984694845','3ef1be49b1e705bd393aa01e78edfbb6','demuna','trabajador','activo');

insert into incidentes values(1,'2022-09-01','09:00','2022-09-01','09:20','Cancelado','alta','media','No hay internet en la oficina','Redes','51984694845','71491612','71491612','No hay internet en la oficina','Cambio de cable de red');
insert into incidentes values(2,'2022-09-01','09:11','2022-09-01','09:22','Completado','alta','media','Cableado en estado precario','Redes','51984694845','71491612','71491612','Cableado en estado precario','Cambio de cable de red');
insert into incidentes values(3,'2022-09-01','09:15','2022-09-01','09:20','Cancelado','alta','media','No hay internet en la oficina','Redes','51996865541','71491612','71491612','No hay internet en la oficina','Cambio de cable de red');
insert into incidentes values(4,'2022-09-02','12:01','2022-09-02','12:09','Completado','alta','media','No tengo instalado Microsoft Visio','Software','51996865541','71491612','71491612','No tengo instalado Microsoft Visio','Instalar Microsoft Visio');
insert into incidentes values(5,'2022-09-05','10:05','2022-09-02','10:08','Completado','alta','media','Conexión de internet lenta','Redes','51984694845','71491612','71491612','Monitor parpadea','Cable de monitor flojo');
insert into incidentes values(6,'2022-09-05','11:05','2022-09-02','11:10','Completado','alta','media','Microsoft Office no está activado','Hardware','51984694845','71491612','71491612','Monitor parpadea','Cable de monitor flojo');
insert into incidentes values(7,'2022-09-06','09:05','2022-09-05','09:18','Completado','alta','media','Conexion a internet se corta de repente','Redes','51984694845','71491612','71491612','Monitor parpadea','Cable de monitor flojo');
insert into incidentes values(8,'2022-09-06','12:35','2022-09-05','10:08','Completado','alta','media','Teclado no funciona','Hardware','51984694845','71491612','71491612','Monitor parpadea','Cable de monitor flojo');
insert into incidentes values(9,'2022-09-06','10:00','2022-09-05','10:08','Completado','alta','media','No tengo instalado Outlook','Software','51984694845','71491612','71491612','Monitor parpadea','Cable de monitor flojo');
insert into incidentes values(10,'2022-09-07','11:37','2022-09-05','10:08','Completado','alta','media','No encuentro un archivo en mi PC','Software','51984694845','71491612','71491612','Monitor parpadea','Cable de monitor flojo');
insert into incidentes values(11,'2022-09-07','12:42','2022-09-05','10:08','Completado','alta','media','Se apagó mi monitor','Hardware','51984694845','71491612','71491612','Monitor parpadea','Cable de monitor flojo');
insert into incidentes values(12,'2022-09-07','15:05','2022-09-05','10:08','Completado','alta','media','Se salió la tecla Control','Hardware','51984694845','71491612','71491612','Monitor parpadea','Cable de monitor flojo');
insert into incidentes values(13,'2022-09-08','16:09','2022-09-05','10:08','Completado','alta','media','El internet está muy lento','Hardware','51984694845','71491612','71491612','Monitor parpadea','Cable de monitor flojo');


insert into tickets values(1,'2022-09-01','09:00','2022-09-01','09:20','Completado','alta','media','No hay internet en la oficina','Redes','51984694845','71491612','71491612',2);
insert into tickets values(2,'2022-09-01','09:11','2022-09-01','09:22','Completado','alta','media','Cableado en estado precario','Redes','51984694845','71491612','71491612',2);
insert into tickets values(3,'2022-09-01','09:15','2022-09-01','09:20','Completado','alta','media','No hay internet en la oficina','Redes','51996865541','71491612','71491612',2);
insert into tickets values(4,'2022-09-02','12:01','2022-09-02','12:09','Completado','alta','media','No tengo instalado Microsoft Visio','Software','51996865541','71491612','71491612',4);
insert into tickets values(5,'2022-09-05','10:05','2022-09-02','10:08','Completado','alta','media','Conexión de internet lenta','Redes','51984694845','71491612','71491612',5);
insert into tickets values(6,'2022-09-05','11:05','2022-09-02','10:08','Completado','alta','media','Microsoft Office no está activado','Hardware','51984694845','71491612','71491612',6);
insert into tickets values(7,'2022-09-06','09:05','2022-09-02','10:08','Completado','alta','media','Conexion a internet se corta de repente','Redes','51984694845','71491612','71491612',7);
insert into tickets values(8,'2022-09-06','12:35','2022-09-02','10:08','Completado','alta','media','Teclado no funciona','Hardware','51984694845','71491612','71491612',8);
insert into tickets values(9,'2022-09-06','10:00','2022-09-02','10:08','Completado','alta','media','No tengo instalado Outlook','Software','51984694845','71491612','71491612',9);
insert into tickets values(10,'2022-09-07','11:37','2022-09-02','10:08','Completado','alta','media','No encuentro un archivo en mi PC','Software','51984694845','71491612','71491612',10);
insert into tickets values(11,'2022-09-07','12:42','2022-09-02','10:08','Completado','alta','media','Se apagó mi monitor','Hardware','51984694845','71491612','71491612',11);
insert into tickets values(12,'2022-09-07','15:05','2022-09-02','10:08','Completado','alta','media','Se salió la tecla Control','Hardware','51984694845','71491612','71491612',12);
insert into tickets values(13,'2022-09-08','16:09','2022-09-02','10:08','Completado','alta','media','El internet está muy lento','Redes','51984694845','71491612','71491612',13);

