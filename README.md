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
- ### ANALISIS
  ---
    El desarrollo del proyecto involucró diversas herramientas para garantizar una implementación eficiente. Para el diseño, se utilizaron Data Modeler y Excalidraw, facilitando la estructuración y visualización del modelo de datos. En la fase de implementación, se empleó Oracle como sistema de gestión de bases de datos, asegurando un almacenamiento robusto y eficiente de la información. Además, para la creación de la API, se utilizó Node.js, permitiendo una comunicación ágil y escalable entre los distintos componentes del sistema.
  ***
- ### DISEÑO
  ***
  * MODELO CONCEPTUAL
    ![Modelo_Conceptual](/Imgs/modelo_logico.excalidraw.png)
  * MODELO LOGICO
    ![Modelo_logico](/Imgs/Logical.png)
  * MODELO FISICO
    ![Modelo_fisico](/Imgs/Relational_1.png)
  ***
- ### NORMALIZACION
  ***
  - **1FN**
    - TABLA PAGO
        ##### sin aplicar normalizacion
        | Nombre columna  | id_pago | id_orden_pago | method_payment | status | monto  |
        |----------------|---------|--------------|---------------|--------|--------|
        |  **tipo clave**  | PK      |              |               |        |        |
         | **No Nula = NN, Unica = U** | NN, U  | NN           | NN            | NN     | NN     |
        | **Tipo dato**  | int     | int          | char          | char   | double |
        | **length**     |         |              | 256           | 256    |        |

        ##### normalizada
        | Nombre columna  | id_method_payment | tipo  |     
        |----------------|------------------|------|
        | **tipo clave**  | PK               |      |
        | **No Nula = NN, Unica = U** | NN, U  | NN   |
        | **Tipo dato**  | int              | char |
        | **length**     |                  | 256  |

        | Nombre columna  | id_pago | id_orden_pago | id_method_payment | status | monto  |
        |----------------|---------|--------------|------------------|--------|--------|
        | **tipo clave**  | PK      |              |                  |        |        |
        | **No Nula = NN, Unica = U** | NN, U | NN           | NN               | NN     | NN     |
        | **Tipo dato**  | int     | int          | int              | char   | double |
        | **length**     |         |              |                  | 256    |        |

    ***
  - **2FN**
      - TABLA ENVIOS
        ##### Sin aplicar normalizacion
 
        | Nombre columna  | id_envios | id_orden | transportista | tracking | status | address |
        |----------------|----------|---------|--------------|---------|--------|---------|
        | **tipo clave**  | PK       |         |              |         |        |         |
        | **No Nula = NN, Unica = U** | NN, U   | NN      | NN           | NN      | NN     | NN      |
        | **Tipo dato**  | int      | int     | char         | int     | char   | char    |
        | **length**     |          | 256     |             | 256     | 256    |         |

        ##### Normalizada
        | Nombre columna  | id_envios | id_orden | id_transportista | tracking | status | address |
        |----------------|----------|---------|-----------------|---------|--------|---------|
        | **tipo clave**  | PK       |         |                 |         |        |         |
        | **No Nula = NN, Unica = U** | NN, U   | NN      | NN              | NN      | NN     | NN      |
        | **Tipo dato**  | int      | int     | int             | int     | char   | char    |
        | **length**     |          |         |                 | 256     | 256    |         |

        | Nombre columna   | id_transportista | transportista |
        |------------------|------------------|---------------|
        | Tipo clave       | PK               |               |
        | No Nula = NN     | NN               | NN            |
        | Unica = U        | U                |               |
        | Tipo dato        | int              | char          |
        | Length           |                  | 256           |

    ***
  - **3FN**
    - No se aplicó la 3FN en ninguna tabla porque la base de datos es relativamente simple y no se encontraron dependencias transitivas importantes que lo requirieran. En muchos casos, forzar una normalización excesiva puede complicar innecesariamente el diseño de la base de datos, haciendo que sea más difícil de implementar y mantener. Además, en este caso, no se consideró que la normalización avanzada aportara grandes beneficios, ya que la estructura actual ya es eficiente para las necesidades del proyecto.

  ***
 - ### TABLAS
     ***
    - CUSTOMERS 
        | Nombre columna    | id_cliente | dpi   | name  | lastname | email | password | phone | status | fecha_registro | confirmed |
        |-------------------|------------|-------|-------|----------|-------|----------|-------|--------|----------------|-----------|
        | Tipo clave        | PK         |       |       |          |       |          |       |        |                |           |
        | No Nula = NN      | NN         | NN    | NN    | NN       | NN    | NN       | NN    | NN     | NN             | NN        |
        | Unica = U         | U          |       |       |          |       |          |       |        |                |           |
        | Tipo dato         | int        | int   | char  | char     | char  | char     | int   | char   | date           | bool      |
        | Length            |            |       | 256   | 256      | 256   | 256      | 256   |        |                |           |

    - WORKERS
       | Nombre columna    | id_cliente | dpi   | name  | lastname | email | password | phone | status | fecha_registro | confirmed |
        |-------------------|------------|-------|-------|----------|-------|----------|-------|--------|----------------|-----------|
        | Tipo clave        | PK         |       |       |          |       |          |       |        |                |           |
        | No Nula = NN, Unica = U | NN, U   | NN    | NN    | NN       | NN    | NN       | NN    | NN     | NN             | NN        |
        | Tipo dato         | int        | int   | char  | char     | char  | char     | int   | char   | date           | bool      |
        | Length            |            |       | 256   | 256      | 256   | 256      | 256   |        |                |           |

    - JOB_TITLE
        | Nombre columna    | id_cargo | cargo |
        |-------------------|----------|-------|
        | Tipo clave        | PK       |       |
        | No Nula = NN, Unica = U | NN, U  | NN    |
        | Tipo dato         | int      | char  |
        | Length            |          | 256   |


    - INVENTORY
        | Nombre columna    | id_inventario | id_sede | id_producto | cant |
        |-------------------|---------------|---------|-------------|------|
        | Tipo clave        | PK            |         |             |      |
        | No Nula = NN, Unica = U | NN, U      | NN      | NN          | NN   |
        | Tipo dato         | int           | int     | int         | int  |
        | Length            |               |         |             |      |

    - IMAGES
        | Nombre columna    | id_img | id_producto | link_img |
        |-------------------|--------|-------------|----------|
        | Tipo clave        | PK     |             |          |
        | No Nula = NN, Unica = U | NN, U | NN         | NN       |
        | Tipo dato         | int    | int         | char     |
        | Length            |        |             | 256      |

    - ADDRESS
        | Nombre columna    | id_address | id_cliente | address |
        |-------------------|------------|------------|---------|
        | Tipo clave        | PK         |            |         |
        | No Nula = NN, Unica = U | NN, U   | NN         | NN      |
        | Tipo dato         | int        | int        | char    |
        | Length            |            |            | 256     |

    - PAYMENT_METHOD
        | Nombre columna    | id_method_payment | tipo |
        |-------------------|-------------------|------|
        | Tipo clave        | PK                |      |
        | No Nula = NN, Unica = U | NN, U           | NN   |
        | Tipo dato         | int               | char |
        | Length            |                   | 256  |

    - CATEGORY
        | Nombre columna    | id_cate | name |
        |-------------------|---------|------|
        | Tipo clave        | PK      |      |
        | No Nula = NN, Unica = U | NN, U  | NN   |
        | Tipo dato         | int     | char |
        | Length            |         | 256  |

    - PRODUCTS
        | Nombre columna    | id_producto | sku   | name  | precio | slug | disponibilidad |
        |-------------------|-------------|-------|-------|--------|------|-----------------|
        | Tipo clave        | PK          |       |       |        |      |                 |
        | No Nula = NN, Unica = U | NN, U    | NN    | NN    | NN     | NN  | NN              |
        | Tipo dato         | int         | char  | char  | double | char | char            |
        | Length            |             | 256   | 256   |        | 256  | 256             |

    - BRANCHES
       | Nombre columna    | id_sede | name |
        |-------------------|---------|------|
        | Tipo clave        | PK      |      |
        | No Nula = NN, Unica = U | NN, U  | NN   |
        | Tipo dato         | char    | char |
        | Length            | 256     | 256  |
 
    - CARRIERS 
        | Nombre columna    | id_transportista | transportista |
        |-------------------|------------------|---------------|
        |        Tipo clave        | PK               |               |
        | No Nula = NN, Unica = U | NN, U         | NN            |
        | Tipo dato         | int              | char          |
        | Length            |                  | 256           |

    - PURCHASE_ORDERS
        | Nombre columna    | id_orden | id_cliente |
        |-------------------|----------|------------|
        | Tipo clave        | PK       |            |
        | No Nula = NN, Unica = U | NN, U  | NN         |
        | Tipo dato         | int      | int        |
        | Length            |          |            |

    - SHIPMENTS
        | Nombre columna    | id_envios | id_orden | id_transportista | tracking | status | address |
        |-------------------|-----------|----------|------------------|----------|--------|---------|
        | Tipo clave        | PK        |          |                  |          |        |         |
        | No Nula = NN, Unica = U | NN, U   | NN       | NN               | NN       | NN     | NN      |
        | Tipo dato         | int       | int      | int              | int      | char   | char    |
        | Length            |           | 256      | 256              |          | 256    | 256     |

    - PAYMENTS
        | Nombre columna        | id_pago | id_orden_pago | id_method_payment | status | monto |
        |-----------------------|---------|---------------|-------------------|--------|-------|
        | tipo clave            | PK      |               |                   |        |       |
        | No Nula = NN, Unica = U | NN, U   | NN            | NN                | NN     | NN    |
        | Tipo dato             | int     | int           | int               | char   | double|
        | length                |         |               | 256               |        |       |

    - DEPARTMENT
        | Nombre columna        | id_departamento | name |
        |-----------------------|-----------------|------|
        | tipo clave            | PK              |      |
        | No Nula = NN, Unica = U | NN, U           | NN   |
        | Tipo dato             | int             | char |
        | length                |                 | 256  |

    - RETURNS
        | Nombre columna        | id_devolucion | id_orden | id_producto | motivo | status |
        |-----------------------|---------------|----------|-------------|--------|--------|
        | tipo clave            | PK            |          |             |        |        |
        | No Nula = NN, Unica = U | NN, U         | NN       | NN          | NN     | NN     |
        | Tipo dato             | int           | int      | int         | char   | char   |
        | length                |               | 256      | 256         |        | 256    |

    - TRANSFERS
        | Nombre columna        | id_traslado | location_origin | location_destiny | status | date_arrive | request_at |
        |-----------------------|-------------|-----------------|-------------------|--------|-------------|------------|
        | tipo clave            | PK          |                 |                   |        |             |            |
        | No Nula = NN, Unica = U | NN, U       | NN              | NN                | NN     | NN          | NN         |
        | Tipo dato             | int         | char            | char              | char   | date        | date       |
        | length                |             | 256             | 256               |        |             |            |

    - LIST_PRODUCTS
        | Nombre columna        | product_id | orden_id | quantity | precio |
        |-----------------------|------------|----------|----------|--------|
        | tipo clave            | PK         |          |          |        |
        | No Nula = NN, Unica = U | NN, U      | NN       | NN       | NN     |
        | Tipo dato             | int        | int      | int      | double |
        | length                |            |          |          |        |


  ***
