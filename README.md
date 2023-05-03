# Semi1-1S-G1

Aplicación web similar a una aplicación para almacenamiento de fotos, esta permitirá subir todo tipo de fotos.



## Integrantes
| Nombre                       | Carné     |
|------------------------------|-----------|
| Marvin Eduardo Catalán Véliz | 201905554 |
| Sara Paulina Medrano Cojulún | 201908053 |
| Julio José Orellana Ruíz     | 201908120 |
| José Adrian Aguilar Sánchez  | 201901704 |


## Descripcion de la arquitectura que utilizaron

La arquitectura propuesta en el proyecto utiliza varios servicios de AWS para implementar una aplicación web de una red social también utiliza tecnologías de Inteligencia Artificial para mejorar la experiencia del usuario.

La aplicación se ejecuta en instancias de EC2 para levantar el backend y el frontend utilizando contenedores de docker y utiliza Buckets de S3 para almacenar las fotos. También se levanta la base de datos en la misma instancia con un contenedor de docker.

Para la autenticación de los usuarios se utiliza el servicio IAM de AWS y se implementa la funcionalidad de inicio de sesión con el uso de la cámara web mediante el uso de Amazon Rekognition para comparar la foto del usuario con la foto de perfil actual. Además, se utilizan varios servicios de Inteligencia Artificial de AWS, como Amazon Lex para implementar un chatbot, Amazon Rekognition para analizar las fotos y agregar etiquetas, y Amazon Translate para traducir la descripción de la foto a varios idiomas.


En resumen, la arquitectura utiliza varios servicios de AWS para implementar una aplicación web de almacenamiento de fotos que también utiliza tecnologías de Inteligencia Artificial para mejorar la experiencia del usuario.

## Usuarios IAM

#### Administrador_201908120, Admin_201908120

Estos usuarios se utilizaron para crear la instancia de RDS, EC2 y el load balancer que permite crear una un solo punto de entrada el cual se va redireccionara a los dos servidores que son las instancias de EC2.

##### Políticas:

- **AdministratorAccess**: La política de AWS AdministratorAccess es una política de seguridad que proporciona a los usuarios de AWS un acceso completo a todos los servicios y recursos de AWS. Esta política es una de las más poderosas de AWS, y solo se recomienda para usuarios altamente confiables que necesitan acceso total a todas las funciones de AWS.



#### admin_s3


##### Políticas:

- **IAMAccessAnalyzerFullAccess**: La política IAMAccessAnalyzerFullAccess es útil para los usuarios que necesitan realizar análisis de acceso en su entorno de AWS y tomar medidas para reducir los riesgos de seguridad.


- **AmazonS3FullAccess**: La política AmazonS3FullAccess es una política predefinida de AWS que otorga acceso completo a todos los recursos de Amazon S3 en una cuenta de AWS.



#### admin_EC2


##### Políticas:

- **AmazonEC2FullAccess**: Otorga a los usuarios permisos completos para administrar instancias de Amazon Elastic Compute Cloud (EC2). Esta política permite a los usuarios crear, modificar, detener y eliminar instancias de EC2, así como también acceder a sus respectivos registros y métricas. También otorga permisos para crear y administrar AMI (Amazon Machine Images), grupos de seguridad, volúmenes y snapshots de EBS (Elastic Block Store), entre otros recursos de EC2. Cabe destacar que esta política es bastante amplia y no es recomendable asignarla a usuarios a menos que realmente necesiten un acceso completo a los recursos de EC2.



#### administrador_Translate


##### Políticas:

- **TranslateFullAccess**: Otorga a los usuarios permisos completos para usar y administrar Amazon Translate. Amazon Translate es un servicio de traducción de idiomas de AWS que permite a los usuarios traducir texto de un idioma a otro utilizando modelos de aprendizaje automático. La política TranslateFullAccess otorga a los usuarios permisos para crear, modificar y eliminar recursos de Amazon Translate, como proyectos, documentos y pares de idiomas. También permite a los usuarios acceder a las métricas y registros de los recursos de Amazon Translate. Al igual que la política AmazonEC2FullAccess, la política TranslateFullAccess es bastante amplia y solo debe ser asignada a usuarios que necesiten un acceso completo a los recursos de Amazon Translate.



#### Administrador_rekognition


##### Políticas:

- **AmazonRekognitionFullAccess**: Es una política predefinida de AWS que otorga acceso completo a todos los servicios de Amazon Rekognition. Esto incluye acceso completo a todas las operaciones de API, como el reconocimiento de caras, el reconocimiento de texto en imágenes, la detección de objetos, la búsqueda de rostros, entre otras funcionalidades.

