'use client';

import { useState, useEffect } from 'react';
import { Sessao } from '@/interfaces/sessao';
import { localStorageManager } from '@/lib/localStorageManager';
import { v4 as uuidv4 } from 'uuid';
import Button from '../buttons/Button';
import { Sala } from '@/interfaces/sala';
import { Filme } from '@/interfaces/filme';

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

  useEffect(() => {
    setFilmes(localStorageManager.getFilmes());
    setSalas(localStorageManager.getSalas());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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

    // Resetar formulário se quiser
    setFilmeId('');
    setSalaId('');
    setDataHora('');
    setPreco(0);
    setIdioma('Dublado');
    setFormato('2D');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Filme</label>
        <select
          value={filmeId}
          onChange={(e) => setFilmeId(e.target.value)}
          required
          className="w-full border p-2"
        >
          <option value="">Selecione um filme</option>
          {filmes.map((f: any) => (
            <option key={f.id} value={f.id}>
              {f.titulo}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Sala</label>
        <select
          value={salaId}
          onChange={(e) => setSalaId(e.target.value)}
          required
          className="w-full border p-2"
        >
          <option value="">Selecione uma sala</option>
          {salas.map((s: any) => (
            <option key={s.id} value={s.id}>
              {s.nome}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Data e Hora</label>
        <input
          type="datetime-local"
          value={dataHora}
          onChange={(e) => setDataHora(e.target.value)}
          required
          className="w-full border p-2"
        />
      </div>

      <div>
        <label>Preço</label>
        <input
          type="number"
          value={preco}
          onChange={(e) => setPreco(Number(e.target.value))}
          required
          className="w-full border p-2"
        />
      </div>

      <div>
        <label>Idioma</label>
        <select
          value={idioma}
          onChange={(e) => setIdioma(e.target.value as 'Dublado' | 'Legendado')}
          required
          className="w-full border p-2"
        >
          <option value="Dublado">Dublado</option>
          <option value="Legendado">Legendado</option>
        </select>
      </div>

      <div>
        <label>Formato</label>
        <select
          value={formato}
          onChange={(e) => setFormato(e.target.value as '2D' | '3D')}
          required
          className="w-full border p-2"
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
