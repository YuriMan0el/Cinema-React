import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Ingresso } from '@/interfaces/ingresso';
import { localStorageManager } from '@/lib/localStorageManager';
import { v4 as uuidv4 } from 'uuid';
import Button from '@/components/buttons/Button';

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

  useEffect(() => {
    if (sessaoIdFromUrl) {
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
      }
    }
  }, [sessaoIdFromUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const novoIngresso: Ingresso = { id: uuidv4(), ...formData };
    localStorageManager.addIngresso(novoIngresso);
    alert('Ingresso cadastrado com sucesso!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="border p-2 bg-gray-100">
        <p><strong>Filme:</strong> {tituloFilme}</p>
        <p><strong>Sala:</strong> {nomeSala}</p>
        <p><strong>ID da Sessão:</strong> {formData.sessaoId}</p>
      </div>

      <input
        name="nomeCliente"
        placeholder="Nome do Cliente"
        value={formData.nomeCliente}
        onChange={handleChange}
        required
        className="w-full border p-2"
      />

      <input
        name="cpf"
        placeholder="CPF"
        value={formData.cpf}
        onChange={handleChange}
        required
        className="w-full border p-2"
      />

      <input
        name="assento"
        placeholder="Assento (ex: A10)"
        value={formData.assento}
        onChange={handleChange}
        required
        className="w-full border p-2"
      />

      <select
        name="tipoPagamento"
        value={formData.tipoPagamento}
        onChange={handleChange}
        required
        className="w-full border p-2"
      >
        <option value="Cartão">Cartão</option>
        <option value="Pix">Pix</option>
        <option value="Dinheiro">Dinheiro</option>
      </select>

      <Button type="submit">Confirmar Compra</Button>
    </form>
  );
}
