# Dicionário de Variáveis — base_hub.csv

## Estrutura do Arquivo

- **Formato:** CSV (UTF-8, separado por vírgulas)
- **Codificação:** UTF-8
- **Frequência de atualização:** Mensal

## Colunas

| Coluna | Tipo | Descrição | Exemplo | Valores Válidos |
|---|---|---|---|---|
| `ano` | inteiro | Ano de referência da ocorrência | 2024 | 2022 a atual |
| `mes` | inteiro | Mês de referência (1-12) | 8 | 1 a 12 |
| `cod_ibge` | inteiro | Código IBGE do município (7 dígitos) | 3304557 | Códigos do RJ (33xxxxx) |
| `municipio` | texto | Nome do município | Niterói | 92 municípios do RJ |
| `agravo` | texto | Nome do agravo sanitário | Brucelose | Ver tabela abaixo |
| `fonte` | texto | Fonte do dado | Lab. credenciado | Ver tabela abaixo |
| `situacao` | texto | Tipo de ocorrência | foco | foco, caso |
| `quantidade` | inteiro | Número de focos ou casos | 3 | >= 1 |

## Valores Válidos — Agravo

| Valor | Descrição |
|---|---|
| AIE | Anemia Infecciosa Equina |
| IAAP | Influenza Aviária de Alta Patogenicidade |
| Raiva | Raiva |
| Aethina tumida | Pequeno besouro das colmeias |
| Cria Pútrida Europeia | Doença das abelhas |
| Brucelose | Brucelose bovina/bubalina |
| Tuberculose (propriedade) | Tuberculose em propriedades rurais |
| Tuberculose (abate) | Tuberculose em achados de matança |
| Cisticercose | Cisticercose em achados de matança |

## Valores Válidos — Fonte

| Valor | Descrição |
|---|---|
| Lab. credenciado | Laboratório credenciado com notificação obrigatória |
| Lab. oficial (MAPA) | Laboratório oficial do MAPA |
| Lab. oficial (PESAGRO) | Laboratório oficial da PESAGRO-RJ |
| SISBRAVET | Sistema de Informação da Brucelose e Tuberculose |
| SIAPEC | Sistema de Informação de Produtos de Origem Animal |

## Valores Válidos — Situação

| Valor | Descrição |
|---|---|
| foco | Quantidade de propriedades com foco do agravo |
| caso | Quantidade de animais com caso do agravo |

## Notas

- Os códigos IBGE dos municípios do Rio de Janeiro iniciam com `33`
- O município é redundante ao cod_ibge (mantido para legibilidade humana)
- O cruzamento espacial no web map deve ser feito exclusivamente pelo `cod_ibge`
