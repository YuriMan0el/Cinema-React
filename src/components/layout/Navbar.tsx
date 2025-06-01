"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/filmes', label: 'Filmes' },
  { href: '/salas', label: 'Salas' },
  { href: '/cadastro-sessoes', label: 'Cadastrar Sessão' },
  { href: '/sessoes', label: 'Sessões Disponíveis' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className="shadow-md"
      style={{ backgroundColor: 'var(--casca-de-ovo)' }}
    >
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold transition-colors"
          style={{
            color: 'var(--dourado-champanhe)',
          }}
        >
          CineControl
        </Link>
        <ul className="flex items-center space-x-3 md:space-x-5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm md:text-base font-medium transition-all duration-150 ease-in-out`}
                  style={{
                    backgroundColor: isActive ? 'var(--dourado-champanhe)' : 'transparent',
                    color: isActive ? 'var(--casca-de-ovo)' : 'var(--terracota-desvanecido)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'var(--bege-dourado-claro)';
                      e.currentTarget.style.color = 'var(--casca-de-ovo)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'var(--terracota-desvanecido)';
                    }
                  }}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div
        className="border-b-2 opacity-50"
        style={{ borderColor: 'var(--bege-dourado-claro)' }}
      ></div>
    </nav>
  );
}
