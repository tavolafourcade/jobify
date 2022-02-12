import express from 'express'
import notFoundMiddleware from './middleware/not-found.js'
const app = express()

// Set up a dummy route
app.get('/', (req, res) => {
	res.send('Welcome!')
})

// Using the middleware to look for all Http methods and Routes.
// If none are found 
app.use(notFoundMiddleware)

const port = process.env.PORT || 5000

app.listen(port, ()=>{
	console.log(`Server is listening on port ${port}...`)
})