'use client';

import IngressoForm from '@/components/ingressos/IngressosForm';

export default function VendaIngressosPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-center">Venda de Ingressos</h1>
        <p className="mb-6 text-gray-600 text-center">
          Preencha os dados abaixo para realizar a venda de ingressos.
        </p>
        <IngressoForm />
      </div>
    </div>
  );
}
