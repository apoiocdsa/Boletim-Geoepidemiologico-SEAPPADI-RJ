# Boletim Geoepidemiológico — SEAPADI-RJ

Repositório de dados sanitizados do Boletim de Informação Geoepidemiológico da Defesa Agropecuária da SEAPADI-RJ.

## Objetivo

Este repositório funciona como material de **consulta complementar** ao boletim em PDF enviado mensalmente às unidades regionais. Contém as planilhas de dados sanitizadas que baseiam os mapas e análises do boletim.

## Estrutura

- `dados/base_hub.csv` — Planilha contínua com todos os registros sanitizados
- `metadados/` — Dicionário de variáveis, fontes e metodologia
- `docs/` — Documentação da estrutura do boletim e fluxo de dados

## Agravos Monitorados

| Sigla/Nome | Agravo | Fonte | Situação |
|---|---|---|---|
| AIE | Anemia Infecciosa Equina | Lab. credenciado | caso |
| IAAP | Influenza Aviária Alta Patogenicidade | Lab. oficial (MAPA) | caso |
| Raiva | Raiva | Lab. oficial (PESAGRO) | caso |
| Aethina tumida | Aethina tumida (pequeno besouro das colmeias) | Lab. oficial (MAPA) | foco |
| Cria Pútrida Europeia | Cria Pútrida Europeia | Lab. oficial (MAPA) | foco |
| Brucelose | Brucelose | SISBRAVET | foco |
| Tuberculose (propriedade) | Tuberculose em propriedades | SISBRAVET | foco |
| Tuberculose (abate) | Tuberculose (achados de matança) | SIAPEC | foco |
| Cisticercose | Cisticercose (achados de matança) | SIAPEC | foco |

## Fontes de Dados

- **Laboratórios credenciados** — Notificação obrigatória à defesa agropecuária (AIE)
- **Laboratórios oficiais (MAPA)** — Diagnóstico oficial (IAAP, Aethina tumida, Cria Pútrida Europeia)
- **Laboratórios oficiais (PESAGRO)** — Diagnóstico oficial (Raiva)
- **SISBRAVET** — Sistema de Informação da Brucelose e Tuberculose (Brucelose, Tuberculose em propriedades)
- **SIAPEC** — Sistema de Informação de Produtos de Origem Animal (Tuberculose e Cisticercose em abate)

## Sanitização

Os dados foram sanitizados removendo informações que identifiquem propriedades individuais. Cada registro contém apenas:

- Município de ocorrência (nome e código IBGE)
- Agravo
- Tipo de ocorrência (foco ou caso)
- Quantidade
- Mês e ano de referência
- Fonte do dado

## Formato do Arquivo de Dados

- **Formato:** CSV (UTF-8, separado por vírgulas)
- **Codificação:** UTF-8
- **Atualização:** Mensal — novas linhas adicionadas ao final do arquivo

## Status

Repositório **interno** da equipe SEAPADI-RJ. Abertura pública planejada após validação interna.

## Licença

CC-BY 4.0 (Creative Commons Atribuição 4.0 International)
