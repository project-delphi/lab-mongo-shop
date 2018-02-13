const MongoDB = require('mongodb')
const users = 'users'
const products = 'products'
const shoppingCarts = 'shoppingCarts'

class Database {

  constructor({ host, database }) {
    this.url = `mongodb://${host}/${database}`
  }

  connect(callback = (error, database) => {}){
    if (this.database){
      callback(null, this.database)
    } else {
      MongoDB.MongoClient.connect(this.url, (error, database) => {
        if (error){
          callback(error)
        } else {
          this.database = database
          callback(null, this.database)
        }
      })
    }
  }

  close(callback = (error) => {}){
    if (this.database){
      this.database.close(true, callback)
    } else {
      callback()
    }
  }
  
  insertUser(user, callback = (error, result) => {}) {
    this.connect(
      this.onConnectFn(
        crudInsertUser(user),
        error, callback
      )
    )
  }

  listUsers(callback = (error, users) => {}) {
    this.connect(
      this.onConnectFn(
        crudListUsers(),
        error, callback
      )
    ) 
  }

  deleteUser(firstName, callback = (error, result) => {}) {
    this.connect(
      this.onConnectFn(
        crudDeleteUser(firstName),
        error, callback
      )
    )
  }

  insertProduct(product, callback = (error, result) => {}){
    this.connect(
      this.onConnectFn(
        crudInsertProduct(product),
        error, callback
      )
    )
  }

  listProducts(callback = (error, products) => {}) {
    this.connect(
      this.onConnectFn(
        crudListProducts(),
        error, callback
      )
    )
  }

  deleteProduct( productName, callback = (error, result) => {}) {
    this.connect(
      this.onConnectFn(
        crudDeleteProduct(productName),
        error, callback
      )
    )
  }

  addProductToShoppingCart({userFirstName, productName}, callback = (error) => {}){
    this.connect(
      this.onConnectFn(
        crudAddProductToShoppingCart(userFirstName, productName),
        error, callback
      )
    )
  }

  addReviewToProduct(productName, review, callback = (messageResult) => {}){
    this.connect(
      this.onConnectFn(
        crudaddReviewToProduct(productName, review),
        error, callback
      )
    )
  }

  onConnectFn(crudFun, error, callback) {
    error ? callback(error): crudFun()
  }

  crudInsertUser(user){
    this.database.collections('users').insertOne(user)
  }

  crudListUsers(){
    this.database.collections('users').find()
  }

  crudDeleteUser(firstName){
    this.database.collections('users').remove({'firstName' : firstName,{}})
  }

  crudInsertProduct(product){
    this.database.collections('products').insertOne(product)
  }

  crudListProducts(){
    this.database.collections('products').find().pretty()
  }

  crudDeleteProduct(productName){
    this.database.collections('products').remove({'name' : productName},{})

  }

  crudAddProductToShoppingCart(userFirstName, productName){
    this.database.collections('users').update({'firstName':userFirstName},
      {$push : {'shoppingCart':productName }})
  }

  crudaddReviewToProduct(productName, review){
    this.database.collections('product').update({"name": productName},{$push : {"reviews":review }})
  }


}

module.exports = Database