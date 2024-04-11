// backend/index.ts
import express from 'express';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())

app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello world' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});