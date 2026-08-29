# Fluxo de Dados do Boletim

## 1. Coleta

Laboratórios (oficiais e credenciados) + SIAPEC + SISBRAVET → Planilhas brutas

## 2. Sanitização

Remover: nomes de propriedades, CIGs, nomes de proprietários, endereços, telefones
Manter: município, cod_ibge, agravo, fonte, situacao, quantidade, ano, mes

## 3. Atualização Mensal

1. Abrir `base_hub.csv` no Excel
2. Adicionar novas linhas ao final do arquivo com os dados do mês corrente
3. Salvar como CSV UTF-8 (Arquivo → Salvar como → CSV UTF-8)
4. Commitar no repositório com a mensagem: `boletim_YYYY_MM: dados de Mês/Ano`
   - Exemplo: `boletim_2026_08: dados de Agosto/2026`

## 4. Publicação

- PDF do boletim → enviado às unidades regionais
- CSV sanitizado → disponível neste repositório

## 5. Versionamento

- Usar tags mensais: `v2026.08` marca cada edição
- CHANGELOG.md documenta o que mudou entre edições
