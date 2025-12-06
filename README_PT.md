# Sistema de Análise de Grafos - Frontend

Frontend React para análise e visualização de grafos com algoritmos como BFS, DFS, Dijkstra e Prim.

## 📋 Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn
- Backend rodando em `http://localhost:5070`

## 🚀 Como Rodar a Aplicação

### 1. Instalação das Dependências

```bash
npm install
```

### 2. Configurar o Backend

Certifique-se de que o backend em C# está rodando em `http://localhost:5070`.

**Importante:** Configure o CORS no seu `Program.cs`:

```csharp
var builder = WebApplicationBuilder.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", builder =>
    {
        builder.WithOrigins("http://localhost:3000", "http://localhost:3001")
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

builder.Services.AddControllers();
var app = builder.Build();

app.UseCors("AllowFrontend");
app.MapControllers();
app.Run();
```

### 3. Rodar o Frontend

```bash
npm start
```

A aplicação será aberta automaticamente em `http://localhost:3000`.

## 💻 Uso da Aplicação

1. **Defina o número de vértices** - Por padrão são 5
2. **Adicione arestas** - Preenchendo "De", "Para" e "Peso"
3. **Clique em um dos algoritmos**:
   - **BFS** - Busca em Largura
   - **DFS** - Busca em Profundidade
   - **Dijkstra** - Caminho mais curto
   - **Prim** - Árvore geradora mínima

4. **Visualize o resultado** - Na seção "Resultado" e no grafo exibido

## 📁 Estrutura do Projeto

```
src/
├── App.js                    # Componente principal
├── App.css                   # Estilos da aplicação
├── index.js                  # Entry point
├── index.css                 # Estilos globais
├── components/
│   └── GraphVisualizer.jsx   # Componente de visualização do grafo
└── services/
    └── api.js                # Serviço de requisições à API
```

## 🔧 Configuração da API

A URL do backend está definida em `src/services/api.js`:

```javascript
const API_URL = "http://localhost:5070/api/graph";
```

Se seu backend está em outra porta, atualize esta URL.

## 📦 Dependências Principais

- **React** - Framework de UI
- **axios** - Cliente HTTP
- **vis-network** - Biblioteca para visualização de grafos
- **Tailwind CSS** - Framework de CSS utilitário

## 🐛 Solução de Problemas

### Erro "Network Error"
- Verifique se o backend está rodando em `http://localhost:5070`
- Verifique se o CORS está configurado corretamente no backend
- Verifique o console do navegador (F12) para mais detalhes

### Porta 3000 já em uso
O npm perguntará se você quer rodar em outra porta (3001, 3002, etc). Responda "Y" para continuar.

### Grafo não aparece
- Verifique se o número de vértices é maior que 0
- Certifique-se de que as arestas foram adicionadas corretamente

## 🎨 Personalizações

### Alterar cores do grafo
Edite `src/components/GraphVisualizer.jsx`:

```javascript
nodes: {
  shape: "circle",
  color: {
    background: "#1f2937",  // Cor de fundo
    border: "#00eaff",      // Cor da borda
  },
}
```

### Alterar estilos dos botões
Os estilos estão em `src/App.js` usando Tailwind CSS. Edite as classes `bg-blue-600`, `bg-purple-600`, etc.

## 📝 Notas

- A visualização é feita com **vis-network**
- Os algoritmos são executados no backend
- A aplicação suporta grafos com peso nas arestas

## 🔗 Links Úteis

- [Documentação do React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [vis-network](https://visjs.org/)

## 📄 Licença

MIT
