'use client';

import { useState } from "react";
import Button from "@/components/buttons/Button";
import FilmeForm from "@/components/filmes/FilmeForm";
import FilmeList from "@/components/filmes/FilmeList";
import Modal from "@/components/modal/Modal";

export default function Filmes() {
    const [mostrarModal, setMostrarModal] = useState(false);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-2">Filmes</h1>
            <p className="mb-4">Esta página permite a visualização de filmes</p>
            <Button onClick={() => setMostrarModal(true)}>
                Novo Filme
            </Button>
            <FilmeList />



            <Modal isOpen={mostrarModal} onClose={() => setMostrarModal(false)}>
                <h2 className="text-xl font-semibold mb-4">Cadastro de Filme</h2>
                <FilmeForm />
            </Modal>
        </div>
    );
}
