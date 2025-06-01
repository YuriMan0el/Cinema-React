'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { filmeSchema } from '../../schemas/filmeSchema';
import { Filme, GeneroFilme, ClassificacaoIndicativa } from '../../interfaces/filme';
import { v4 as uuidv4 } from 'uuid';
import { localStorageManager } from '../../lib/localStorageManager';

export default function FilmeForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Omit<Filme, 'id'>>({
    resolver: yupResolver(filmeSchema),
  });

  const onSubmit = (data: Omit<Filme, 'id'>) => {
    const filme: Filme = { ...data, id: uuidv4() };
    localStorageManager.addFilme(filme);
    alert('Filme salvo com sucesso!');
    reset();
  };

  const generos: GeneroFilme[] = [
    'Ação', 'Comédia', 'Drama', 'Terror', 'Animação',
    'Ficção Científica', 'Documentário', 'Romance', 'Suspense'
  ];

  const classificacoes: ClassificacaoIndicativa[] = [
    'Livre', '10 anos', '12 anos', '14 anos', '16 anos', '18 anos'
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md mx-auto p-4 border rounded-lg shadow bg-white">
      <h2 className="text-xl font-bold">Cadastro de Filme</h2>

      <label>
        Título:
        <input type="text" {...register("titulo")} className="border rounded px-2 py-1 w-full" />
        {errors.titulo && <span className="text-red-500">{errors.titulo.message}</span>}
      </label>

      <label>
        Descrição:
        <textarea {...register("descricao")} className="border rounded px-2 py-1 w-full" />
        {errors.descricao && <span className="text-red-500">{errors.descricao.message}</span>}
      </label>

      <label>
        Gênero:
        <select {...register("genero")} className="border rounded px-2 py-1 w-full">
          <option value="">Selecione um gênero</option>
          {generos.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        {errors.genero && <span className="text-red-500">{errors.genero.message}</span>}
      </label>

      <label>
        Classificação Indicativa:
        <select {...register("classificacao")} className="border rounded px-2 py-1 w-full">
          <option value="">Selecione a classificação</option>
          {classificacoes.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {errors.classificacao && <span className="text-red-500">{errors.classificacao.message}</span>}
      </label>

      <label>
        Duração (minutos):
        <input type="number" {...register("duracao")} className="border rounded px-2 py-1 w-full" />
        {errors.duracao && <span className="text-red-500">{errors.duracao.message}</span>}
      </label>

      <label>
        Data de Estreia:
        <input type="date" {...register("dataEstreia")} className="border rounded px-2 py-1 w-full" />
        {errors.dataEstreia && <span className="text-red-500">{errors.dataEstreia.message}</span>}
      </label>

      <label>
        URL da Imagem:
        <input type="url" {...register("imagemUrl")} className="border rounded px-2 py-1 w-full" />
        {errors.imagemUrl && <span className="text-red-500">{errors.imagemUrl.message}</span>}
      </label>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Salvar Filme
      </button>
    </form>
  );
}
