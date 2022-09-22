const express = require('express');
const cors = require('cors');
const middleware = require('./src/middleware/index');

const app = express();
const port = 5000;

app.use(cors());

app.use(middleware.decodeToken);

app.get('/',(req,res) => {
    res.send('Hello World');
})

app.get('/api/tasks', (req, res) => {

	return res.json({
		tasks: [
			{
				title: 'Task1',
			},
			{
				title: 'Task2',
			},
		],
	});
});

app.listen(port, () => {
	console.log(`server is running on port ${port}`);
});