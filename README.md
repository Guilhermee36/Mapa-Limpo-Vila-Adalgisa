# Mapa Limpo Vila Adalgisa

Protótipo demonstrativo de uma ferramenta web, gratuita e anônima, para enfrentar o descarte irregular de lixo na Vila Adalgisa (região da Vila Dalva), em São Paulo/SP. Reúne um mapa colaborativo de ocorrências, um guia de descarte correto com os ecopontos oficiais, o passo a passo da denúncia no SP156 e um painel de dados do bairro, divulgado por cartaz com QR Code.

Site publicado: https://mapa-limpo-vila-adalgisa.vercel.app

## Aviso importante

- **É um protótipo.** A entrega demonstra como o mapa colaborativo, o guia de descarte e o acesso ao SP156 podem ser reunidos em uma única ferramenta. A avaliação do uso pela comunidade fica para uma aplicação futura.
- **As ocorrências exibidas no mapa são fictícias**, assim como as datas delas. Foram inseridas (`supabase/seed.sql`) apenas para demonstrar o funcionamento do sistema, e o mapa traz uma legenda avisando isso.
- **O sistema não envia denúncia à Prefeitura.** Ele registra, dá visibilidade e leva o morador ao canal oficial (SP156).
- O diagnóstico vem das 33 respostas do questionário aplicado pelo grupo de Direito da UCS (Google Forms, 08 a 15/10/2026). É uma amostra pequena e voluntária: indica tendências e não representa todo o bairro.

## Contexto

Projeto de extensão do curso de Ciência da Computação (4º semestre), Universidade Cruzeiro do Sul, Campus Villa-Lobos, em parceria com o grupo de Direito, que estuda o mesmo tema e a mesma comunidade. Relaciona-se aos ODS 15 (Vida terrestre) e 3 (Saúde e bem-estar).

Equipe: André Silva Sena, Carlos Alexandre Eto, Guilherme Marques Dias, Isabelle Faria da Silva e Lucas Rafael Alves.

## Funcionalidades

- **Mapa:** pontos aprovados, com filtros por tipo, situação e período; ficha com foto, apoio dos vizinhos ("também vejo"), compartilhamento e link ao SP156; exportação em CSV.
- **Reportar lixo:** formulário anônimo com local no mapa ou por GPS, tipo de resíduo, detalhes e foto. Todo registro entra como pendente e só aparece depois de aprovado.
- **Onde descartar:** busca por item, ecopontos oficiais (subprefeituras Butantã e Lapa), ecoponto mais próximo por GPS e passo a passo da denúncia.
- **Dados do bairro:** totais, tipos, situação, meses e locais com mais registros.
- **Diagnóstico:** números do questionário do grupo de Direito.
- **Divulgar:** gera o cartaz com QR Code para imprimir.
- **IA (opcional):** sugere o tipo de resíduo e responde dúvidas só com base no guia de descarte. Quando não há chave configurada, aparece "A IA está desativada no momento".

## Tecnologias

Next.js 14 (App Router) e React 18, Leaflet com OpenStreetMap, Supabase (Postgres com RLS, Storage e função `apoiar`), hospedagem na Vercel e, opcionalmente, a API da Anthropic (Claude Haiku) no servidor.

## Como rodar

Requisitos: Node.js 18 ou superior e um projeto no Supabase.

```bash
npm install
cp .env.example .env.local   # preencha as variáveis
npm run dev                  # http://localhost:3000
```

Variáveis de ambiente:

| Variável | Uso |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Endereço do projeto Supabase (sem barra no final) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave pública (publishable) do Supabase |
| `ANTHROPIC_API_KEY` | Opcional. Ativa a IA. Fica só no servidor |

Nunca coloque a chave `sb_secret_`, a senha do banco ou a chave da Anthropic em variáveis `NEXT_PUBLIC_*` nem no código. Se criar a chave da IA, defina antes um limite de gasto no console da Anthropic e teste com `npm run testar-ia`.

## Banco de dados

No SQL Editor do Supabase, execute nesta ordem:

1. `supabase/schema.sql`: tabelas, políticas de segurança (RLS) e bucket de fotos.
2. `supabase/migracao-apoios.sql`: função `apoiar` e contagem de apoios.
3. `supabase/seed.sql` (opcional): 34 ocorrências **fictícias** para demonstração.

Para remover os dados fictícios:

```sql
delete from public.ocorrencias where id::text like '00000000-0000-4000-8000-%';
```

Moderação: o público só envia registros com `status = 'pendente'` e só vê `registrado`, `encaminhado` e `resolvido`. Para aprovar, altere o status no painel do Supabase (`rejeitado` esconde o registro).

## Publicação

Conecte este repositório à Vercel e cadastre as variáveis acima. As variáveis `NEXT_PUBLIC_*` são embutidas no build: depois de alterá-las, faça um novo deploy.

## Privacidade e fontes

O sistema não coleta nome nem dados pessoais (LGPD, Lei 13.709/2018). Os ecopontos e canais vêm de páginas oficiais da Prefeitura de São Paulo, e a posição de alguns pontos no mapa é aproximada. Na dúvida, confirme no 156.
