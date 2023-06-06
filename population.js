const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/play')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema =  new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author',  authorSchema); 

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: authorSchema,
}));

async function createAuthor(name, bio, website) { 
  const author = new Author({
    name, 
    bio, 
    website 
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course
    .find()
    .populate('author','name')
    .select('name');
  console.log(courses);
}

//createAuthor('Mosh', 'My bio', 'My Website');
// createCourse('Node Course', '63b5314a68a15cdfcc6b13d4')

async function updateAuthor(courseId){

  const course = await Course.findById(courseId);
  console.log(course);
  course.author.name = "John Smith";
  course.save();

  const author = await Author.findById(course.author._id);
  console.log(author);
}


//createAuthor('Mosh', 'My bio', 'My Website');

 createCourse('Node Course', new Author({_id:"63b53faa746783f4066ef277"} ));
//
//createCourse("Test Author",'63b5314a68a15cdfcc6b13d4');
//updateAuthor('63b539822c06d5a5f4aa3d2a');