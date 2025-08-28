# Prueba_desarrollador_BRM
Proyecto usado como prueba tecnica para el cargo Backend Junior en la empresa BRM 

### Instrucciones
1. Descargue o clone el repositorio
2. Acceda a la carpeta del proyecto desde su editor de código
3. Ejecute **npm install** para instalar las dependencias
4. Cambie el nombre del archivo **test.enviroment** a **.env**
5. Cree en su servidor la base de datos que usara para validar el proyecto
6. Abra el archivo **.env** y configure las variable de su servidor para la conexión con la base de datos
7. Una vez la conexión este hecha, ejecute el comando **npm run sync** que creara las tablas en su base
8. Para la prueba de los endpoints se uso Invoke-RestMethod en PowerShell de windows, encontrara ejemplos de ejecución en el documento "Pruebas_Uri_windows.txt"
9. El endpoint de crear usuario, solo permite crear usuario tipo cliente, esto pensando en la seguridad desde el front, por ende para tener un usuario admin, cree el usuario y luego en la base cambie el rol_id a 1

### Como probar rutas protegidas
1. Cree el usuario
2. Maximize la terminal de poweShell
3. Use el endpoint de login para acceder con el siguiente código, cmabiando los datos a los de su usuario:
  $response = Invoke-RestMethod -Uri "http://localhost:4000/api/auth/login" `
    -Method POST `
    -Headers @{ "Content-Type" = "application/json" } `
    -Body '{ "email": "juan@test.com", "password": "123456" }'
  Write-Output $response
4. Copie el codigo de respuesta, dado que es el que se usara en la cabecera para poder acceder a las rutas y probar su funcionamiento.
