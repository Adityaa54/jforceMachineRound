const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors")
const connectDB = require("./config/db");
const Expense = require("./models/expense");
const User = require("./models/user");


app.use(express.json());
app.use(cors());

connectDB();


app.post("/register", async (req, res) => {
    console.log("hello");
    try {
        const { username, phone, email, password } = req.body;

        
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json( "User already registered" );
        }


        const newUser = new User({ username, phone, email, password });
        await newUser.save();
        return res.status(201).json("User created successfully" );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

       
        const userFind = await User.findOne({ email });
        if (!userFind) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        
        if (userFind.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        return res.status(200).json({ message: "User logged in successfully",
            data:userFind
         });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.get("/expenses/:userId", async (req, res) => {
    try {
        const userId= req.params.userId;
        const findExpense = await Expense.find({userId:userId});
        return res.status(200).json(findExpense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.post("/expenses", async (req, res) => {
    console.log("hello2");
    try {
        const { expensename, amount, description, userId } = req.body;
        const newExpense = new Expense({expensename, amount, description, userId});
        await newExpense.save();
        return res.status(201).json({ message: "Expense created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/expenses/:id',async(req,res)=>{
    console.log("goli");
    const{id}=req.params;

    const{expensename, amount, description} = req.body;
    console.log(expensename, amount, description)
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(id, {
            amount,
            expensename,
            description
        })
        if(!updatedExpense){
            return res.json({message:"Expense not found"})
        }
        res.json(updatedExpense);
    } catch (error) {
        res.status(500).json({msg:"some error are there"});
    }
})
app.get("/user", (req, res) => {
    console.log("hellooo");
    res.status(200).json("Hello from /user route" );
});


app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});