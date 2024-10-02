import 'dotenv/config';
import app from './app';
import connectToMongoDB from './db';

const PORT = process.env.PORT || 3000;

connectToMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`\n ⚙ Server is listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Connection Error: ', err);
  });
