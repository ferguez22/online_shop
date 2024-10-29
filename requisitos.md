
### API Products ###



## RECUPERAR TODOS LOS PRODUCTOS
URL:     /api/products
MÉTODO:  GET
HEADERS: X
BODY:    X

# Respuesta:
- Un array con todos los productos 

# ¿Qué podemos probar?
- Recibo un status 200.
- Recibo un JSON como respuesta.
- Recibo un array con todos los productos.
## ---------------------------------- ##



## CREACIÓN DE UN PRODUCTO
URL:     /api/products
MÉTODO:  POST
HEADERS: X
BODY: name, description, department, price, stock, available

# Respuesta:
- El nuevo producto creado

# ¿Qué podemos probar?
- Recibo un status 201 y Content-Type application/json.
- Comprobar que en la respuesta tenemos el _id.
- Comprobar que los campos que enviamos en el body son los que se guardan en la base de datos.
## ---------------------------------- #


## Borrado de un producto
URL:     /api/products/:productId
MÉTODO:  DELETE
HEADERS: X
BODY:    X

# Respuesta:
- El producto borrado

## ---------------------------------- #

## Recuperar un producto por su id.
- GET /api/products/<productId> - Recuperar un producto por su id.
findById

## Recuperar un producto por su departamento.
- GET /api/products/dpt/<department> - Recuperar un producto por su departamento.

## Recuperar productos disponibles y con stock mayor de 10.
- GET /api/products/available - Recuperar productos disponibles y con stock mayor de 10.


## Recuperar productos por su precio.


- GET /api/products/price?min=<minPrice>&max=<maxPrice> - Recuperar productos por su precio.
1. Método en controlador y ruta
2. Min y Max lo extraemos de req.query
3. Prueba:
    GET {{HOST}}/api/products/price?min=100&max=400




## ---------------------------------- #

## Añadir un producto al carrito de un usuario
URL:     /api/users/add/<productId>
MÉTODO:  POST
HEADERS: X
BODY:    X

# Respuesta:
- El producto añadido al carrito

## Obtener el perfil de un usuario
URL:     /api/users/profile
MÉTODO:  GET
HEADERS: X
BODY:    X

# Respuesta:
- El perfil del usuario