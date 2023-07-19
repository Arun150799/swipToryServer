const express = require("express");
const mongoose = require("./config/mongoose");
const User = require("./modals/user")
const Job = require("./modals/Job")
const Job1 = require("./modals/Job1")
const Job2 = require("./modals/Job2")
const Job3 = require("./modals/Job3")
const Job4 = require("./modals/Job4")
const JobRes = require("./modals/JobRes");

const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const checktoken = require("./middleware/auth");
const dotenv = require('dotenv');
dotenv.config()


const app = express();
app.use(express.json())
app.use(cors())


  app.post("/register",async(req,resp)=>{
    try {
     const name =  req.body.name;
     const password = req.body.password;
    
     if(!(name || password)){
        resp.status(400).send("please fill all details");
     }

     const oldUser = await User.findOne({name});
     if(oldUser)
     {
       resp.status(400).send("this user is alrady exist , please login")
     }
     let encryptedPassword= await bcrypt.hash(password,10);

     const user = await User.create({
        name:req.body.name,
        password:encryptedPassword
     })
     resp.status(200).send("this user is created sucessfully")
    console.log(user);

        
    } catch (error) {
       console.log("sothing went wrong with",error); 
    }
  })

  app.post("/login",async(req,resp)=>{
     try {
        const name = req.body.name;
        const password =  req.body.password;

        if(!(name || password)){
            resp.status(400).send("Please fill all details ")
        }
        const user = await User.findOne({name})
        if( user && bcrypt.compare(password,user.password)){
            const token =  jwt.sign({name,password},process.env.SECRETE_KEY,{expiresIn:"1h"})
            console.log(token);
            resp.status(200).send(user)
        }
        
     } catch (error) {
        console.log("sothing went wrong with",error); 

     }
  })


  app.post("/addJob", async (req, resp) => {
   let job =new Job(req.body);
   let result = await job.save();
   resp.send(result)
   })


   app.get("/jobs", async (req, resp) => {
      try {
        const categary = req.query.categary;
    
        let jobs = [];
    
        if (categary) {
          jobs = await Job.find({ categary: { $regex: categary, $options: "i" } });
        } else {
          jobs = await Job.find();
        }
    
        if (jobs.length > 0) {
          resp.send(jobs);
        } else {
          resp.send({ result: "no job found" });
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        resp.status(500).send("Oops, something went wrong");
      }
    });

    app.get("/job1", async (req, resp) => {
      try {
        const categary = req.query.categary;
    
        let jobs1 = [];
    
        if (categary) {
          jobs1 = await Job1.find({ categary: { $regex: categary, $options: "i" } });
        } else {
          jobs1 = await Job1.find();
        }
    
        if (jobs1.length > 0) {
          resp.send(jobs1);
        } else {
          resp.send({ result: "no job found" });
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        resp.status(500).send("Oops, something went wrong");
      }
    });

    app.get("/job2", async (req, resp) => {
      try {
        const categary = req.query.categary;
    
        let jobs2 = [];
    
        if (categary) {
          jobs2 = await Job2.find({ categary: { $regex: categary, $options: "i" } });
        } else {
          jobs2 = await Job2.find();
        }
    
        if (jobs2.length > 0) {
          resp.send(jobs2);
        } else {
          resp.send({ result: "no job found" });
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        resp.status(500).send("Oops, something went wrong");
      }
    });
    app.get("/job3", async (req, resp) => {
      try {
        const categary = req.query.categary;
    
        let jobs3 = [];
    
        if (categary) {
          jobs3 = await Job3.find({ categary: { $regex: categary, $options: "i" } });
        } else {
          jobs3 = await Job3.find();
        }
    
        if (jobs3.length > 0) {
          resp.send(jobs3);
        } else {
          resp.send({ result: "no job found" });
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        resp.status(500).send("Oops, something went wrong");
      }
    });


    app.get("/job4", async (req, resp) => {
      try {
        const categary = req.query.categary;
    
        let jobs4 = [];
    
        if (categary) {
          jobs4 = await Job4.find({ categary: { $regex: categary, $options: "i" } });
        } else {
          jobs4 = await Job4.find();
        }
    
        if (jobs4.length > 0) {
          resp.send(jobs4);
        } else {
          resp.send({ result: "no job found" });
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        resp.status(500).send("Oops, something went wrong");
      }
    });

    app.get("/jobRes", async (req, resp) => {
      try {
        const categary = req.query.categary;
    
        let jobsRes = [];
    
        if (categary) {
          jobsRes = await JobRes.find({ categary: { $regex: categary, $options: "i" } });
        } else {
          jobsRes = await JobRes.find();
        }
    
        if (jobsRes.length > 0) {
          resp.send(jobsRes);
        } else {
          resp.send({ result: "no job found" });
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        resp.status(500).send("Oops, something went wrong");
      }
    });



    app.get("/editJob/:id",async(req,resp)=>{
      let result = await Job.findOne({_id:req.params.id});
      if (result){
       resp.send(result)
      }
     else{
       resp.send({result:"no job found"})
     }
     })
     
     app.put("/editJob/:id", async (req, resp) => {
      try {
        const result = await Job.updateOne(
          { _id: req.params.id },
          { $set: req.body }
        );
        resp.send(result);
      } catch (error) {
        resp.status(500).send("Error occurred during job update");
      }
    });
         

const port = 5800;

app.listen(port, () => {
    console.log("Your server is running on port", port);
})