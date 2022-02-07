const express = require("express");

const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const connect = () => {
    return mongoose.connect(
        ("mongodb://127.0.0.1:27017/web14")
    );
};


const userSchemas = new mongoose.Schema(
    {
        id: { type: Number, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        middleName: { type: String, required: true },
        age: { type: Number, required: true },
        email: { type: String, required: true },
        Adress: { type: String, required: true },
        gender: { type: String, required: true, default: "female" },
        type: { type: String, required: false },
    },
    {
        versionKey: false,
        timestamps: true,
    }

);


const User = mongoose.model("user", userSchemas);


const branchdetailsSchemas = new mongoose.Schema(
    {
        id: { type: Number, required: true },
        Name: { type: String, required: true },
        Adress: { type: String, required: true },
        IFSC: { type: String, required: true },
        MICR: { type: Number, required: true },

        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const fixed_Account = mongoose.model("fixedaccount", fixedAccountSchemas);


app.post("/users", async (res, req) => {
    try {
        const users = await User.create(req.body);
        return res.statu(201).send(users)
    }
    catch(e) {
        return res.statusCode(500).send(e.message)
    }
})


app.get("/users", async (res, req) => {
    try {
        const users = await User.find().lean().exec();
        return res.statu(201).send(users)
    }
    catch(e) {
        return res.statusCode(500).send(e.message)
    }
})
app.post("/branchDet", async (res, req) => {
    try {
        const details = await Branch_Details.create(req.body);
        return res.statu(201).send(details)
    }
    catch(e) {
        return res.statusCode(500).send(e.message)
    }
})


app.get("/branchDet", async (res, req) => {
    try {
        const details = await Branch_Details.find().lean().exec();
        return res.statu(201).send(details)
    }
    catch(e) {
        return res.statusCode(500).send(e.message)
    }
})

app.post("/masacc", async (res, req) => {
    try {
        const details = await master_Account.create(req.body);
        return res.statu(201).send(details)
    }
    catch(e) {
        return res.statusCode(500).send(e.message)
    }
})


app.get("/masacc", async (res, req) => {
    try {
        const details = await master_Account.find().lean().exec();
        return res.statu(201).send(details)
    }
    catch(e) {
        return res.statusCode(500).send(e.message)
    }
})


app.post("/savingacc", async (res, req) => {
    try {
        const details = await Saving_Account.create(req.body);
        return res.statu(201).send(details)
    }
    catch(e) {
        return res.statusCode(500).send(e.message)
    }
})


app.get("/savingacc", async (res, req) => {
    try {
        const details = await Saving_Account.find().lean().exec();
        return res.statu(201).send(details)
    }
    catch(e) {
        return res.statusCode(500).send(e.message)
    }
})

app.listen(3645, async function () {
    try {
        await connect();
        console.log("runnimg on port 2345");
    } catch (e) {
        console.log(e.message);
    }
});

