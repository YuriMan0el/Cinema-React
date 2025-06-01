'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { filmeSchema } from '../../schemas/filmeSchema';
import { Filme, GeneroFilme, ClassificacaoIndicativa } from '../../interfaces/filme'; 
import { v4 as uuidv4 } from 'uuid';
import { localStorageManager } from '../../lib/localStorageManager';
import Button from '../buttons/Button';

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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md mx-auto p-6 border border-[var(--bege-dourado-claro)] rounded-lg shadow-md bg-[var(--casca-de-ovo)]">
      <h2 className="text-2xl font-semibold text-[var(--terracota-desvanecido)] mb-4 text-center">Cadastro de Filme</h2>

      <div>
        <label htmlFor="titulo" className="block text-sm font-medium text-[var(--terracota-desvanecido)] mb-1">Título:</label>
        <input 
          type="text" 
          id="titulo"
          {...register("titulo")} 
          className="w-full border border-[var(--bege-dourado-claro)] rounded-md p-2 shadow-sm focus:ring-2 focus:ring-[var(--dourado-champanhe)] focus:border-[var(--dourado-champanhe)] bg-white text-[var(--foreground)]" 
        />
        {errors.titulo && <span className="text-red-600 text-xs mt-1">{errors.titulo.message}</span>}
      </div>

      <div>
        <label htmlFor="descricao" className="block text-sm font-medium text-[var(--terracota-desvanecido)] mb-1">Descrição:</label>
        <textarea 
          id="descricao"
          {...register("descricao")} 
          className="w-full border border-[var(--bege-dourado-claro)] rounded-md p-2 shadow-sm focus:ring-2 focus:ring-[var(--dourado-champanhe)] focus:border-[var(--dourado-champanhe)] bg-white text-[var(--foreground)]" 
        />
        {errors.descricao && <span className="text-red-600 text-xs mt-1">{errors.descricao.message}</span>}
      </div>
      
      <div>
        <label htmlFor="genero" className="block text-sm font-medium text-[var(--terracota-desvanecido)] mb-1">Gênero:</label>
        <select 
          id="genero"
          {...register("genero")} 
          className="w-full border border-[var(--bege-dourado-claro)] rounded-md p-2 shadow-sm focus:ring-2 focus:ring-[var(--dourado-champanhe)] focus:border-[var(--dourado-champanhe)] bg-white text-[var(--foreground)]"
        >
          <option value="">Selecione um gênero</option>
          {generos.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        {errors.genero && <span className="text-red-600 text-xs mt-1">{errors.genero.message}</span>}
      </div>

      <div>
        <label htmlFor="classificacao" className="block text-sm font-medium text-[var(--terracota-desvanecido)] mb-1">Classificação Indicativa:</label>
        <select 
            id="classificacao"
            {...register("classificacao")} 
            className="w-full border border-[var(--bege-dourado-claro)] rounded-md p-2 shadow-sm focus:ring-2 focus:ring-[var(--dourado-champanhe)] focus:border-[var(--dourado-champanhe)] bg-white text-[var(--foreground)]"
        >
            <option value="">Selecione a classificação</option>
            {classificacoes.map((c) => (
                <option key={c} value={c}>{c}</option>
            ))}
        </select>
        {errors.classificacao && <span className="text-red-600 text-xs mt-1">{errors.classificacao.message}</span>}
      </div>

      <div>
        <label htmlFor="duracao" className="block text-sm font-medium text-[var(--terracota-desvanecido)] mb-1">Duração (minutos):</label>
        <input 
            type="number" 
            id="duracao"
            {...register("duracao")} 
            className="w-full border border-[var(--bege-dourado-claro)] rounded-md p-2 shadow-sm focus:ring-2 focus:ring-[var(--dourado-champanhe)] focus:border-[var(--dourado-champanhe)] bg-white text-[var(--foreground)]" 
        />
        {errors.duracao && <span className="text-red-600 text-xs mt-1">{errors.duracao.message}</span>}
      </div>

      <div>
        <label htmlFor="dataEstreia" className="block text-sm font-medium text-[var(--terracota-desvanecido)] mb-1">Data de Estreia:</label>
        <input 
            type="date" 
            id="dataEstreia"
            {...register("dataEstreia")} 
            className="w-full border border-[var(--bege-dourado-claro)] rounded-md p-2 shadow-sm focus:ring-2 focus:ring-[var(--dourado-champanhe)] focus:border-[var(--dourado-champanhe)] bg-white text-[var(--foreground)]" 
        />
        {errors.dataEstreia && <span className="text-red-600 text-xs mt-1">{errors.dataEstreia.message}</span>}
      </div>

      <div>
        <label htmlFor="imagemUrl" className="block text-sm font-medium text-[var(--terracota-desvanecido)] mb-1">URL da Imagem:</label>
        <input 
            type="url" 
            id="imagemUrl"
            {...register("imagemUrl")} 
            className="w-full border border-[var(--bege-dourado-claro)] rounded-md p-2 shadow-sm focus:ring-2 focus:ring-[var(--dourado-champanhe)] focus:border-[var(--dourado-champanhe)] bg-white text-[var(--foreground)]" 
        />
        {errors.imagemUrl && <span className="text-red-600 text-xs mt-1">{errors.imagemUrl.message}</span>}
      </div>

      <Button type="submit" variant="primary"> 
        Salvar Filme
      </Button>
    </form>
  );
}