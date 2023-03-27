const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

/* API layout
/page --> [res] = this is working
---------------------------
/signin --> POST = success/fail
/register --> POST = user
/profile/:userID --> GET = user
/image --> PUT --> user
*/

const database = {
    users: [
        {
            id: '1',
            name: 'John',
            email: 'john@john.com',
            password: 'cookie',
            entries: 0,
            joined: new Date(),
        },
        {
            id: '2',
            name: 'Jan',
            email: 'jan@jan.com',
            password: 'janiferConveriblez1',
            entries: 0,
            joined: new Date(),
        },
        {
            id: '3',
            name: 'Jax',
            email: 'jax@jax.com',
            password: 'jax2theMax',
            entries: 0,
            joined: new Date(),
        },
    ]
}

app.get('/', (req, res)=>{
    res.send(database.users);
})

app.post('/signin', (req, res)=>{
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json('success');
    } else {
        res.status(400).json('error logging in');
    } 
})

app.post('/register', (req, res)=>{
    const { name, email, password } = req.body;
    database.users.push({
        id: '1',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date(),
   })

   res.json(database.users[database.users.length-1])
})

app.get('/profile/:id', (req, res)=>{
    const { id } = req.params;
    let found = false
    database.users.forEach(user => {
        if(user.id === id){
            found = true
            return res.json(user)
        }
    })
    if(!found){
        res.status(404).json("She doesn't even go here! User not found.")
    }
    res.send('this app is working');
})

app.put('/image', (req, res)=>{
    const { id } = req.body;
    let found = false
    database.users.forEach(user => {
        if(user.id === id){
            found = true
            user.entries++
            return res.json(user.entries)
        }
    })
    if(!found){
        res.status(404).json("User not found.")
    }
    res.send('this app is working');
})

app.listen(3000, ()=>{
    console.log('app is running on port 3000')
})
