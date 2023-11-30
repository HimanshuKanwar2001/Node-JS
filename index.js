const express = require("express");
const port = 8000;
const path = require("path");

const db = require("./config/mongoose");
const Contact = require("./model/contact");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static("assets"));

// //middleware 1
// app.use(function(req,res,next){
//   console.log('middleware 1 called');
//   next();
// })

// //middleware 2
// app.use(function(req,res,next){
//   req.myName="Himanshu";
//   console.log('middleware 2 called');
//   next();
// })
// //middleware 3
// app.use(function(req,res,next){

//   console.log('My Name from MW2',req.myName);
//   next();
// })
var contactList = [
  {
    name: "Arpan",
    phone: "1111111111",
  },
  {
    name: "Himanshu",
    phone: "1234567891",
  },
  {
    name: "Kanwar Hero",
    phone: "856672302",
  },
];
app.get("/", async function (req, res) {
  try {
    const contacts = await Contact.find({});

    return res.render("home", {
      title: "My Contact List",
      contact_list: contacts,
    });
  } catch (err) {
    console.log("Error in fetching contacts from db", err);
    return res.status(500).send("Internal Server Error");
  }
});
// app.get("/", function (req, res) {

//   Contact.find({},function(err,contacts){
//     if(err){
//       console.log("Error in fethcing contacts from db");
//       return
//     }
//      return res.render("home", {
//     title: "My Contact List",
//     contact_list: contactList,
//   });

//   })

//   return res.render("home", {
//     title: "My Contact List",
//     contact_list: contactList,
//   });
// });
app.get("/practice", function (req, res) {
  return res.render("practice", {
    title: "Practice PlayingGround",
  });
});

app.post('.create-contact',function(req,res){
  Contact.create({
    name:req.body.name,
    phone:req.body.name,
  },function(err,newContact){
    if(err){
      console.log("error in  creating a contact!");
      return;
    }
    console.log("*********",newContact)
    return res.redirect('back')
  }
  )
})

// app.post("/create-contact", function (req, res) {
//   // contactList.push({
//   //     name:req.body.name,
//   //     phone:req.body.phone
//   // });
//   contactList.push(req.body);
//   return res.redirect("/");
//   // return res.redirect('/practice');
// });

//for deleting a contact
app.get("/delete-contact", function (req, res) {
  //get the query from the url
  let phone = req.query.phone;
  let index = contactList.findIndex((contact) => contact.phone == phone);
  console.log(index);
  if (index != -1) {
    contactList.splice(index, 1);
  }
  return res.redirect("/");
});


app.post('/create-contact', async function (req, res) {
    try {
        const newContact = await Contact.create({
            name: req.body.name,
            phone: req.body.phone
        });
        console.log('Contact created:', newContact);
        return res.redirect('back');
    } catch (err) {
        console.error('Error in creating a contact:', err);
        return res.status(500).send('Internal Server Error');
    }
});



// app.post("/create-contact", async function (req, res) {
//   Contact.create({
//     name: req.body.name,
//     phone: req.body.phone,
//   })
//     .then((data) => {
//       console.log("**********", newContact);
//       return res.redirect("back");
//     })
//     .catch((err) => {
//       console.log("error in creating a contact!");
//       return;
//     });
  // function (err, newContact) {
  //   if (err) {
  //     console.log("error in creating a contact!");
  //     return;
  //   }
  //   console.log("**********", newContact);
  //   return res.redirect("back");
  // }
  // );
// });
app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server", err);
  }
  console.log("Yup!My Express Server is running on Port", port);
});
