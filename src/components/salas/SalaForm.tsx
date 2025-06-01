'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { salaSchema } from '../../schemas/salaSchemas';
import { Sala } from '../../interfaces/sala';
import { v4 as uuidv4 } from 'uuid';
import { localStorageManager } from '../../lib/localStorageManager';
import Button from '../buttons/Button';

export default function SalaForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Omit<Sala, 'id'>>({
    resolver: yupResolver(salaSchema),
  });

  const onSubmit = (data: Omit<Sala, 'id'>) => {
    const novaSala: Sala = { ...data, id: uuidv4() };
    localStorageManager.addSala(novaSala);
    alert('Sala salva com sucesso!');
    reset();
  };

  const tipos = ['2D', '3D', 'IMAX'] as const;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md mx-auto p-4 border rounded-lg shadow bg-white">
      <h2 className="text-xl font-bold">Cadastro de Sala</h2>

      <label>
        Nome da Sala:
        <input type="text" {...register('nome')} className="border rounded px-2 py-1 w-full" />
        {errors.nome && <span className="text-red-500">{errors.nome.message}</span>}
      </label>

      <label>
        Capacidade:
        <input type="number" {...register('capacidade', { valueAsNumber: true })} className="border rounded px-2 py-1 w-full" />
        {errors.capacidade && <span className="text-red-500">{errors.capacidade.message}</span>}
      </label>

      <label>
        Tipo:
        <select {...register('tipo')} className="border rounded px-2 py-1 w-full">
          <option value="">Selecione um tipo</option>
          {tipos.map(tipo => (
            <option key={tipo} value={tipo}>{tipo}</option>
          ))}
        </select>
        {errors.tipo && <span className="text-red-500">{errors.tipo.message}</span>}
      </label>

      <Button type="submit">Salvar Sala</Button>
    </form>
  );
}
