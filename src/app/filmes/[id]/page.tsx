'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { localStorageManager } from '@/lib/localStorageManager';
import Button from '@/components/buttons/Button';
import { Filme } from '@/interfaces/filme';

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

  if (!filme) return <p>Carregando ou filme não encontrado...</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{filme.titulo}</h1>
      <p className="mb-2"><strong>Descrição:</strong> {filme.descricao}</p>
      <p className="mb-2"><strong>Gênero:</strong> {filme.genero}</p>
      <p className="mb-2"><strong>Classificação Indicativa:</strong> {filme.classificacao}</p>
      <p className="mb-2"><strong>Duração:</strong> {filme.duracao} minutos</p>
      <p className="mb-2"><strong>Data de Estreia:</strong> {filme.dataEstreia}</p>

      <Button onClick={() => router.push('/sessoes')}>Ver Sessões Disponíveis</Button>
    </div>
  );
}
