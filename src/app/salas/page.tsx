"use client"
import Button from '@/components/buttons/Button';
import Modal from '@/components/modal/Modal';
import SalaForm from '@/components/salas/SalaForm';
import SalaList from '@/components/salas/SalaList';
import { useState } from 'react';

export default function SalasPage() {
    const [mostrarModal, setMostrarModal] = useState(false);
    return (
        <main className="min-h-screen bg-var(--background) p-8">
            <Button onClick={() => setMostrarModal(true)}>
                Nova Sala
            </Button>
            <SalaList />
            <Modal isOpen={mostrarModal} onClose={() => setMostrarModal(false)}>
                <h2 className="text-xl font-semibold mb-4">Cadastro de Sala</h2>
                <SalaForm />
            </Modal>
        </main>
    );
}