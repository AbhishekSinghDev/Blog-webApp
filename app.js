import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

let blogs = {};

app.get("/", (req, res) => {
    res.render("home.ejs", {
        homeStartContent: homeStartingContent,
        blog: blogs
    });
})

app.get("/home", (req, res) => {
    res.redirect("/");
})
app.get("/about-us", (req, res) => {
    res.render("about.ejs", {
        about_us: aboutContent,
    });
})
app.get("/contact-us", (req, res) => {
    res.render("contact.ejs", {
        contact_us: contactContent,
    });
})

// hidden route
app.get("/compose", (req, res) => {
    res.render("compose.ejs");
})

app.post("/new-compose", (req, res) => {
    let title = req.body.title;
    title = title.toLowerCase();
    const description = req.body.description;

    blogs[title] = description;
    console.log(blogs);
    
    res.status(200).redirect("/");
})

// Dynamic routes - for diary titles
app.get("/:title", (req, res) => {
    let title1 = req.params.title;
    title1 = title1.toLowerCase();
    title1 = title1.split("-");
    let description = blogs[title1];
    console.log(description);

    // res.send(`Welcome to ${title1} title`);
    res.render("post.ejs", {
        title: title1,
        des: description 
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port} or follow by http://localhost:${port}`);
})

const homeStartingContent = "The Node.js application built using the Express.js backend is a user-friendly and efficient platform designed for daily journaling and personal reflections. This app provides a seamless experience for users to capture their thoughts, emotions, and experiences by allowing them to create daily entries. Each entry includes a title to encapsulate the essence of the day and a detailed description section where users can eloquently narrate their experiences. With its clean and intuitive interface, this application offers a dedicated space for users to chronicle their daily lives, fostering self-expression and introspection. Whether it's a fleeting moment, a profound realization, or a simple joy, this Node.js and Express.js-powered app is the perfect digital diary companion, enabling individuals to create a rich tapestry of memories and emotions in a convenient and organized manner.";
const aboutContent = "The Node.js application built using the Express.js backend is a user-friendly and efficient platform designed for daily journaling and personal reflections. This app provides a seamless experience for users to capture their thoughts, emotions, and experiences by allowing them to create daily entries. Each entry includes a title to encapsulate the essence of the day and a detailed description section where users can eloquently narrate their experiences. With its clean and intuitive interface, this application offers a dedicated space for users to chronicle their daily lives, fostering self-expression and introspection. Whether it's a fleeting moment, a profound realization, or a simple joy, this Node.js and Express.js-powered app is the perfect digital diary companion, enabling individuals to create a rich tapestry of memories and emotions in a convenient and organized manner.";
const contactContent = "You can contribute this webApp from github link: ";