console.log('SERVER FILE LOADED');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let messages = [];

app.get('/',(req,res)=>{
    res.send('backend working!')
});
app.post('/submit',(req,res)=>{
    const message=req.body.message;
    if (!message){
        return res.status(400).send('message cannot be empty');
    }
    messages.push({
        text:message,
        time:new Date().toISOString()
    })
    
    console.log("saved message:",message);
    res.send('submitted!');
})
app.get('/messages',(req,res)=>{
    res.json(messages);
})
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
});