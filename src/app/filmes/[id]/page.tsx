'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { localStorageManager } from '@/lib/localStorageManager';
import Button from '@/components/buttons/Button';
import { Filme } from '@/interfaces/filme';
import Loader from '@/components/layout/Loader';

export default function FilmeDetalhesPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [filme, setFilme] = useState<Filme | null>(null);

  useEffect(() => {
    if (!id) return;
    const filmes = localStorageManager.getFilmes();
    const encontrado = filmes.find(f => f.id === id);
    setFilme(encontrado || null);
  }, [id]);

  if (!filme) return <div className="flex justify-center items-center h-screen bg-[var(--background)]"><Loader message="Carregando detalhes do filme..." /></div>;

  return (
    <div className="bg-[var(--background)] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden border border-[var(--bege-dourado-claro)]">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img 
              className="h-full w-full object-cover md:w-64"
              src={filme.imagemUrl || 'https://via.placeholder.com/300x400?text=Sem+Imagem'} 
              alt={`Poster do filme ${filme.titulo}`} 
            />
          </div>
          <div className="p-8 flex-grow">
            <div className="uppercase tracking-wide text-sm text-[var(--dourado-champanhe)] font-semibold">{filme.genero}</div>
            <h1 className="block mt-1 text-3xl leading-tight font-bold text-[var(--terracota-desvanecido)] hover:underline">{filme.titulo}</h1>
            <p className="mt-4 text-[var(--foreground)] opacity-90">{filme.descricao}</p>
            
            <div className="mt-6">
              <p className="text-sm text-[var(--terracota-desvanecido)]"><strong className="font-medium">Classificação:</strong> {filme.classificacao}</p>
              <p className="text-sm text-[var(--terracota-desvanecido)]"><strong className="font-medium">Duração:</strong> {filme.duracao} minutos</p>
              <p className="text-sm text-[var(--terracota-desvanecido)]"><strong className="font-medium">Data de Estreia:</strong> {new Date(filme.dataEstreia).toLocaleDateString()}</p>
            </div>

            <div className="mt-8">
              <Button onClick={() => router.push('/sessoes')} variant="primary">
                Ver Sessões Disponíveis
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}