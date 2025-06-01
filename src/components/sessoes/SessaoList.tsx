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
    return (
        <div className="text-center py-10">
            <h1 className="text-4xl font-bold text-[var(--terracota-desvanecido)] mb-8">
              Sessões Disponíveis
            </h1>
            <p className="text-xl text-[var(--foreground)] opacity-75">Nenhuma sessão cadastrada no momento.</p>
            <Link href="/cadastro-sessoes" className="mt-6 inline-block">
                <Button variant="primary">Cadastrar Nova Sessão</Button>
            </Link>
        </div>
    );
  }

  return (
    <div className="bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-center mb-12 text-4xl font-bold tracking-tight text-[var(--terracota-desvanecido)] sm:text-5xl">
          Sessões Disponíveis
        </h1>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {sessoes.map((sessao) => (
            <div
              key={sessao.id}
              className="group flex flex-col bg-white rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out border border-[var(--bege-dourado-claro)] overflow-hidden"
            >
              <div className="p-6 flex-grow">
                <h3 className="text-2xl font-semibold text-[var(--terracota-desvanecido)] mb-3 group-hover:text-[var(--dourado-champanhe)] transition-colors">
                  {getFilmeTitulo(sessao.filmeId)}
                </h3>
                <div className="space-y-2 text-sm text-[var(--foreground)] opacity-80">
                    <p><strong className="font-medium text-[var(--terracota-desvanecido)] opacity-90">Sala:</strong> {getSalaNome(sessao.salaId)}</p>
                    <p><strong className="font-medium text-[var(--terracota-desvanecido)] opacity-90">Data:</strong> {new Date(sessao.dataHora).toLocaleDateString()}</p>
                    <p><strong className="font-medium text-[var(--terracota-desvanecido)] opacity-90">Horário:</strong> {new Date(sessao.dataHora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    <p><strong className="font-medium text-[var(--terracota-desvanecido)] opacity-90">Preço:</strong> R$ {sessao.preco.toFixed(2)}</p>
                    <p><strong className="font-medium text-[var(--terracota-desvanecido)] opacity-90">Idioma:</strong> {sessao.idioma}</p>
                    <p><strong className="font-medium text-[var(--terracota-desvanecido)] opacity-90">Formato:</strong> {sessao.formato}</p>
                </div>
              </div>
              
              <div className="p-4 bg-[var(--casca-de-ovo)] bg-opacity-50 border-t border-[var(--bege-dourado-claro)]">
                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                  <Link href={`/venda-ingressos?sessaoId=${sessao.id}`} className="w-full sm:w-auto">
                    <Button variant='primary' className="w-full">
                      Comprar Ingresso
                    </Button>
                  </Link>
                  <Button variant="danger" onClick={() => excluirSessao(sessao.id)} className="w-full sm:w-auto"> 
                    Excluir
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}