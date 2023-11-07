import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3210', // Altere para a URL da sua API
});

// Adicione um interceptor para configurar o token nos cabeçalhos
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Obtenha o token do armazenamento local (localStorage)
  const meuToken = JSON.parse(token);

  console.log('token: ', meuToken)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
