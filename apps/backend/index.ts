import express from 'express';
import authroutes from "./routes/user";


const app = express();
app.use(express.json());
app.use('/api/v1', authroutes);


const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});
