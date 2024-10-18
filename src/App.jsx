import './App.css'; 
import { useState, useEffect } from 'react';
import axios from 'axios';

const Section = ({ title, description, image }) => (
  <div className="section">
    <h2>{title}</h2>
    <img src={image} alt={title} className="section-image" />
    <p>{description}</p>
  </div>
);

const App = () => {
  const [idade, setIdade] = useState('');
  const [dadosAgua, setDadosAgua] = useState(null);
  const [dadosEnergia, setDadosEnergia] = useState(null);
  const [dadosGeral, setDadosGeral] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aguaResponse, energiaResponse, geralResponse] = await Promise.all([
          axios.get('http://localhost:5173/api/agua'),
          axios.get('http://localhost:5173/api/energia'),
          axios.get('http://localhost:5173/api/geral'),
        ]);
        setDadosAgua(aguaResponse.data);
        setDadosEnergia(energiaResponse.data);
        setDadosGeral(geralResponse.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (idade < 18) {
      alert('Você não pode verificar a economia de água e de energia porque é menor de idade.');
    } else {
      alert('Você pode visualizar as informações abaixo.');
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Consumo de Água e Energia no Brasil</h1>
      </header>
      <main className="main">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nome" required />
          <input type="tel" placeholder="Telefone" required />
          <input type="email" placeholder="Email" required />
          <input type="text" placeholder="Endereço" required />
          <input 
            type="number" 
            placeholder="Idade" 
            value={idade} 
            onChange={(e) => setIdade(e.target.value)} 
            required 
          />
          <button type="submit">Enviar</button>
        </form>

        <div className="informacoes">
          <h2>Informações de Economia</h2>
          {dadosAgua && (
            <Section 
              title="Dados de Água"
              description={dadosAgua.description}
              image="https://consumo-de-agua-no-basil.com.jpg"
            />
          )}
          {dadosEnergia && (
            <Section 
              title="Dados de Energia"
              description={dadosEnergia.description}
              image="https://consumo-de-energia-no-brasil.com.jpg" 
            />
          )}
            {dadosGeral && (
              <Section 
                title="Dados Gerais"
                description={dadosGeral.description}
                image="https://consumo-geral-de-agua-energia.com.jpg" 
              />
            )}
        </div>
      </main>
      <footer>
        <p>© 2024 Consumo de Água e Energia do Brasil. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default App;
