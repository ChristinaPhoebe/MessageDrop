console.log('SERVER FILE LOADED');
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const messagesFile = path.join(__dirname,'messages.json');
if(!fs.existsSync(messagesFile)){
    fs.writeSync(messagesFile, JSON.stringify([]));
}
function readMessages(){
    const data = fs.readFileSync(messagesFile,'utf8');
    return JSON.parse(data);
}
function saveMessages(messages){
    fs.writeFileSync(messagesFile, JSON.stringify(messages,null,2));
}
app.get('/',(req,res)=>{
    res.send('backend working!')
});
app.post('/submit',(req,res)=>{
    const message=req.body.message;
    if (!message){
        return res.status(400).send('message cannot be empty');
    }
    const messages = readMessages();
    messages.push({
        text:message,
        time:new Date().toISOString()
    })
    saveMessages(messages);
    console.log("saved message:",message);
    res.send('submitted!');
})
app.get('/messages',(req,res)=>{
    const messages = readMessages();
    res.json(messages);
})
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
});