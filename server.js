const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
];

app.get('/', (req, res) => {
    res.send('hello to get method !!!');
})

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

//app.get('/api/courses', (req, res) => {
//res.send([1,2,3]);
//});

//GET METHOD
app.get('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send("the course with given ID was not found");
    res.send(course);
});

//Query Parameter
app.get('/api/courses/:id', (req, res) => {
        res.send(req.params.id);
    }
);

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
});


//QueryString
app.get('/api/courses/:id', (req, res) => {
    res.send(req.query);
});

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
});

//POST METHOD
app.post('/api/courses', (req, res) => {
    //const schema = {
    //name: Joi.string().min(3).required()
    //};

    //const result = Joi.validate(req.body, schema);
    //console.log(result);

    //if (result.error){
    //res.status(400).send(result.error.details[0].message);
    //return;
    //}
    // if (!req.body.name || req.body.name.length < 3){
    //   res.status(400).send('Name is required and minimum 3 charaters atleast');
    // return;
    //}

    const {error} = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

//PUT METHOD
app.put('/api/courses/:id', (req, res) => {
    //check course
    //ifnot return 404 error

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send("the course with given ID was not found");
    //res.send(course);

    //validate
    //if not valid return 400 -bad request

    // const result = validateCourse(req.body);
    const {error} = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    //update course
    //return updated course

    course.name = req.body.name;
    res.send(course);
});

//INPUT VALIDATION METHOD
function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

//DELETE METHOD
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('ID is not found');
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

app.listen(3000, () => console.log('listening on port 3000'));
