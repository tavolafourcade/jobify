import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'

// Set up a dummy route
app.get('/', (req, res) => {
	// throw new Error('Error!!!')
	res.send('Welcome!')
})

// Using the middleware to look for all Http methods and Routes.
// If none are found 
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

app.listen(port, ()=>{
	console.log(`Server is listening on port ${port}...`)
})