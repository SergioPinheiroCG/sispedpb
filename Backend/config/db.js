const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Adiciona o nome do banco de dados à URI de conexão
    const dbName = 'sispedpb'; // Substitua pelo nome do seu banco de dados
    const dbURI = `${process.env.MONGODB_URI}/${dbName}?retryWrites=true&w=majority`;

    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB Connected to database: ${dbName}...`);
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;