import express from 'express';
import authroutes from "./routes/user";
import contestRoute from "./routes/contest";
import adminRoutes from "./routes/admin";
import SubmissionRoutes from "./routes/submission";


const app = express();
app.use(express.json());



app.use('/api/auth', authroutes);
app.use('/api/contest', contestRoute)
app.use("/api/admin", adminRoutes);
app.use("/api/submit", SubmissionRoutes);



const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

app.get("/health", (req, res) => {
    res.status(200).send("OK");
});

app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});
