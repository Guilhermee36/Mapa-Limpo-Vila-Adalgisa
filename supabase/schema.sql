-- Cole este arquivo inteiro no Supabase: SQL Editor > New query > Run

create table if not exists public.ocorrencias (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  tipo text not null check (tipo in ('entulho','moveis','domestico','reciclavel','pneus','vegetal','outros')),
  descricao text check (char_length(descricao) <= 500),
  lat double precision not null check (lat between -90 and 90),
  lng double precision not null check (lng between -180 and 180),
  foto_url text,
  status text not null default 'pendente'
    check (status in ('pendente','registrado','encaminhado','resolvido','rejeitado'))
);

alter table public.ocorrencias enable row level security;

-- Qualquer pessoa pode registrar, mas sempre como "pendente"
drop policy if exists "inserir pendente" on public.ocorrencias;
create policy "inserir pendente" on public.ocorrencias
  for insert to anon, authenticated
  with check (status = 'pendente');

-- O mapa publico so mostra o que voce aprovou (mudando o status no painel)
drop policy if exists "ler aprovadas" on public.ocorrencias;
create policy "ler aprovadas" on public.ocorrencias
  for select to anon, authenticated
  using (status in ('registrado','encaminhado','resolvido'));

-- Bucket de fotos (max 5 MB, so imagens)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('fotos', 'fotos', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;

drop policy if exists "enviar fotos" on storage.objects;
create policy "enviar fotos" on storage.objects
  for insert to anon, authenticated
  with check (bucket_id = 'fotos');
