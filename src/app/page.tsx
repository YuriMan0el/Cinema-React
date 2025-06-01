'use client';

import { useEffect, useState } from 'react';
import { localStorageManager } from '@/lib/localStorageManager';
import { Filme } from '@/interfaces/filme';
import FilmeCarousel from '@/components/home/FilmeCarousel'; // Este componente agora usa a scrollbar padrão
import Loader from '@/components/layout/Loader';

export default function Home() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const todosFilmes = localStorageManager.getFilmes();
    setFilmes(todosFilmes);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-var(--navbar-height,68px))] p-8 text-center bg-[var(--background)]">
        <Loader message="Carregando filmes..." />
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center min-h-[calc(100vh-var(--navbar-height,68px))] p-8 bg-[var(--background)]">
      {filmes.length >= 3 ? (
        <FilmeCarousel filmes={filmes} />
      ) : (
        <div className="text-center flex flex-col justify-center flex-grow">
          <h1 className="text-5xl font-bold text-[var(--dourado-champanhe)] mb-4">
            Bem-vindo ao CineControl!
          </h1>
          <p className="text-xl text-[var(--terracota-desvanecido)] mb-8">
            Sua plataforma para gerenciar filmes, salas e sessões de cinema.
          </p>
          {filmes.length === 0 && (
             <p className="text-lg text-[var(--foreground)] opacity-75">
              Nenhum filme cadastrado ainda. Que tal adicionar alguns?
            </p>
          )}
        </div>
      )}
    </main>
  );
}