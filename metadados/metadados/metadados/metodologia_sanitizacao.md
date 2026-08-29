# Metodologia de Sanitização

## Objetivo

Garantir que os dados disponibilizados não permitam a identificação de propriedades individuais ou proprietários.

## O que é removido

- Nome da propriedade
- Código de identificação da propriedade (CIG, etc.)
- Nome do proprietário
- Endereço completo
- Telefone e contato
- Coordenadas geográficas precisas

## O que é mantido

- Município de ocorrência (nome e código IBGE)
- Agravo
- Tipo de ocorrência (foco ou caso)
- Quantidade
- Mês e ano
- Fonte do dado

## Resolução Espacial

A menor unidade espacial identificável é o **município**. Não há resolução abaixo disso.

## Notas

- "foco" = quantidade de propriedades com o agravo
- "caso" = quantidade de animais positivos
