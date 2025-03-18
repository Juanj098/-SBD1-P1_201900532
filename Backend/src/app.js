const express = require('express')
const oracledb = require('oracledb')
const bcrypt = require('bcrypt')
const e = require('express')

const app = express()

app.use(express.json())

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

app.get('/customers',async(req,res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(db)
    const result = await connection.execute('SELECT name FROM CUSTOMERS')
    const names = result.rows.map(r => ({name:r[0]}))
    res.json(names)
  } catch (err){
    console.error('Error al consultar la base de datos:', err);
    res.status(500).send('Error en la consulta');
  }finally{
    await connection.close()
  }
});

app.get('/department',async(req,res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(db)
    const result = await connection.execute('SELECT * FROM DEPARTMENT')
    const names = result.rows.map(r => r)
    res.json(names)
  } catch (err){
    console.error('Error al consultar la base de datos:', err);
    res.status(500).send('Error en la consulta');
  }finally{
    await connection.close()
  }
});

app.post('/users',async(req,res)=>{
  console.log(req.body)
  const {username,lastname,dpi,email,password,phone,status} = req.body
  if (!username || !lastname || !email || !password || !phone || !dpi || !status){
    res.json({
              "error":400,
              "message":"Datos incompletos"
            })
  } else {
    console.log(password)
    let connection;
    let pass

    try {
      pass = await bcrypt.hash(password,15)  
    } catch (error) {
      console.error("Error al hacer hash de la contraseña:", error);
      return res.json({
        error: 500,
        message: "Error interno del servidor al hashear la contraseña"
      });
    }
    try {    
      connection = await oracledb.getConnection(db)
      // let totalusers = await connection.execute('SELECT COUNT(*) AS totalusers FROM CUSTOMERS')
      let totalusers = await connection.execute('SELECT * FROM CUSTOMERS ORDER BY id DESC')
      let tot = totalusers.rows[0][0]+1
      const newuser = await connection.execute(`INSERT INTO CUSTOMERS (id, dpi, name, lastname, email, password, phone, status, confirmed_email) VALUES (:id, :dpi, :name, :lastname, :email, :password, :phone, :status, :confirmed_email)`, 
      {
        id: tot,
        dpi: dpi,
        name: username,
        lastname: lastname,
        email: email,
        password: pass,
        phone: phone,
        status: status,
        confirmed_email: 'TRUE' 
      })
      await connection.commit();
      res.json({
        'status':'succes', 
        'message':'User created successfully'
      })
    } catch (error) {
      res.json({
        'status':'error', 
        'message':'El correo electrónico que ingresaste ya está registrado.'
      })
    } finally {
      await connection.close()
    }
  }
});