Con esta política, los usuarios tendrán la capacidad de crear, administrar y eliminar colecciones de imágenes, así como realizar el análisis y procesamiento de imágenes utilizando las herramientas de Amazon Rekognition. Es importante destacar que esta política otorga un amplio nivel de acceso a los recursos de AWS, por lo que debe ser otorgada cuidadosamente y solo a usuarios confiables y autorizados que necesiten realizar tareas relacionadas con la visión por computadora y análisis de imágenes.

- **AmazonS3FullAccess**: La política AmazonS3FullAccess es una política predefinida de AWS que otorga acceso completo a todos los recursos de Amazon S3 en una cuenta de AWS. En el proyecto nos da la funcionalidad de dar lectura al bucket de s3 para la obtencion de las fotos.



#### administrador_lex


##### Políticas:

- **AmazonLexFullAccess**: La política de AmazonLexFullAccess proporciona acceso completo a los servicios de Amazon Lex y a todas las acciones permitidas en esos servicios. Con esta política, se puede crear y administrar bots de conversación utilizando Amazon Lex, así como también acceder a otros recursos de AWS que se requieren para crear y administrar bots, como IAM, CloudFormation, S3, Lambda, entre otros. En resumen, esta política permite a los usuarios tener control completo sobre todos los aspectos de los bots de conversación creados con Amazon Lex.




## Descripción de las funcionalidades implementadas en el chatbot


### Entrada

En interacciones de entrada se tienen las siguientes posibilidades:
- hola
- me gustaria pedir una solucion

Al ecribir de estas posibles entradas el boto emepzara a preguntar y tomar informaciones:

### Primera solicitud de información

El ChatBot pregunta: Presentas una duda o una pregunta el dia de hoy, ¿Si?


posibles respuestas del usuario:
- si

esta respuesta lo direcciona a la segunda entrada de informacion.

### Segunda solicitud de información

el ChatBot pregunta: Que ayuda e información te puedo brindar, escribe la pregunta: ¿Horarios de cursos, Redes de estudio, Calendario de labores, Tengo correo de ingeniería y Cursos de primer ingreso?


posibles respuestas del usuario:
- Horarios de cursos
- Redes de estudio
- Calendario de labores
- Tengo correo de ingeniería
- Cursos de primer ingreso

Al dar esta respueta el usuario, consulta el bakcup de respuesta, la compara y almacena la solucion para darla al final.


### Confirmacion

luego de seleccionar lo anterior pasa a la confirmacion donde el bot pregunta: ¿Quieres que realice tu petición?
hay dos posibilidades de respuesta:
- si
- no

Posibles salidas:

si la respuesta es si nos redirige a la salia o repsueta de cierra

Si la respuesat es no, nos lanza la respuesta: Quédate con la duda, amigo.


### Salida


respectivamente en el orden de la segunda solicitud informacion. nos mostraria las siguientes respuetas:
- Los horarios de este semestre se encuentran el siguiente enlace:
- Redes de estudio de las carreras de ingenieria se encuentran en el siguiente enlace:
- El calendario de labores de ingenieria esta en el enlace:
- Si, a todos los estudiantes inscritos se les crea un correo en correo.ingenieria.usac.edu.gt, la contraseña para poder ingresar es la misma que utiliza para ingresar al portal estudiantil, la cuenta es <número de dpi>@ingenieria.usac.edu.gt
- A los estudiantes de primer ingreso y con carnet del año en curso se les asigna automáticamente, no es necesario que realicen el procedimiento en el portal de ingeniería, esto única y exclusivamente para el primer semestre. Luego del primer semestre los estudiantes son responsables de su asignación (incluyendo curso de vacaciones de junio).


## Descripción de las funciones de Amazon Rekognition implementadas

### Compare Faces

Esta funcionalidad permite comparar dos imágenes y determinar si contienen la misma persona. En términos más técnicos, la función compara los rostros detectados en cada imagen y devuelve una puntuación de similitud. Esto puede ser útil en aplicaciones de autenticación, seguridad o para encontrar imágenes similares en grandes colecciones de fotos.

### Detect Labels

Esta función permite detectar objetos y escenas en imágenes. La función analiza la imagen y devuelve una lista de etiquetas que describen los objetos y las escenas que se encuentran en la imagen. Esto puede ser útil en aplicaciones de búsqueda y clasificación de imágenes, así como en aplicaciones de reconocimiento visual, como la identificación de objetos en tiempo real en videos de vigilancia.
