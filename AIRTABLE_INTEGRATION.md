# Integración de Airtable para Bridge Partners

Guía completa para traer el contenido de Bridge Partners desde Airtable.

## 1. Crear Base y Tabla en Airtable

### Paso 1.1: Crear Base
1. Ve a [Airtable.com](https://airtable.com) y crea una cuenta o inicia sesión
2. Crea una nueva base llamada "NEAR Intents"
3. Dale un nombre a tu workspace si es la primera vez

### Paso 1.2: Crear Tabla "Bridge Projects"
1. En la nueva base, crea una tabla llamada `Bridge Projects`
2. Define los siguientes campos:

| Field Name | Field Type | Descripción |
|-----------|-----------|-----------|
| `name` | Single line text | Nombre del proyecto (ej: "Rango Exchange") |
| `description` | Long text | Descripción del proyecto |
| `category` | Single select | Categoría (ej: DEX Aggregator, Bridge, Wallet) |
| `logo_url` | URL | URL de la imagen del logo |

### Paso 1.3: Crear Opciones para "Category"
En el campo `category`, agrega estas opciones:
- DEX Aggregator
- Bridge
- Intent Protocol
- DEX
- Wallet
- Protocol
- Finance
- Trading
- Platform
- dApp

### Paso 1.4: Agregar Datos
Ingresa todos los proyectos en la tabla. Ejemplo:

| name | description | category | logo_url |
|------|-------------|----------|----------|
| Rango Exchange | Multi-chain DEX aggregator... | DEX Aggregator | /images/ecosystem-logos/Rango Exchange.svg |
| Router Protocol | Cross-chain liquidity... | Bridge | /images/ecosystem-logos/Router Protocol.svg |

---

## 2. Obtener Credenciales de Airtable

### Paso 2.1: Obtener API Key
1. Ve a [airtable.com/account](https://airtable.com/account)
2. En la sección "API", haz clic en "Generate API key"
3. Copia la clave (la necesitarás después)

### Paso 2.2: Obtener IDs
1. Abre tu base en Airtable
2. En la URL verás: `https://airtable.com/app{BASE_ID}`
3. Copia el `BASE_ID`
4. En la tabla, haz clic en "..." → "Copy table ID"
5. Copia el `TABLE_ID`

---

## 3. Configurar Variables de Entorno

### Paso 3.1: Crear/Editar `.env.local`
En la raíz del proyecto, crea o edita `.env.local`:

```env
AIRTABLE_API_KEY=your_api_key_here
AIRTABLE_BASE_ID=your_base_id_here
AIRTABLE_TABLE_ID=your_table_id_here
```

### Paso 3.2: Validar
- Nunca commitees `.env.local` al repositorio
- Asegúrate de que está en `.gitignore`

---

## 4. Instalar Dependencia

```bash
npm install airtable
```

---

## 5. Crear Servicio de Airtable

Crea el archivo `lib/airtable.ts`:

```typescript
import Airtable from 'airtable';

const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = airtable.base(process.env.AIRTABLE_BASE_ID!);
const table = base(process.env.AIRTABLE_TABLE_ID!);

export interface BridgeProject {
  id: string;
  name: string;
  description: string;
  category: string;
  logo_url: string;
}

export async function getBridgeProjects(): Promise<BridgeProject[]> {
  try {
    const records = await table.select().all();
    return records.map((record) => ({
      id: record.id,
      name: record.get('name') as string,
      description: record.get('description') as string,
      category: record.get('category') as string,
      logo_url: record.get('logo_url') as string,
    }));
  } catch (error) {
    console.error('Error fetching from Airtable:', error);
    return [];
  }
}

export async function getCategories(): Promise<string[]> {
  const projects = await getBridgeProjects();
  const categories = [...new Set(projects.map((p) => p.category))];
  return ['All', ...categories.sort()];
}
```

---

## 6. Actualizar Componente BridgeProjectsSection

Edita `components/sections/BridgeProjectsSection.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import Link from 'next/link';
import Image from 'next/image';
import { BridgeProject } from '@/lib/airtable';

export function BridgeProjectsSection() {
  const [projects, setProjects] = useState<BridgeProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/bridge-projects');
        const data = await response.json();
        setProjects(data.slice(0, 5)); // Solo los primeros 5
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="py-12 px-8 md:px-20 relative bg-[#242424]">
        <div className="max-w-7xl mx-auto">
          <p className="text-zinc-400">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-8 md:px-20 relative bg-[#242424]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <RevealOnScroll>
          <div className="mb-12">
            <div className="flex gap-2 text-brand-orange mb-4">
              <span className="text-xs">→</span>
              <span className="text-xs">→</span>
              <span className="text-xs">→</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Bridge <span className="text-brand-orange">Partners</span>
            </h2>
          </div>
        </RevealOnScroll>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Project Cards */}
          {projects.map((project) => (
            <RevealOnScroll key={project.id} delay={0}>
              <div className="border border-white/10 p-5 md:p-6 rounded-[16px] relative group hover:border-brand-orange/30 shadow-lg flex gap-4 overflow-hidden transition-colors duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.4) 100%)',
                  backdropFilter: 'blur(10px)'
                }}>

                {/* Content */}
                <div className="relative z-10 flex gap-4 w-full">
                  {/* Logo */}
                  <div className="shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-[12px] bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                      <Image
                        src={project.logo_url}
                        alt={project.name}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col flex-1 min-w-0">
                    {/* Project Name */}
                    <h3 className="text-lg md:text-xl font-bold mb-2 text-white">
                      {project.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-zinc-400 mb-3 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {/* Category Badges */}
                    <div className="flex gap-2 flex-wrap">
                      <span className="text-xs px-3 py-1 rounded-md bg-white/5 text-zinc-300 border border-white/10">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}

          {/* CTA Card - See More */}
          <RevealOnScroll delay={0}>
            <Link href="/bridge">
              <div className="border border-white/10 p-5 md:p-6 rounded-[16px] h-full flex flex-col items-center justify-center cursor-pointer overflow-hidden hover:border-brand-orange transition-colors duration-300 group"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.4) 100%)',
                  backdropFilter: 'blur(10px)'
                }}>

                {/* Content */}
                <div className="relative z-10 text-center flex flex-col items-center justify-center gap-3">
                  <div className="text-4xl font-bold text-brand-orange group-hover:scale-110 transition-transform duration-300">
                    +
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white">
                    See more
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-brand-orange group-hover:gap-2 transition-all duration-300">
                    <span className="uppercase tracking-wider">Explore</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            </Link>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
```

---

## 7. Crear API Route

Crea `app/api/bridge-projects/route.ts`:

```typescript
import { getBridgeProjects } from '@/lib/airtable';

export async function GET() {
  try {
    const projects = await getBridgeProjects();
    return Response.json(projects);
  } catch (error) {
    console.error('API error:', error);
    return Response.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
```

---

## 8. Actualizar Página /bridge

Edita `app/bridge/page.tsx`:

```typescript
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { FooterCTA } from '@/components/sections/FooterCTA';
import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { BridgeProject } from '@/lib/airtable';

const categories = ['All'];

export default function BridgePage() {
  const [projects, setProjects] = useState<BridgeProject[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>(categories);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/bridge-projects');
        const data = await response.json();
        setProjects(data);

        // Extraer categorías únicas
        const cats = Array.from(new Set(data.map((p: BridgeProject) => p.category)));
        setAllCategories(['All', ...cats.sort()]);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter, projects]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1E1E1E] text-white font-sans">
        <Navigation />
        <div className="py-20 px-8 text-center">
          <p className="text-zinc-400">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white font-sans selection:bg-brand-orange-500 selection:text-black">
      <Navigation />

      {/* Header */}
      <section className="py-12 md:py-16 px-8 md:px-20 relative" style={{ background: 'linear-gradient(to bottom, #121212, #1f1f1f)' }}>
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-brand-orange transition-colors mb-8">
            <ArrowLeft size={16} />
            <span className="text-sm">Back</span>
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Bridge <span className="text-brand-orange">Partners</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl">
            Explore all our ecosystem partners for seamless cross-chain interactions
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 px-8 md:px-20 relative bg-[#1E1E1E]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-brand-orange text-black border border-brand-orange'
                    : 'bg-white/5 text-white border border-white/10 hover:border-brand-orange/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 md:py-16 px-8 md:px-20 relative bg-[#1E1E1E]" style={{ minHeight: '420px' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProjects.map((project) => (
              <RevealOnScroll key={project.id} delay={0}>
                <div className="border border-white/10 p-5 md:p-6 rounded-[16px] relative group hover:border-brand-orange/30 shadow-lg flex gap-4 overflow-hidden transition-colors duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.4) 100%)',
                    backdropFilter: 'blur(10px)'
                  }}>

                  {/* Content */}
                  <div className="relative z-10 flex gap-4 w-full">
                    {/* Logo */}
                    <div className="shrink-0">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-[12px] bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                        <Image
                          src={project.logo_url}
                          alt={project.name}
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      </div>
                    </div>

                    {/* Text Content */}
                    <div className="flex flex-col flex-1 min-w-0">
                      {/* Project Name */}
                      <h3 className="text-lg md:text-xl font-bold mb-2 text-white">
                        {project.name}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-zinc-400 mb-3 leading-relaxed line-clamp-2">
                        {project.description}
                      </p>

                      {/* Category Badges */}
                      <div className="flex gap-2 flex-wrap">
                        <span className="text-xs px-3 py-1 rounded-md bg-white/5 text-zinc-300 border border-white/10">
                          {project.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <FooterCTA />
    </div>
  );
}
```

---

## 9. Verificar y Probar

1. **Reinicia el servidor:**
   ```bash
   npm run dev
   ```

2. **Abre el navegador:**
   - Home page debe mostrar 5 proyectos de Airtable
   - Página `/bridge` debe mostrar todos con filtros funcionales

3. **Si hay errores:**
   - Revisa la consola (terminal)
   - Verifica que `.env.local` tiene las credenciales correctas
   - Asegúrate que Airtable API key es válida

---

## 10. Próximos Pasos (Opcionales)

### Cachear datos (más rápido)
En `lib/airtable.ts`, agrega caché:

```typescript
let cachedProjects: BridgeProject[] | null = null;
let cacheTime = 0;
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutos

export async function getBridgeProjects(): Promise<BridgeProject[]> {
  const now = Date.now();
  if (cachedProjects && now - cacheTime < CACHE_DURATION) {
    return cachedProjects;
  }

  // ... resto del código
  cachedProjects = records;
  cacheTime = now;
  return cachedProjects;
}
```

### Revalidar en Next.js
En `app/api/bridge-projects/route.ts`:

```typescript
export const revalidate = 3600; // Revalidar cada hora
```

---

## Troubleshooting

| Problema | Solución |
|----------|----------|
| `Error: API key is missing` | Verifica `.env.local` tiene `AIRTABLE_API_KEY` |
| `404 on /api/bridge-projects` | Verifica que `app/api/bridge-projects/route.ts` existe |
| `Logos no cargan` | Verifica que URLs en Airtable son correctas |
| `Categorías no aparecen` | Asegúrate que el campo `category` tiene datos en Airtable |

---

¡Listo! Ahora tu contenido viene desde Airtable y puedes actualizarlo sin tocar el código.
