'use client';

import { useState } from "react";
import Button from "@/components/buttons/Button";
import FilmeForm from "@/components/filmes/FilmeForm";
import FilmeList from "@/components/filmes/FilmeList";
import Modal from "@/components/modal/Modal";

export default function FilmesPage() { 
    const [mostrarModal, setMostrarModal] = useState(false);

    return (
        <div className="p-8 bg-[var(--background)] min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-[var(--terracota-desvanecido)]">
                        Gerenciar Filmes
                    </h1>
                    <Button onClick={() => setMostrarModal(true)} variant="primary">
                        Novo Filme
                    </Button>
                </div>
                <FilmeList />
                <Modal isOpen={mostrarModal} onClose={() => setMostrarModal(false)}>
                    <FilmeForm />
                </Modal>
            </div>
        </div>
    );
}