import express from 'express';
import axios from 'axios';

const app=express();
const PORT=3000;

app.use(express.json());
app.use(express.static('../frontend/public'));

app.post('/api/joke', async (req,res) =>{
    const {name}=req.body;
    try{
        const response = await axios.get('https://v2.jokeapi.dev/joke/Any?format=txt')
        let joke =response.data;

        let PersonalizedJoke = joke.replace(/Chuck Norris>/g, name || 'Someone');

        res.send({joke:PersonalizedJoke});
    }catch(error){
        res.status(500).send({error:'Error fetching joke'});
    }
});

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})