app.post('/users/login', async (req, res) => {
  let connection;
  const { email, password } = req.body;

  // Validar que se envió email y password
  if (!email || !password) {
    return res.json({
      "error": 401,
      "message": "Credenciales inválidas"
    });
  }

  try {
    connection = await oracledb.getConnection(db);

    const result = await connection.execute(
      'SELECT * FROM customers WHERE email = :email',
      { email: email },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    console.log(result.rows)

    if (result.rows.length === 0) {
      return res.json({
        "error": 401,
        "message": "Credenciales inválidas"
      });
    }

    const hashedPassword = result.rows[0].PASSWORD;

    const match = await bcrypt.compare(password, hashedPassword);

    if (match) {
      return res.json({
        "error": 200,
        "message": "Login exitoso"
      });
    } else {
      return res.json({
        "error": 401,
        "message": "Credenciales inválidas"
      });
    }

  } catch (error) {
    return res.json({
      "error": 500,
      "message": "Error del servidor: " + error.message
    });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
});


app.get('/users/:id',async (req,res)=>{
  let connection;
  const {id}=req.params
  try {
    connection = await oracledb.getConnection(db)
    let result = await connection.execute('SELECT * FROM customers WHERE id=:id',
      {id:id},
      {outFormat:oracledb.OUT_FORMAT_OBJECT}
    )

    if (result.rows.length > 0){
      let datauser = {
        id:result.rows[0].ID,
        dpi:result.rows[0].DPI,
        name:result.rows[0].NAME,
        lastname:result.rows[0].LASTNAME,
        email:result.rows[0].EMAIL,
        phone:result.rows[0].PHONE,
        createdAt:result.rows[0].CREATED_AT        
      }
      res.json(datauser)
    }else{
      res.json({
        "error":404,
        "message":"Usuario no encontrado"
      })
    }
  } catch (error) {
    res.json({
      "error":401,
      "message":"credenciales invalidas"
    })
  } finally {
    connection.close()
  }
})

app.put('/users/:id',async (req,res)=>{
  let connection;
  const id = req.params.id
  const data = req.body
  let items = []
  let updates = {id:id}

  if (Object.keys(data).length === 0) {
    return res.status(400).json({ error: 400, message: "No se enviaron campos para actualizar" });
  }

  Object.keys(data).forEach((key,index)=>{
    if(key.toLowerCase() == 'created_at' || key.toLowerCase() == 'password' || key.toLowerCase() == 'id'){
      return res.json({
        error:400,
        message:`${key} no se puede modificar`
      })
    }else{
      items.push(`${key} = :${key}`)
      updates[key] = data[key]
    }
  });
  try {
    const sql = `UPDATE customers SET ${items.join(', ')} WHERE id=:id`
    connection = await oracledb.getConnection(db)
    const resp = await connection.execute(sql,updates,{outFormat:oracledb.OUT_FORMAT_OBJECT})
    if(resp.rowsAffected == 0){
      return res.json({
        "status": 405,
        "message": "usuario no encontrado"
      })
    }
      await connection.commit()
      res.json({
        "status": "success",
        "message": "User updated successfully"
      })
    
  } catch (error) {
    res.json({
      "error":400,
      "message":error.message
    })
  }finally{
    if(connection){
      connection.close()
    }
  }
})

app.delete('/users/:id',async (req,res) => {
  const {id} = req.params
  let connection;
  try {
    connection = await oracledb.getConnection(db)
    const resp = await connection.execute('DELETE FROM customers WHERE id=:id',{id:id})
    if(resp.rowsAffected == 0){
      return res.json({
        status:404,
        message:"Usuario no existente"
      })
    }
    await connection.commit()
    res.json({
      "status": 200,
      "message": "User deleted/inactivated successfully"
    })
  } catch (error) {
    res.json({
      status:404,
      message:error.message
    })
  } finally {
    connection.close()
  }
})

app.get('/products',async (req,res)=>{
  let connection;
  try {
    connection = await oracledb.getConnection(db)
    const result = await connection.execute('SELECT * FROM PRODUCTS',{},{outFormat:oracledb.OUT_FORMAT_OBJECT})
    console.log(result.rows)
    res.json(result.rows)
  } catch (error) {
    res.json({
      'state':400,
      'message':error.message
    })
  }finally{
    if(connection){
      connection.close()
    }
  }
})

app.post('/products',async(req,res)=>{
  console.log(req.body)
  const {SKU, NAME, PRICE, SLUG, DESCRIPTION, ACTIVE, CATEGORY_ID} = req.body
  if (!SKU || !NAME || !PRICE || !SLUG || !DESCRIPTION || !ACTIVE || !CATEGORY_ID){
    res.json({
              "error":400,
              "message":"Datos incompletos"
            })
  } else {
    let connection;
    let pass

    try {    
      connection = await oracledb.getConnection(db)
      // let totalusers = await connection.execute('SELECT COUNT(*) AS totalusers FROM CUSTOMERS')
      let totalusers = await connection.execute('SELECT * FROM PRODUCTS ORDER BY id DESC')
      let tot = totalusers.rows[0][0]+1
      const newuser = await connection.execute(`INSERT INTO PRODUCTS (id, sku, name, price, slug, description, active, category_id) VALUES (:id, :sku, :name, :price, :slug, :description, :active, :category_id)`, 
      {
        id:tot,
        sku: SKU,
        name: NAME,
        price: PRICE,
        slug: SLUG,
        description: DESCRIPTION,
        active: ACTIVE,
        category_id: CATEGORY_ID
      })
      await connection.commit();
      res.json({
        'status':'succes', 
        'message':'product created successfully'
      })
    } catch (error) {
      res.json({
        'status':'error', 
        'message':error.message
      })
    } finally {
      await connection.close()
    }
  }
});

app.put('/products/:id',async (req,res)=>{
  let connection;
  const id = req.params.id
  const data = req.body
  let items = []
  let updates = {id:id}

  if (Object.keys(data).length === 0) {
    return res.status(400).json({ error: 400, message: "No se enviaron campos para actualizar" });
  }

  Object.keys(data).forEach((key,index)=>{
    if(key.toLowerCase() == 'created_at' || key.toLowerCase() == 'id'){
      return res.json({
        error:400,
        message:`${key} no se puede modificar`
      })
    }else{
      items.push(`${key} = :${key}`)
      updates[key] = data[key]
    }
  });
  try {
    const sql = `UPDATE products SET ${items.join(', ')} WHERE id=:id`
    connection = await oracledb.getConnection(db)
    const resp = await connection.execute(sql,updates,{outFormat:oracledb.OUT_FORMAT_OBJECT})
    if(resp.rowsAffected == 0){
      return res.json({
        "status": 405,
        "message": "Producto no encontrado"
      })
    }
      await connection.commit()
      res.json({
        "status": "success",
        "message": "Products updated successfully"
      })
    
  } catch (error) {
    res.json({
      "error":400,
      "message":error.message
    })
  }finally{
    if(connection){
      connection.close()
    }
  }
})


app.get('/products/:id',async (req,res)=>{
  let connection;
  const {id}=req.params
  try {
    connection = await oracledb.getConnection(db)
    let result = await connection.execute('SELECT * FROM products WHERE id=:id',
      {id:id},
      {outFormat:oracledb.OUT_FORMAT_OBJECT}
    )

    if (result.rows.length > 0){
      let datauser = {
        Id:result.rows[0].ID,
        Slug:result.rows[0].SLUG,
        Name:result.rows[0].NAME,
        Price:result.rows[0].PRICE,
        Description:result.rows[0].DESCRIPTION,
        Sku:result.rows[0].SKU,
        Category_Id:result.rows[0].CATEGORY_ID,
        createdAt:result.rows[0].CREATED_AT        
      }
      res.json(datauser)
    }else{
      res.json({
        "error":404,
        "message":"Producto no encontrado no encontrado"
      })
    }
  } catch (error) {
    res.json({
      "error":401,
      "message":"credenciales invalidas"
    })
  } finally {
    connection.close()
  }
})

app.delete('/products/:id',async (req,res) => {
  const {id} = req.params
  let connection;
  try {
    connection = await oracledb.getConnection(db)
    const ret = await connection.execute('DELETE FROM returns WHERE ID_PRODUCT = :id',{id:id})
    const resp = await connection.execute(' DELETE FROM products WHERE id=:id',{id:id})
    if(resp.rowsAffected == 0){
      return res.json({
        status:404,
        message:"Producto no existente"
      })
    }
    await connection.commit()
    res.json({
      "status": 200,
      "message": "Products deleted/inactivated successfully"
    })
  } catch (error) {
    res.json({
      status:404,
      message:error.message
    })
  } finally {
    connection.close()
  }
})

app.post('/orders',async (req,res)=>{
  const {userId,items,shippingAddress,paymentMethod} = req.body
  let connection;
  try {
    connection = await oracledb.getConnection(db)
    let totalorders = await connection.execute('SELECT * FROM purchase_orders ORDER BY id DESC')
    let tot = totalorders.rows[0][0]+1
    let existUser = await connection.execute('SELECT * FROM customers where id=:id',{id:userId},{outFormat:oracledb.OUT_FORMAT_OBJECT})
    if(existUser.rows[0]){
      let totaladd = await connection.execute('SELECT * FROM ADDRESSES ORDER BY id DESC')
      let idadd=totaladd.rows[0][0]+1
      let newAddress = await connection.execute('INSERT INTO addresses(id,id_customer,address) VALUES(:id,:id_customer,:address)',{id:idadd,id_customer:userId,address:shippingAddress})
      let newOrderPurchase = await connection.execute('INSERT INTO purchase_orders(id,id_customer,location_id) VALUES(:id,:id_customer,:location_id)',{id:tot,id_customer:userId,location_id:idadd})
      let costo_total = 0;
      for (const item of items){
        let totaladd = await connection.execute('SELECT * FROM list_products ORDER BY id DESC')
        let idit=totaladd.rows[0][0]+1
        let dataItem = await connection.execute('SELECT * FROM products WHERE id=:id',{id:item.productId},{outFormat:oracledb.OUT_FORMAT_OBJECT})
        let newlist = await connection.execute('INSERT INTO list_products(id, id_order_purchase, id_product, quantity, price) VALUES(:id, :id_order_purchase, :id_product, :quantity, :price )',{id:idit, id_order_purchase:tot, id_product:item.productId, quantity:item.quantity, price:dataItem.rows[0].PRICE})
        costo_total += (dataItem.rows[0].PRICE*item.quantity)
      }
      let totalpay = await connection.execute('SELECT * FROM payments ORDER BY id DESC')
      let idpay=totalpay.rows[0][0]+1
      let NewPayment = await connection.execute('INSERT INTO payments(id,id_purchase_order,status,method,amount) VALUES (:id,:id_purchase_order,:status,:method,:amount)',{id:idpay,id_purchase_order:tot,status:'PENDING',method:paymentMethod,amount:costo_total})
      let totalship = await connection.execute('SELECT * FROM payments ORDER BY id DESC')
      let idship=totalship.rows[0][0]+1
      let newShipments = await connection.execute('INSERT INTO shipments(id,id_order,address,status,carrier) VALUES(:id,:id_order,:address,:status,:carrier)',{id:idship,id_order:tot,address:shippingAddress,status:'COMMING',carrier:'Martin-Arroyo'})
      connection.commit()
      return res.json({
        "status": "success",
        "message": "Order created successfully",
        "orderId": tot,
        "totalAmount": costo_total,
        "orderStatus": "processing"
       })
    } else {
      return res.send ({
        status:405,
        message:'userId no encontrado'
      })
    }
  } catch (error) {
    res.send({status:error.message})
  } finally {
    if(connection){
      connection.close()
    }
  }
})

app.get('/orders',async (req,res)=>{
  let connection;
  try {
    connection = await oracledb.getConnection(db)
    const orders = await connection.execute( `SELECT 
      s.ID_ORDER, 
      s.STATUS, 
      p.AMOUNT, 
      p.METHOD, 
      s.ADDRESS, 
      s.CREATED_AT 
  FROM shipments s 
  JOIN payments p ON s.ID_ORDER = p.ID_PURCHASE_ORDER`,{},{outFormat:oracledb.OUT_FORMAT_OBJECT})
    console.log(orders.rows)
    res.json(orders.rows)
  } catch (error) {
    res.json({status:error.message})
  } finally {
    if(connection){
      await connection.close()
    }
  }
})

app.get('/orders/:id',async (req,res)=>{
  let connection;
  const {id} = req.params
  try {
    connection = await oracledb.getConnection(db)
    const data = await connection.execute(`SELECT
      po.id, 
      p.id,
      p.amount,
      p.status,
      p.method 
      FROM payments p 
      JOIN purchase_orders po ON p.ID_PURCHASE_ORDER = po.ID
      WHERE po.ID = :id`
      ,{id:id},{outFormat:oracledb.OUT_FORMAT_OBJECT})
    const items = await connection.execute('SELECT id_product,quantity,price FROM list_products where id_order_purchase=:id',{id:id},{outFormat:oracledb.OUT_FORMAT_OBJECT})
    const modifiedData = data.rows.map(order => ({
      ...order,
      items: items.rows.filter(item => item.id_order_purchase === order.ORDER_ID) // Asocia items a cada orden
    }));
    res.json(modifiedData[0])

  } catch (error) {
    res.send({
      status:400,
      message:error.message
    })
  }finally{
    if(connection){
      await connection.close()
    }
  }
})

app.put('/orders/:id', async (req,res)=>{
  let connection;
  const {id} = req.params
  const {status}=req.body
  console.log(status)
  try {
    connection = await oracledb.getConnection(db)
    const resp = await connection.execute(`UPDATE SHIPMENTS SET status = :status WHERE id=:id`,{id:id,status:status})
    await connection.commit()
    res.json({
      "status": "success",
      "message": "Order updated successfully"
     })
  } catch (error) {
    res.send({
      status:400,
      message:error.message
    })
  } finally {
    if(connection){
      await connection.close()
    }
  }
})

app.post('/payments', async (req, res) => {
  let connection;
  const { orderId, amount, method } = req.body;

  if (!orderId || !amount || !method) {
    return res.json({
      "error": 400,
      "message": "Datos incompletos"
    });
  }

  try {
    connection = await oracledb.getConnection(db);
    
    let totalorders = await connection.execute('SELECT * FROM payments ORDER BY id DESC');
    let tot = totalorders.rows[0][0] + 1;

    const result = await connection.execute(
      'INSERT INTO payments(id, id_purchase_order, method, amount, status) VALUES(:id, :id_purchase_order, :method, :amount, :status)',
      { id: tot, id_purchase_order: orderId, method: method, amount: amount, status: "PAID" },
      { autoCommit: true } 
    );

    console.log(result.rowsAffected);

    // Enviar la respuesta de éxito
    return res.json({
      "status": "success",
      "message": "Payment registered successfully",
      "paymentId": tot, 
      "paymentStatus": "approved"
    });
  } catch (error) {
    res.json({
      status: 400,
      message: error.message
    });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
});

app.get('/payments',async(req,res)=>{
  let connection;
  try {
    connection= await oracledb.getConnection(db)
    const resp = await connection.execute('SELECT * FROM payments',{},{outFormat:oracledb.OUT_FORMAT_OBJECT})
    res.json(resp.rows)
  } catch (error) {
    res.json({
      status: 400,
      message: error.message
    });
  }finally{
    if (connection) {
      await connection.close();
    }
  }
})

app.listen(port,()=>{
    console.log(`listening on port ${port} :)`)
})