- ### SCRIPT DE CREACION DE BASE DE DATOS
  ***
```sql
CREATE USER
    c##juanj
IDENTIFIED BY
    G3R4RDI
DEFAULT TABLESPACE
    USERS
QUOTA UNLIMITED ON
    USERS;

GRANT CONNECT, RESOURCE TO c##juanj;

-- 1.CUSTOMERS --
CREATE TABLE CUSTOMERS (
  ID INTEGER CONSTRAINT customer_id_pk PRIMARY KEY,
  DPI NUMBER(13,0) CONSTRAINT customer_dpi_nn NOT NULL,
  NAME VARCHAR(256) CONSTRAINT customer_name_nn NOT NULL,
  LASTNAME VARCHAR(256) CONSTRAINT customer_lastname_nn NOT NULL,
  EMAIL VARCHAR(256) CONSTRAINT customer_email_uk UNIQUE NOT NULL ,
  PASSWORD VARCHAR(256) CONSTRAINT customer_password_nn NOT NULL,
  PHONE INTEGER CONSTRAINT customer_phone_nn NOT NULL ,
  STATUS VARCHAR(10) CONSTRAINT customer_status_ch CHECK (STATUS IN ('true', 'false')),
  REGISTER TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONFIRMED_EMAIL VARCHAR(10) CONSTRAINT customer_confirm_email_ck CHECK (CONFIRMED_EMAIL IN ('true', 'false')),
  CREATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UPDATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

--2.ADDRESS --
CREATE TABLE  ADDRESSES (
    ID INTEGER CONSTRAINT address_id_pk PRIMARY KEY,
    ID_CUSTOMER INTEGER CONSTRAINT address_id_customer_fk REFERENCES CUSTOMERS(ID) ON DELETE CASCADE,
    ADDRESS VARCHAR(256) CONSTRAINT address_address_nn NOT NULL ,
    CREATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

--3.PAYMENT_METHOD
CREATE TABLE PAYMENT_METHOD(
    ID INTEGER CONSTRAINT payment_m_id_pk PRIMARY KEY,
    ID_CUSTOMER INTEGER CONSTRAINT payment_m_id_customer_fk REFERENCES CUSTOMERS(ID) ON DELETE CASCADE,
    TYPE VARCHAR(256) CONSTRAINT payment_m_type_nn NOT NULL,
    CREATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

--4.CATEGORY --
CREATE TABLE CATEGORY(
    ID INTEGER CONSTRAINT category_id_pk PRIMARY KEY,
    NAME VARCHAR(256) CONSTRAINT category_name_nn NOT NULL,
    CREATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

--5.PRODUCTS --
CREATE TABLE PRODUCTS(
    ID INTEGER CONSTRAINT product_id_pk PRIMARY KEY,
    SKU VARCHAR(8) CONSTRAINT product_sku_nn NOT NULL ,
    NAME VARCHAR(256) CONSTRAINT product_name_nn NOT NULL,
    PRICE NUMBER(38,2) CONSTRAINT product_price_nn NOT NULL,
    SLUG VARCHAR(256) CONSTRAINT product_slug_nn NOT NULL,
    DESCRIPTION VARCHAR(512) CONSTRAINT product_description_nn NOT NULL,
    ACTIVE VARCHAR(5) CONSTRAINT products_active_ck CHECK ( ACTIVE in ('TRUE','FALSE')),
    CATEGORY_ID INTEGER CONSTRAINT product_category_id_fk REFERENCES CATEGORY(ID) ON DELETE SET NULL,
    CREATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

--6.IMAGES --
CREATE TABLE IMAGES(
    ID INTEGER CONSTRAINT imgs_id_pk PRIMARY KEY,
    ID_PRODUCT INTEGER CONSTRAINT imgs_id_product_fk REFERENCES PRODUCTS(ID) ON DELETE CASCADE,
    LINK varchar(256) CONSTRAINT imgs_link_nn NOT NULL,
    CREATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

--7.BRANCHES --
CREATE TABLE BRANCHES(
    ID INTEGER CONSTRAINT branch_id_pk PRIMARY KEY,
    NAME VARCHAR(256) CONSTRAINT branch_name_nn NOT NULL,
    CREATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

--8.INVENTORY --
CREATE TABLE INVENTORY(
    ID INTEGER CONSTRAINT inventory_id_pk PRIMARY KEY,
    ID_BRANCH INTEGER CONSTRAINT inventory_id_branch_fk REFERENCES BRANCHES(ID) ON DELETE CASCADE,
    ID_PRODUCT INTEGER CONSTRAINT inventory_id_product_fk REFERENCES PRODUCTS(ID) ON DELETE CASCADE,
    QUANTITY INTEGER CONSTRAINT inventory_quantity_nn NOT NULL,
    CREATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

--9.CARRIER --
CREATE TABLE CARRIERS(
    ID INTEGER CONSTRAINT carriers_id_pk PRIMARY KEY,
    NAME_CARRIER VARCHAR(256) CONSTRAINT carriers_name_carrier_nn NOT NULL ,
    CREATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

--10.PURCHASE_ORDERS --
CREATE TABLE PURCHASE_ORDERS(
    ID INTEGER CONSTRAINT purchase_order_id_pk PRIMARY KEY,
    ID_CUSTOMER INTEGER  CONSTRAINT purchase_order_id_customer_fk REFERENCES CUSTOMERS(ID) ON DELETE CASCADE,
    CREATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

--11.SHIPMENTS --
CREATE TABLE SHIPMENTS(
    ID INTEGER CONSTRAINT shipments_id_pk PRIMARY KEY,
    ID_ORDER INTEGER CONSTRAINT shipments_id_order_fk REFERENCES PURCHASE_ORDERS(ID) ON DELETE CASCADE,
    ID_CARRIER INTEGER CONSTRAINT shipments_id_carrier_fk REFERENCES CARRIERS(ID) ON DELETE CASCADE,
    STATUS VARCHAR(25) CONSTRAINT shipments_status_ck CHECK ( STATUS in ('DELIVERED','FAILED','COMMING')),
    ADDRESS VARCHAR(256) CONSTRAINT shipments_address_nn NOT NULL,
    CREATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

--12.PAYMENTS --
CREATE TABLE PAYMENTS(
    ID INTEGER CONSTRAINT payment_id_pk PRIMARY KEY,
    ID_PURCHASE_ORDER INTEGER CONSTRAINT payment_id_purchase_fk REFERENCES PURCHASE_ORDERS(ID) ON DELETE CASCADE,
    ID_PAYMENT_METHOD INTEGER CONSTRAINT payment_id_method_fk REFERENCES PAYMENT_METHOD(ID) ON DELETE SET NULL ,
    STATUS VARCHAR(15) CONSTRAINT payment_status_ck CHECK ( STATUS IN ('PAID','PENDING','FAILED')),
    AMOUNT NUMBER(38,2) CONSTRAINT payment_amount_nn NOT NULL,
    CREATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

--13.ROLE --
CREATE TABLE JOB_TITLE(
    ID INTEGER CONSTRAINT job_title_id_pk PRIMARY KEY,
    NAME VARCHAR(256) CONSTRAINT job_title_name_nn NOT NULL,
    CREATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);



--14.DEPARTMENT --
CREATE TABLE DEPARTMENT(
    ID INTEGER CONSTRAINT department_id_pk PRIMARY KEY,
    NAME VARCHAR(256) CONSTRAINT department_name_nn NOT NULL,
    CREATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

--15.WORKERS --
CREATE TABLE WORKERS(
    ID INTEGER CONSTRAINT worker_id_pk PRIMARY KEY,
    DPI NUMBER(13,0) CONSTRAINT worker_dpi_un UNIQUE,
    NAME VARCHAR(256) CONSTRAINT worker_name_nn NOT NULL,
    LASTNAME VARCHAR(256) CONSTRAINT worker_lastname_nn NOT NULL,
    PHONE INTEGER CONSTRAINT worker_phone_nn NOT NULL,
    EMAIL VARCHAR(256) CONSTRAINT worker_email_nn   NOT NULL,
    ID_JOB_TITLE INTEGER CONSTRAINT worker_id_job_title_fk REFERENCES JOB_TITLE(ID) ON DELETE SET NULL,
    ID_DEPARTMENT INTEGER CONSTRAINT worker_id_department REFERENCES DEPARTMENT(ID) ON DELETE SET NULL,
    STATUS VARCHAR(10) CONSTRAINT worker_status_ck CHECK ( status in ('TRUE','FALSE')),
    CREATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

--16.LIST_PRODUCTS --
CREATE TABLE LIST_PRODUCTS(
    ID INTEGER CONSTRAINT list_products_id_pk PRIMARY KEY,
    ID_ORDER_PURCHASE INTEGER CONSTRAINT list_product_id_order_fk REFERENCES PURCHASE_ORDERS(ID) ON DELETE CASCADE,
    ID_PRODUCT INTEGER CONSTRAINT list_product_id_product_fk REFERENCES PRODUCTS(ID) ON DELETE CASCADE,
    QUANTITY INTEGER CONSTRAINT list_product_quantity_nn NOT NULL,
    PRICE NUMBER(38,2) CONSTRAINT list_product_price_nn NOT NULL,
    CREATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

--17.RETURNS --
CREATE TABLE RETURNS(
    ID INTEGER CONSTRAINT return_id_pk PRIMARY KEY,
    ID_ORDER INTEGER CONSTRAINT return_id_order_fk REFERENCES PURCHASE_ORDERS(ID) ON DELETE CASCADE,
    ID_PRODUCT INTEGER CONSTRAINT return_id_product_fk REFERENCES PRODUCTS(ID),
    DESCRIPTION VARCHAR(512) CONSTRAINT return_description_nn NOT NULL,
    STATUS VARCHAR(15) CONSTRAINT return_status_ck CHECK ( STATUS in('PENDING','APROVED','REQUESTED','REJECTED')),
    CREATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

--18.TRANSFERS --
CREATE TABLE TRANSFERS(
    ID INTEGER CONSTRAINT transfer_id_pk PRIMARY KEY,
    ID_LOCATION_ORIGIN INTEGER CONSTRAINT transfer_id_origin REFERENCES BRANCHES(ID) ON DELETE CASCADE,
    ID_LOCATION_DESTINY INTEGER CONSTRAINT transfer_id_destiny REFERENCES BRANCHES(ID) ON DELETE CASCADE,
    STATUS VARCHAR(15) CONSTRAINT transfer_status_ck CHECK (STATUS in ('APPROVED','REJECTED','REQUESTED','PENDING')),
    DATE_ARRIVE TIMESTAMP WITH TIME ZONE CONSTRAINT transfer_date_arrive_nn NOT NULL,
    REQUEST_AT TIMESTAMP WITH TIME ZONE CONSTRAINT transfer_request_nn NOT NULL,
    CREATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

commit;
```

  
    

- ### API
    ***

```js
const express = require('express')
const oracledb = require('oracledb')

const app = express()

const port = 3000

const db = {
    user    :"SYSTEM",
    password: 'G3R4RDI',
    connectionString: 'localhost:1522/FREE'
}

async function connectToDB() {
    const connectiondb = await oracledb.getConnection({
        user    :"c##juanjo",
        password: 'G3R4RDI',
        connectionString: 'localhost:1522/FREE'
    })    
    await connectiondb.close()
}

connectToDB()

app.get('/',(req,res)=>{
    res.send('Hello world!')
})

app.get('/ping', async (req, res) => {
    let connection;
    try {
      connection = await oracledb.getConnection(db);
      const result = await connection.execute('SELECT SYSDATE FROM DUAL');
      res.json(result.rows);
    } catch (err) {
      console.error('Error al consultar la base de datos:', err);
      res.status(500).send('Error en la consulta');
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  });

app.listen(port,()=>{
    console.log(`example app listening on port ${port} :)`)
})

```