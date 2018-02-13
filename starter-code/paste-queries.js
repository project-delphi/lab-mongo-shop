// 1.2 | Insert our first users in users collection
// ------------------------------------------------
// db.users.insertOne({   "firstName": "John",   "lastName": "Smith",   "dateBirth": ISODate("2016-12-10T18:28:09.369Z"),   "address": {     "streetAddress": "21 2nd Street",     "city": "New York",     "state": "NY",     "postalCode": "10021"   } })


// 1.3 | Insert our first products in products collection
// ------------------------------------------------------
//  db.products.insertOne({    "name": "Water Bottle",    "description":"High quality glass bottle provides a healthier way to drink.  Silicone sleeve provides a good grip, a see-through window, and protects the glass vessel.  Eliminates toxic leaching that plastic can cause.  Innovative design holds 22-1/2 ounces.  Dishwasher safe",    "category":"Kitchen",    "price":23.0 } )


// 1.4 | Getting Started with queries
// ----------------------------------
// db.products.find().pretty()

// db.products.find({},{"category":"Kitchen"})

// db.products.remove({"category":"Kitchen"},{}).pretty()

// db.users.update({"_id" : ObjectId("5a833c3186f2772f4a344571")},{$set: {"shoppingCart":ObjectId("5a833c6a86f2772f4a344572")}})

// db.users.update({"_id" : ObjectId("5a83439c86f2772f4a344573")},{$set:"reviews": [ })     {       "name": "Shannon",       "comment": "This is so warm and comfortable.",       "stars": 2,       "date": "2016-11-10T18:28:09.369Z"     }   ]
