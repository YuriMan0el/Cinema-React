'use client';

import { useEffect, useState } from 'react';
import { Sala } from '../../interfaces/sala';
import { localStorageManager } from '../../lib/localStorageManager';
import Loader from '../layout/Loader';

export default function SalaList() {
  const [salas, setSalas] = useState<Sala[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarSalas();
  }, []);

  const carregarSalas = () => {
    const salasSalvas = localStorageManager.getSalas();
    setSalas(salasSalvas);
    setLoading(false);
  };

  if (loading) {
    return <Loader message="Carregando salas..." />;
  }

  if (salas.length === 0) {
    return <p className="text-center text-gray-500">Nenhuma sala cadastrada.</p>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 bg-gray-100">
        <h1 className="text-center mb-12 text-5xl font-extrabold tracking-tight text-gray-800">
          Salas Cadastradas
        </h1>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {salas.map((sala) => (
            <div key={sala.id} className="group block rounded-lg bg-white shadow p-4 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 text-center">{sala.nome}</h3>
              <p className="text-center text-gray-700">Capacidade: {sala.capacidade}</p>
              <p className="text-center text-gray-600">Tipo: {sala.tipo}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
