'use client';

import { useEffect, useState } from 'react';
import { Sessao } from '../../interfaces/sessao';
import { Filme } from '../../interfaces/filme';
import { Sala } from '../../interfaces/sala';
import { localStorageManager } from '../../lib/localStorageManager';
import Loader from '../layout/Loader';
import Button from '../buttons/Button';
import Link from 'next/link';

export default function SessaoList() {
  const [sessoes, setSessoes] = useState<Sessao[]>([]);
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [salas, setSalas] = useState<Sala[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = () => {
    const sessoesSalvas = localStorageManager.getSessoes();
    const filmesSalvos = localStorageManager.getFilmes();
    const salasSalvas = localStorageManager.getSalas();

    setSessoes(sessoesSalvas);
    setFilmes(filmesSalvos);
    setSalas(salasSalvas);
    setLoading(false);
  };

  const excluirSessao = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta sessão?')) {
      localStorageManager.deleteSessao(id);
      carregarDados();
    }
  };

  const getFilmeTitulo = (filmeId: string) => {
    const filme = filmes.find((f) => f.id === filmeId);
    return filme ? filme.titulo : 'Filme não encontrado';
  };

  const getSalaNome = (salaId: string) => {
    const sala = salas.find((s) => s.id === salaId);
    return sala ? sala.nome : 'Sala não encontrada';
  };

  if (loading) {
    return <Loader message="Carregando sessões..." />;
  }

  if (sessoes.length === 0) {
    return <p className="text-center text-gray-500">Nenhuma sessão cadastrada.</p>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 bg-gray-100">
        <h1 className="text-center mb-12 text-5xl font-extrabold tracking-tight text-gray-800">
          Sessões Cadastradas
        </h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sessoes.map((sessao) => (
            <div
              key={sessao.id}
              className="group block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {getFilmeTitulo(sessao.filmeId)}
              </h3>
              <p className="text-sm text-gray-600">Sala: {getSalaNome(sessao.salaId)}</p>
              <p className="text-sm text-gray-600">Data/Hora: {new Date(sessao.dataHora).toLocaleString()}</p>
              <p className="text-sm text-gray-600">Preço: R$ {sessao.preco.toFixed(2)}</p>
              <p className="text-sm text-gray-600">Idioma: {sessao.idioma}</p>
              <p className="text-sm text-gray-600">Formato: {sessao.formato}</p>

              <div className="mt-4 flex gap-2">

                <Link href={`/venda-ingressos?sessaoId=${sessao.id}`}>
                  <Button variant='primary'>
                    Comprar Ingresso
                  </Button>
                </Link>
                <Button variant="danger" onClick={() => excluirSessao(sessao.id)}>
                  Excluir
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
