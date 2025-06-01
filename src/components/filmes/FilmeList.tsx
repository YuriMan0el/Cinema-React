'use client';

import { useEffect, useState } from 'react';
import { Filme } from '../../interfaces/filme';
import { localStorageManager } from '../../lib/localStorageManager';
import Link from 'next/link';
import Loader from '../layout/Loader';
import Button from '../buttons/Button';

export default function FilmeList() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarFilmes();
  }, []);

  const carregarFilmes = () => {
    const filmesSalvos = localStorageManager.getFilmes();
    setFilmes(filmesSalvos);
    setLoading(false);
  };

  if (loading) {
    return <Loader message="Carregando filmes..." />;
  }

  if (filmes.length === 0) {
    return <p className="text-center text-gray-500">Nenhum filme cadastrado.</p>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 bg-gray-100">
        <h1 className="text-center mb-12 text-5xl font-extrabold tracking-tight text-gray-800">
          Filmes Disponíveis
        </h1>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {filmes.map((filme) => (
            <Link
              key={filme.id}
              href={`/filmes/${filme.id}`}
              className="group block"
            >
              <img
                src={filme.imagemUrl || 'https://via.placeholder.com/300x400?text=Sem+Imagem'}
                alt={`Poster do filme ${filme.titulo}`}
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
              />
              <h3 className="mt-4 text-sm text-gray-700 text-center">{filme.titulo}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
