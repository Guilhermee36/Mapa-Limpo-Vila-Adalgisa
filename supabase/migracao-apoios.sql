-- Rode UMA vez no Supabase: SQL Editor > New query > Run
-- Adiciona o botao "Eu tambem vejo esse problema" (contador de apoios).

alter table public.ocorrencias add column if not exists apoios integer not null default 0;

create or replace function public.apoiar(p_id uuid)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare n integer;
begin
  update public.ocorrencias
     set apoios = apoios + 1
   where id = p_id and status in ('registrado','encaminhado','resolvido')
  returning apoios into n;
  return n;
end;
$$;

grant execute on function public.apoiar(uuid) to anon, authenticated;
