'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Ingresso } from '@/interfaces/ingresso';
import { localStorageManager } from '@/lib/localStorageManager';
import { v4 as uuidv4 } from 'uuid';
import Button from '@/components/buttons/Button';
import Loader from '@/components/layout/Loader';

export default function IngressoForm() {
  const searchParams = useSearchParams();
  const sessaoIdFromUrl = searchParams.get('sessaoId') || '';

  const [formData, setFormData] = useState<Omit<Ingresso, 'id'>>({
    sessaoId: '',
    nomeCliente: '',
    cpf: '',
    assento: '',
    tipoPagamento: 'Cartão',
  });

  const [tituloFilme, setTituloFilme] = useState('');
  const [nomeSala, setNomeSala] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessaoIdFromUrl) {
      setLoading(true);
      const sessoes = localStorageManager.getSessoes();
      const filmes = localStorageManager.getFilmes();
      const salas = localStorageManager.getSalas();

      const sessao = sessoes.find(s => s.id === sessaoIdFromUrl);
      if (sessao) {
        const filme = filmes.find(f => f.id === sessao.filmeId);
        const sala = salas.find(s => s.id === sessao.salaId);
        setTituloFilme(filme ? filme.titulo : 'Filme não encontrado');
        setNomeSala(sala ? sala.nome : 'Sala não encontrada');
        setFormData(prev => ({ ...prev, sessaoId: sessaoIdFromUrl }));
      } else {
        setTituloFilme('Sessão não encontrada');
        setNomeSala('Sessão não encontrada');
      }
      setLoading(false);
    } else {
      setLoading(false);
      setTituloFilme('Nenhuma sessão selecionada');
      setNomeSala('');
    }
  }, [sessaoIdFromUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.sessaoId) {
        alert('ID da Sessão não encontrado. Não é possível registrar o ingresso.');
        return;
    }
    const novoIngresso: Ingresso = { id: uuidv4(), ...formData };
    localStorageManager.addIngresso(novoIngresso);
    alert('Ingresso cadastrado com sucesso!');
  };

  if (loading) {
    return <Loader message="Carregando dados da sessão..." />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border border-[var(--bege-dourado-claro)] rounded-md p-4 bg-[var(--casca-de-ovo)] mb-6 space-y-1">
        <p className="text-sm font-medium text-[var(--terracota-desvanecido)]"><strong>Filme:</strong> {tituloFilme}</p>
        <p className="text-sm font-medium text-[var(--terracota-desvanecido)]"><strong>Sala:</strong> {nomeSala}</p>
        <p className="text-sm font-medium text-[var(--terracota-desvanecido)]"><strong>ID da Sessão:</strong> {formData.sessaoId || sessaoIdFromUrl}</p>
      </div>

      <div>
        <label htmlFor="nomeCliente" className="block text-sm font-medium text-[var(--terracota-desvanecido)] mb-1">Nome do Cliente</label>
        <input
          id="nomeCliente"
          name="nomeCliente"
          placeholder="Nome Completo"
          value={formData.nomeCliente}
          onChange={handleChange}
          required
          className="w-full border border-[var(--bege-dourado-claro)] rounded-md p-2 shadow-sm focus:ring-2 focus:ring-[var(--dourado-champanhe)] focus:border-[var(--dourado-champanhe)] bg-white text-[var(--foreground)]"
        />
      </div>

      <div>
        <label htmlFor="cpf" className="block text-sm font-medium text-[var(--terracota-desvanecido)] mb-1">CPF</label>
        <input
          id="cpf"
          name="cpf"
          placeholder="000.000.000-00"
          value={formData.cpf}
          onChange={handleChange}
          required
          className="w-full border border-[var(--bege-dourado-claro)] rounded-md p-2 shadow-sm focus:ring-2 focus:ring-[var(--dourado-champanhe)] focus:border-[var(--dourado-champanhe)] bg-white text-[var(--foreground)]"
        />
      </div>

      <div>
        <label htmlFor="assento" className="block text-sm font-medium text-[var(--terracota-desvanecido)] mb-1">Assento</label>
        <input
          id="assento"
          name="assento"
          placeholder="Ex: A10"
          value={formData.assento}
          onChange={handleChange}
          required
          className="w-full border border-[var(--bege-dourado-claro)] rounded-md p-2 shadow-sm focus:ring-2 focus:ring-[var(--dourado-champanhe)] focus:border-[var(--dourado-champanhe)] bg-white text-[var(--foreground)]"
        />
      </div>

      <div>
        <label htmlFor="tipoPagamento" className="block text-sm font-medium text-[var(--terracota-desvanecido)] mb-1">Tipo de Pagamento</label>
        <select
          id="tipoPagamento"
          name="tipoPagamento"
          value={formData.tipoPagamento}
          onChange={handleChange}
          required
          className="w-full border border-[var(--bege-dourado-claro)] rounded-md p-2 shadow-sm focus:ring-2 focus:ring-[var(--dourado-champanhe)] focus:border-[var(--dourado-champanhe)] bg-white text-[var(--foreground)]"
        >
          <option value="Cartão">Cartão</option>
          <option value="Pix">Pix</option>
          <option value="Dinheiro">Dinheiro</option>
        </select>
      </div>

      <Button type="submit" variant="primary">Confirmar Compra</Button>
    </form>
  );
}