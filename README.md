Prueba Tecnica de Wepsys.

Pasos en la construcción de la Prueba:
Inicie la solución con VS y cree 3 proyectos que son los siguientes
PrebaWepsys.Repositorio: aquí está toda la lógica de la Base de datos.
1. Inicie creando la siguiente tabla en la BD 
Donde el ID es auto incrementable, adjunto el script sql por si se desea ejecutar el proyecto
2. En este caso trabaje y de hecho suelo trabajar con Database First, pues me permite diseñar mi BD de una forma visual y más sencilla para aplicar normalización. 3. Procedí a crear los servicios, estos servicios permiten las operaciones CRUD solicitadas utilizando EntityFramework.4. El método GuardarPersonaAsync aunque no se me pidió la opción de "EDITAR" me tomé la libertad de agregar esta opción, este método permite guardar archivos nuevos y editarlos si llega con un "ID". Este método valida si el correo ya existe como se solicitó y además valida en caso de "EDITAR" que el ID enviado de una persona sea válido.5. El método EliminarPersonaAsync busca el registro por ID y lo elimina.6. El método ListarPersonasAsync busca todos los registros, sin embargo, este cuenta con parámetros para facilitar la paginación en el front end.

PrebaWepsys.API: Este es básicamente el intermediario entre el Repositorio y Front End.
1. Se agregó el conection string al appconfig y se injecto la dependencia de la BD y los servicios creados en el repositorio.2. Se creó un DTO que tiene la primera validación de la entidad, usando DataAnnotations se colocó como requerido los campos que lo son y en caso del email se fuerza al usuario a que este sea un correo válido.3. Se creó el Controlador, que básicamente Mapea la información que entra y mapea la información que va a salir.
PrebaWepsys.FrontEND: Es la parte gráfica del sistema.
1. Se creó una estructura de carpeta que es la que suelo usar para organizar un poco el código, se instaló FORMIK para el formulario de agregar y editar, YUP para una doble validación, debemos tener en cuenta que en el backend también se valida la información que se envía del front-end, Material UI para los modales, tablas y básicamente todo lo gráfico, AXIOS para las consultas al API, en este caso no use ReactRouter pues todo lo hice en una misma página, llamando componentes.2. Se crearon Hooks customizados para colocar la mayor parte de la lógica del ajx de cada página.3. En la tabla se usó la paginación creada en el API creado anteriormente y además se agregó un Filtro.
