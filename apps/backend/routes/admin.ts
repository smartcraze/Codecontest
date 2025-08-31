import { Router } from "express";

const router = Router();


router.post('/register', (req, res) => {
    // Handle registration logic here
    res.send('Register endpoint');
});


router.post('/login', (req, res) => {
    // Handle login logic here
    res.send('Login endpoint');
});



export default router;