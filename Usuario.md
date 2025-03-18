# MANUAL TECNICO - PROYECTO 1
- ### DESCRIPCION DEL PROYECTO
  ***
  En el contexto de los sistemas de comercio electrónico, la gestión eficiente de
  datos es fundamental para garantizar el correcto funcionamiento de las
operaciones de compra, venta y distribución de productos. Este proyecto tiene
como objetivo el diseño y desarrollo de una base de datos relacional eficiente y
normalizada para un centro de ventas en línea de gran escala, similar a
plataformas como Amazon o Alibaba.
  ***
- ### DESCRIPCION DE HERRAMIENTAS 
Para utilizar la API, es necesario contar con diversas herramientas que facilitan su interacción y son bastante sencillas de usar. Una de las más populares es Postman, una aplicación que permite realizar consultas a la API de manera eficiente. Con Postman, se pueden realizar solicitudes utilizando los métodos HTTP más comunes en el desarrollo de aplicaciones web, como son: POST, GET, PUT y DELETE. 

El método GET se utiliza para obtener información de la API, el POST sirve para enviar datos al servidor, PUT se emplea para actualizar información existente y, finalmente, DELETE se usa para eliminar recursos. Gracias a herramientas como Postman, los desarrolladores pueden probar y depurar sus APIs de forma sencilla y rápida, facilitando el desarrollo y la integración de servicios.

![img_postman](/Imgs/Captura%20de%20pantalla%202025-03-17%20165249.png) 

- ### DESCRIPCION DE ENDPOINTS
  
**USERS**
  *  **POST: /api/users**
        ```JSON
        //Entrada de datos para crear nuevos usuarios
        {
            "username":"Marielos",
            "lastname":"Duarte",
            "dpi":859719760,
            "email":"mvrels@gmail.com",
            "password":"M4ri3l0s",
            "phone":22857391,
            "status":"FALSE"
        }
        ```
   

  *   **GET: /api/users/login**
        ```JSON
        //Entrada de datos para iniciar sesion en la api
        {
            "username": "jdoe",
            "password": "secret123"
        }
        ```
    
**PRODUCTS**
  *  **GET: /api/products**
        ```JSON
        //Listado de productos guardados en la base de datos
        {
            "products": [
                {
                    "id": 1,
                    "name": "Laptop X",
                    "price": 750.00,
                    "stock": 10
                },
                {
                    "id": 2,
                    "name": "Smartphone Y",
                    "price": 500.00,
                    "stock": 20
                }
            ]
        }
        ```
   

  *   **PUT: /api/products/:id**
        ```JSON
        //Entrada de datos para modificar datos del producto a elegir segun su id
        {
            "price": 700.00,
            "stock": 15
        }

        //Mensaje de confirmacion que se modifico el dato
        {
            "status": "success",
            "message": "Product updated successfully"
        }
        ```

**Gestion de Ordenes**
  *  **POST: /api/orders**
        ```JSON
        //Listado de Ordenes de compra con su respectivos productos comprados
        {
            "userId": 10,
            "items": [
                {"productId": 1, "quantity": 2},
                {"productId": 2, "quantity": 1}
            ],
            "shippingAddress": "Calle 123, Ciudad",
            "paymentMethod": "credit_card"
        }
        ```
   

  *   **GET: /api/orders/:id**
        ```JSON
        //Respuesta del servidor de la orden seleccionada segun su id
        {
            "orderId": 101,
            "userId": 10,
            "items": [
                {"productId": 1, "quantity": 2, "price": 750.00},
                {"productId": 2, "quantity": 1, "price": 300.00}
            ],
            "totalAmount": 1800.00,
            "status": "processing",
            "createdAt": "2025-02-01"
        }

        ```
