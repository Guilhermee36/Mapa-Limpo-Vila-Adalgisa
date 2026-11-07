-- DADOS FICTICIOS PARA DEMONSTRACAO (projeto de extensao)
-- Rode no Supabase: SQL Editor > New query > Run. Pode rodar de novo sem duplicar.
-- Para REMOVER todos os dados ficticios depois:
--   delete from public.ocorrencias where id::text like '00000000-0000-4000-8000-%';

-- remove a ocorrencia de teste antiga, se ainda existir
delete from public.ocorrencias where descricao = 'TESTE automatico';

insert into public.ocorrencias (id, created_at, tipo, descricao, lat, lng, status, apoios) values
  ('00000000-0000-4000-8000-000000000001', '2026-10-30 14:03:00+00', 'entulho', 'Pedaços de piso e massa de cimento na esquina', -23.564467, -46.766587, 'registrado', 2),
  ('00000000-0000-4000-8000-000000000002', '2026-09-17 10:12:00+00', 'reciclavel', 'Pilha de caixas de papelão sem destino em frente ao mercado', -23.563557, -46.760637, 'resolvido', 12),
  ('00000000-0000-4000-8000-000000000003', '2026-09-14 16:32:00+00', 'domestico', 'Lixo jogado do alto de um prédio no beco', -23.563015, -46.773807, 'registrado', 0),
  ('00000000-0000-4000-8000-000000000004', '2026-10-14 11:13:00+00', 'domestico', 'Sacos de lixo rasgados espalhados fora do horário da coleta', -23.565836, -46.769542, 'registrado', 2),
  ('00000000-0000-4000-8000-000000000005', '2026-10-07 15:04:00+00', 'domestico', 'Sacolas de lixo na beira do córrego', -23.563753, -46.770542, 'registrado', 3),
  ('00000000-0000-4000-8000-000000000006', '2026-10-07 11:55:00+00', 'domestico', 'Sacolas de lixo na beira do córrego', -23.559979, -46.769161, 'registrado', 1),
  ('00000000-0000-4000-8000-000000000007', '2026-09-18 08:04:00+00', 'vegetal', 'Restos de poda e folhas secas em saco aberto na rua', -23.569486, -46.766686, 'resolvido', 7),
  ('00000000-0000-4000-8000-000000000008', '2026-10-06 09:27:00+00', 'outros', 'Restos de móveis e sacos misturados na viela', -23.560022, -46.765648, 'registrado', 5),
  ('00000000-0000-4000-8000-000000000009', '2026-09-21 09:04:00+00', 'moveis', 'Cama box desmontada em frente à praça', -23.569323, -46.774920, 'resolvido', 0),
  ('00000000-0000-4000-8000-000000000010', '2026-09-12 16:20:00+00', 'pneus', 'Pneus descartados no terreno da esquina', -23.569149, -46.759882, 'encaminhado', 7),
  ('00000000-0000-4000-8000-000000000011', '2026-10-02 13:25:00+00', 'vegetal', 'Tronco de árvore cortado largado na praça', -23.558917, -46.758030, 'resolvido', 5),
  ('00000000-0000-4000-8000-000000000012', '2026-10-06 11:33:00+00', 'domestico', 'Lixeira tombada e lixo pelo chão perto da padaria', -23.560603, -46.766766, 'encaminhado', 2),
  ('00000000-0000-4000-8000-000000000013', '2026-09-28 10:09:00+00', 'domestico', 'Lixo jogado do alto de um prédio no beco', -23.570570, -46.763998, 'registrado', 2),
  ('00000000-0000-4000-8000-000000000014', '2026-10-07 09:11:00+00', 'domestico', 'Lixo jogado do alto de um prédio no beco', -23.568402, -46.763332, 'resolvido', 7),
  ('00000000-0000-4000-8000-000000000015', '2026-09-15 16:32:00+00', 'entulho', 'Entulho jogado no terreno baldio ao lado da escola', -23.567229, -46.767562, 'resolvido', 9),
  ('00000000-0000-4000-8000-000000000016', '2026-09-13 10:56:00+00', 'pneus', 'Pneus acumulando água parada (risco de dengue)', -23.558452, -46.758389, 'resolvido', 3),
  ('00000000-0000-4000-8000-000000000017', '2026-10-27 10:02:00+00', 'domestico', 'Sacos de lixo rasgados espalhados fora do horário da coleta', -23.568470, -46.760381, 'registrado', 0),
  ('00000000-0000-4000-8000-000000000018', '2026-10-31 08:10:00+00', 'entulho', 'Caçamba cheia transbordando entulho em frente a uma reforma', -23.563452, -46.759021, 'encaminhado', 2),
  ('00000000-0000-4000-8000-000000000019', '2026-10-19 07:12:00+00', 'entulho', 'Caçamba cheia transbordando entulho em frente a uma reforma', -23.570419, -46.765964, 'encaminhado', 4),
  ('00000000-0000-4000-8000-000000000020', '2026-10-05 15:26:00+00', 'entulho', 'Sacos de entulho bloqueando metade da calçada', -23.562360, -46.765463, 'registrado', 0),
  ('00000000-0000-4000-8000-000000000021', '2026-10-18 16:34:00+00', 'moveis', 'Colchão molhado deixado na calçada, atraindo ratos', -23.563224, -46.763334, 'resolvido', 1),
  ('00000000-0000-4000-8000-000000000022', '2026-10-03 14:36:00+00', 'domestico', 'Sacos de lixo rasgados espalhados fora do horário da coleta', -23.565643, -46.761256, 'encaminhado', 0),
  ('00000000-0000-4000-8000-000000000023', '2026-09-25 12:01:00+00', 'reciclavel', 'Papelão e garrafas PET soltos na rua após catação', -23.570045, -46.760792, 'resolvido', 0),
  ('00000000-0000-4000-8000-000000000024', '2026-10-16 16:29:00+00', 'vegetal', 'Tronco de árvore cortado largado na praça', -23.566739, -46.770334, 'encaminhado', 7),
  ('00000000-0000-4000-8000-000000000025', '2026-09-27 12:31:00+00', 'moveis', 'Colchão molhado deixado na calçada, atraindo ratos', -23.563314, -46.772074, 'registrado', 2),
  ('00000000-0000-4000-8000-000000000026', '2026-10-25 17:19:00+00', 'entulho', 'Restos de obra (tijolo e azulejo) na calçada há mais de uma semana', -23.565811, -46.772281, 'encaminhado', 9),
  ('00000000-0000-4000-8000-000000000027', '2026-09-21 07:04:00+00', 'pneus', 'Quatro pneus velhos jogados embaixo do viaduto', -23.561189, -46.772406, 'resolvido', 0),
  ('00000000-0000-4000-8000-000000000028', '2026-10-28 15:18:00+00', 'outros', 'Restos de móveis e sacos misturados na viela', -23.560790, -46.766497, 'registrado', 5),
  ('00000000-0000-4000-8000-000000000029', '2026-10-31 11:41:00+00', 'reciclavel', 'Pilha de caixas de papelão sem destino em frente ao mercado', -23.565470, -46.768346, 'registrado', 0),
  ('00000000-0000-4000-8000-000000000030', '2026-09-14 11:42:00+00', 'moveis', 'Colchão molhado deixado na calçada, atraindo ratos', -23.564969, -46.757814, 'registrado', 1),
  ('00000000-0000-4000-8000-000000000031', '2026-09-16 09:10:00+00', 'domestico', 'Sacos de lixo rasgados espalhados fora do horário da coleta', -23.564733, -46.773638, 'encaminhado', 3),
  ('00000000-0000-4000-8000-000000000032', '2026-10-07 07:39:00+00', 'moveis', 'Cama box desmontada em frente à praça', -23.570936, -46.774124, 'registrado', 1),
  ('00000000-0000-4000-8000-000000000033', '2026-10-14 09:17:00+00', 'moveis', 'Cama box desmontada em frente à praça', -23.570647, -46.760562, 'resolvido', 12),
  ('00000000-0000-4000-8000-000000000034', '2026-09-18 08:14:00+00', 'moveis', 'Cama box desmontada em frente à praça', -23.562930, -46.770751, 'registrado', 0)
on conflict (id) do nothing;
