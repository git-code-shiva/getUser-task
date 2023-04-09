const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const { default: mongoose } = require('mongoose');
const USER = require('./model');
const UserSchema = mongoose.model("TASKGIVEN")
const connection = require('./connection');
connection();
const port = 8081;
const bcrypt = require('bcrypt');

mongoose.connection.on("connected",()=>{
    console.log("connected to mongoDb");
});
mongoose.connection.on("error",()=>{
    console.log("failed to connect to mongoDb");
});

app.post("/register", async (req, res) => {
    try {
      const { name, email, password, confirmPassword } = req.body;
      if (password !== confirmPassword) {
        return res.status(400).json({
          message: "Password not matched"
        });
      }
      const presentUser = await UserSchema.findOne({ email });
      if (presentUser) {
        return res.status(400).json({
          message: "User already Exist"
        });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      await UserSchema.create({
        name,
        email,
        password: hashedPassword
      });
  
      res.status(201).json({
        message: "Registered successfully"
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Server error occurred"
      });
    }
  });
  

app.post("/login", async(req,res)=>{
    try {
        const {email,password}= req.body;
        const user = await UserSchema.findOne({email});

        if(!user){
            return res.status(400).json({
                status:"failed",
                message:"user not found please register"
            })
        }

        bcrypt.compare(password,user.password, function(err,result){
            if(err){
                return res.status(500).json({
                    status:"failed",
                    message:err.message
                })
            }

            if(result){
                return res.status(200).json({
                    message:"login sucessfull",
                    user
                })
            }

            else{
                res.status(400).json({
                    status:"failed",
                    message:"invalid credantial"
                })
            }
        })
    } catch (error) {
        res.status(400).json({
            status:"failed",
            message:error.message
        })
    }
})

app.get("/all/:id",async(req,res)=>{
    const {id} = req.params;
    try{
        const data = await UserSchema.find({name:id});

        if(data){
            res.json(data).status(200)
        }
        else{
            res.status(404).json({
                message:"There is no User With This Name"
            })
        }
    }catch(err){
        res.status(500).json({
            message:"error retrieving data"
        })
    }
})

app.listen(port,()=>(console.log(`server is up at port ${port}`)));