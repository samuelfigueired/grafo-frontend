import { useState } from "react";
import GraphVisualizer from "./components/GraphVisualizer";
import { runBFS, runDFS, runDijkstra, runPrim } from "./services/api";

export default function App() {
  const [vertices, setVertices] = useState(5);
  const [edges, setEdges] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState([]);
  const [error, setError] = useState("");

  const addEdge = () => {
    if (from === "" || to === "" || weight === "") return;

    setEdges([...edges, { from: Number(from), to: Number(to), weight: Number(weight) }]);
    setFrom("");
    setTo("");
    setWeight("");
  };

  const graph = { vertices, edges };

  const execute = async (algorithm) => {
    setError("");
    try {
      let res;
      if (algorithm === "bfs") res = await runBFS(graph, 0);
      else if (algorithm === "dfs") res = await runDFS(graph, 0);
      else if (algorithm === "dijkstra") res = await runDijkstra(graph, 0);
      else if (algorithm === "prim") res = await runPrim(graph);

      setResult(res.data);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Erro desconhecido ao chamar API";
      console.error(err);
      setError(errorMsg);
      setResult([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-6 text-cyan-400">
        Sistema de Análise de Grafos
      </h1>

      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg">
        
        {/* Vértices */}
        <div className="mb-4">
          <label className="block text-lg mb-2">Número de vértices:</label>
          <input
            type="number"
            className="w-full p-2 rounded bg-gray-700"
            value={vertices}
            onChange={(e) => setVertices(Number(e.target.value))}
          />
        </div>

        {/* Arestas */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <input
            type="number"
            placeholder="De"
            className="p-2 rounded bg-gray-700"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <input
            type="number"
            placeholder="Para"
            className="p-2 rounded bg-gray-700"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <input
            type="number"
            placeholder="Peso"
            className="p-2 rounded bg-gray-700"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        <button
          onClick={addEdge}
          className="w-full bg-cyan-600 hover:bg-cyan-500 p-2 rounded font-bold mb-4"
        >
          Adicionar Aresta
        </button>

        {/* Lista de arestas */}
        <ul className="mb-6">
          {edges.map((e, i) => (
            <li key={i} className="text-gray-300">
              {e.from} → {e.to} (peso {e.weight})
            </li>
          ))}
        </ul>

        {/* Botões de algoritmos */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button onClick={() => execute("bfs")} className="bg-blue-600 p-2 rounded">
            BFS
          </button>
          <button onClick={() => execute("dfs")} className="bg-purple-600 p-2 rounded">
            DFS
          </button>
          <button onClick={() => execute("dijkstra")} className="bg-green-600 p-2 rounded">
            Dijkstra
          </button>
          <button onClick={() => execute("prim")} className="bg-yellow-600 p-2 rounded text-black font-bold">
            Prim
          </button>
        </div>

        {/* Resultado */}
        <div className="bg-gray-700 p-4 rounded mb-6">
          <h2 className="text-xl font-bold mb-2">Resultado:</h2>
          {error ? (
            <div className="text-red-400 p-3 bg-red-900 rounded">
              <strong>Erro:</strong> {error}
            </div>
          ) : (
            <pre>{JSON.stringify(result, null, 2)}</pre>
          )}
        </div>

        {/* Visualização do grafo */}
        <GraphVisualizer edges={edges} vertices={vertices} />
      </div>
    </div>
  );
}
