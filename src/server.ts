import express from 'express';
import cors from 'cors';
import clubRoutes from './routes/clubRoutes';
import './config/dotenvConfig';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', clubRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
