import expres from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = expres();
app.use(cors());
app.use(expres.json());

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
