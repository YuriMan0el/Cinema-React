'use client';

import { useState, useEffect } from 'react';
import { Sessao } from '@/interfaces/sessao';
import { localStorageManager } from '@/lib/localStorageManager';
import { v4 as uuidv4 } from 'uuid';
import Button from '../buttons/Button';
import { Sala } from '@/interfaces/sala';
import { Filme } from '@/interfaces/filme';
import Loader from '@/components/layout/Loader';

interface SessaoFormProps {
  onSave?: () => void; 
}

export default function SessaoForm({ onSave }: SessaoFormProps) {
  const [filmeId, setFilmeId] = useState('');
  const [salaId, setSalaId] = useState('');
  const [dataHora, setDataHora] = useState('');
  const [preco, setPreco] = useState(0);
  const [idioma, setIdioma] = useState<'Dublado' | 'Legendado'>('Dublado');
  const [formato, setFormato] = useState<'2D' | '3D'>('2D');

  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [salas, setSalas] = useState<Sala[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setFilmes(localStorageManager.getFilmes());
    setSalas(localStorageManager.getSalas());
    setLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!filmeId || !salaId || !dataHora || preco <= 0) {
        alert('Por favor, preencha todos os campos obrigatórios e defina um preço válido.');
        return;
    }

    const novaSessao: Sessao = {
      id: uuidv4(),
      filmeId,
      salaId,
      dataHora,
      preco,
      idioma,
      formato
    };

    localStorageManager.addSessao(novaSessao);

    if (onSave) onSave();
    
    setFilmeId('');
    setSalaId('');
    setDataHora('');
    setPreco(0);
    setIdioma('Dublado');
    setFormato('2D');
  };

  if (loading) {
    return <Loader message="Carregando filmes e salas..." />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="filmeId" className="block text-sm font-medium text-[var(--terracota-desvanecido)] mb-1">Filme</label>
        <select
          id="filmeId"
          value={filmeId}
          onChange={(e) => setFilmeId(e.target.value)}
          required
          className="w-full border border-[var(--bege-dourado-claro)] rounded-md p-2 shadow-sm focus:ring-2 focus:ring-[var(--dourado-champanhe)] focus:border-[var(--dourado-champanhe)] bg-white text-[var(--foreground)]"
        >
          <option value="">Selecione um filme</option>
          {filmes.map((f) => (
            <option key={f.id} value={f.id}>
              {f.titulo}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="salaId" className="block text-sm font-medium text-[var(--terracota-desvanecido)] mb-1">Sala</label>
        <select
          id="salaId"
          value={salaId}
          onChange={(e) => setSalaId(e.target.value)}
          required
          className="w-full border border-[var(--bege-dourado-claro)] rounded-md p-2 shadow-sm focus:ring-2 focus:ring-[var(--dourado-champanhe)] focus:border-[var(--dourado-champanhe)] bg-white text-[var(--foreground)]"
        >
          <option value="">Selecione uma sala</option>
          {salas.map((s) => (
            <option key={s.id} value={s.id}>
              {s.nome}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="dataHora" className="block text-sm font-medium text-[var(--terracota-desvanecido)] mb-1">Data e Hora</label>
        <input
          id="dataHora"
          type="datetime-local"
          value={dataHora}
          onChange={(e) => setDataHora(e.target.value)}
          required
          className="w-full border border-[var(--bege-dourado-claro)] rounded-md p-2 shadow-sm focus:ring-2 focus:ring-[var(--dourado-champanhe)] focus:border-[var(--dourado-champanhe)] bg-white text-[var(--foreground)]"
        />
      </div>

      <div>
        <label htmlFor="preco" className="block text-sm font-medium text-[var(--terracota-desvanecido)] mb-1">Preço (R$)</label>
        <input
          id="preco"
          type="number"
          value={preco}
          onChange={(e) => setPreco(Number(e.target.value))}
          required
          min="0.01"
          step="0.01"
          className="w-full border border-[var(--bege-dourado-claro)] rounded-md p-2 shadow-sm focus:ring-2 focus:ring-[var(--dourado-champanhe)] focus:border-[var(--dourado-champanhe)] bg-white text-[var(--foreground)]"
        />
      </div>

      <div>
        <label htmlFor="idioma" className="block text-sm font-medium text-[var(--terracota-desvanecido)] mb-1">Idioma</label>
        <select
          id="idioma"
          value={idioma}
          onChange={(e) => setIdioma(e.target.value as 'Dublado' | 'Legendado')}
          required
          className="w-full border border-[var(--bege-dourado-claro)] rounded-md p-2 shadow-sm focus:ring-2 focus:ring-[var(--dourado-champanhe)] focus:border-[var(--dourado-champanhe)] bg-white text-[var(--foreground)]"
        >
          <option value="Dublado">Dublado</option>
          <option value="Legendado">Legendado</option>
        </select>
      </div>

      <div>
        <label htmlFor="formato" className="block text-sm font-medium text-[var(--terracota-desvanecido)] mb-1">Formato</label>
        <select
          id="formato"
          value={formato}
          onChange={(e) => setFormato(e.target.value as '2D' | '3D')}
          required
          className="w-full border border-[var(--bege-dourado-claro)] rounded-md p-2 shadow-sm focus:ring-2 focus:ring-[var(--dourado-champanhe)] focus:border-[var(--dourado-champanhe)] bg-white text-[var(--foreground)]"
        >
          <option value="2D">2D</option>
          <option value="3D">3D</option>
        </select>
      </div>

      <Button type="submit" variant="primary">
        Salvar Sessão
      </Button>
    </form>
  );
}