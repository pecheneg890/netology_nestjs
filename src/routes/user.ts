import express from 'express';
const router = express.Router();

router.get('/login', (req, res) => {
    res.status(201);
    const login = {
        id: 1,
        mail: "test@mail.ru"
    };
    res.json(login);
});

export default router;