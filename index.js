const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())

//new user registration
app.post('/user', async (req,res) => {
    //insertOne the registration data to mongo
   const hash = bcrypt.hashSync(req.body.password, 10);
   
   let result = await client.db("maybank2u").collection("users").insertOne(
      {
        username: req.body.username,
        password: hash,
        name: req.body.name,
        email: req.body.email
      }
   )
    res.send(result)
})
  //user login api
  app.post('/login',async (req, res) => {
    // step #1: req.body.username
    let result = await client.db("maybank2u").collection("users").findOne({

    email: req.body.username
  })
  if(result){
    //step #2: if user exist, check if password is correct
    if(bcrypt.compareSync(req.body.password, result.password) == true) {
      //password is correct
      res.send('login successfully')
    } else {
      //password is incorrect
      res.send('wrong password')
    }
  } else {
    //step #3: if user not exist
    res.send("username is not exist")
  }
  })

app.get ('/hello', (req,res) => {
    res.send ('BERR 2434 Database and Cloud')
})
app.get ('/hello', (req,res) => {
  res.send ('Hello World!')
})

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://7naa:12345@cluster0.3augsfc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    let result = await client.db('maybank2u').collection('subjects').insertOne(
        {
          subject: 'BERR 2434',
          description: 'Database and Cloud',
          code: 'BERR 2434',
          credit: 3
        }
      )
      console.log(result)
  
      let subjects = await client.db('maybank2u').collection('subjects').find().toArray()
      console.log(subjects)
  
      let updated = await client.db('maybank2u').collection('subjects').updateOne(
        { code: 'BERR 1111'},
        {
         $set: {
          description: 'Data Science',
          lecturer: 'Dr. John Doe',
          semester: 3
         }
        }
      )
      console.log(updated)
  
      let deleted = await client.db('maybank2u').collection('subjects').deleteOne(
        {
          _id: new ObjectId('660227a253e832be9be7bbd6')
        }
      )
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);
