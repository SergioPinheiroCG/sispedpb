require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

// Import routes
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const clientRoutes = require('./routes/clientRoutes');
const orderRoutes = require('./routes/orderRoutes');
const sellerRoutes = require('./routes/sellerRoutes');

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Conexão com o MongoDB (versão atualizada sem opções deprecated)
const connectDB = async () => {
  try {
    console.log('Tentando conectar ao MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado ao MongoDB com sucesso!');
  } catch (error) {
    console.error('❌ Falha na conexão com MongoDB:', error.message);
    console.log('Verifique:');
    console.log('1. Se o IP da sua instância está na whitelist do MongoDB Atlas');
    console.log('2. Se as credenciais no .env estão corretas');
    console.log('3. Se a string de conexão está formatada corretamente');
    process.exit(1);
  }
};

// Conectar ao banco de dados antes de iniciar o servidor
connectDB().then(() => {
  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/categories', categoryRoutes);
  app.use('/api/clients', clientRoutes);
  app.use('/api/orders', orderRoutes);
  app.use('/api/sellers', sellerRoutes);

  // Error handling
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  // Server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});