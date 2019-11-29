FORMAT: 1A
HOST: https://damp-shelf-01778.herokuapp.com

# Server3R Fase 0

<hr>
# Objetivo

**Server3R Fase 0** é um projeto cujo propósito é a verificação e estudos
de tecnologias para se implementar uma plataforma de ensino à distância.

<hr>

# Escopo de estudo


<hr>
# Escopo de estudo

<hr>
## Escopo de estudo

<hr>

## Escopo de estudo

Neste projeto está implementado um robô que conversa com usuários
que acessam uma página do Facebook.

Trata-se da página:<br>
**Sistema de Gestão com Consultoria**

...que pode ser acessa via:<br>
[https://www.facebook.com/xpnet73/](https://www.facebook.com/xpnet73/)

Então, no projeto estão demonstradas as tecnologias
utilizadas para se fazer isso.

Você pode "conversar" com a página acima e o robô implementado
vai providenciar respostas.






<hr>
# Arquitetura

No Facebook foi criado o aplicativo onde foi cadastrado o Webhook:

https://damp-shelf-01778.herokuapp.com/webhook2

para o qual o Facebook vai enviar e receber mensagens a partir
das mensagens enviadas pelos usuários, pelo Messenger, para
a página acima.

Nesse Webhook existe um programa feito em Javascript que roda em NodeJS
hospedado na plataforma Heroku.

Além de se respoder automaticamente às mensagens dos usuários,
o programa permite a observação e testes de diversos aspectos
das tecnologias oferecida pelo Facebook.






<hr>
# Operação

Acesse:

[https://damp-shelf-01778.herokuapp.com/ProcessOption?MethodName=ShowLogs](https://damp-shelf-01778.herokuapp.com/ProcessOption?MethodName=ShowLogs)

Você poderá clicar em uma das opções:

## Exibe os Logs

Serão exibidas todas as mensagens armazenadas pelo programa,
através das quais pode-se compreender a estrutura das mensagens
trocadas com o Facebook.

## Limpa os Logs

Limpa os Logs registrados até então.

## Exibe os IDs dos Usuários que "falaram" com a página

Quando um usuário do Facebook envia uma mensagem para a página
**Sistema de Gestão com Consultoria**
este programa, através do Webhook cadastrado no Facebook
recebe mensagens do Facebook que identifica o **ID** do
Usuário.

A partir desse ID podem ser feitos logs, acompanhamentos,
avaliações, etc. do usuário bem como o envio de mensagens para ele.

Esta opção demonstra a capacidade do programa de armazenar tais IDs.

## Limpa os IDs dos Usuários que "falaram" com a página

Limpa os IDs armazenados até então.

## (Bot Proativo) Envia Mensagem

Esse clique envia, a título de demonstração, uma mensagem
(via Messenger do Facebook) para um usuário específico
demonstrando essa possibilidade.

## (Bot Proativo) Envia Mensagem com Botões

Esse clique faz o mesmo que o anterior, porém envia
botões de alternativas para o usuário.

## Escreve um Posts na Pagina publicada

Aqui uma mensagem é publicado um *post* na página
**Sistema de Gestão com Consultoria**.

Devido à questões de segurança será exibida mensagem de
autenticação necessária.

## Login via Facebook

Este clique se permite demonstrar a interface entre o
Login via Facebook e sua identificação do Usuário pelo programa.


<hr>
# Implementação

Você encontra os fontes desse projeto em:

[https://github.com/andregarcia73/Server3R_Step_0](https://github.com/andregarcia73/Server3R_Step_0)

## index.js

É o módulo principal do programa.

Como o objetivo deste programa é o de se estudar as tecnologias disponíveis
este módulo está facilmente identificado em "blocos".

Assim, por exemplo, se você desejar saber como se faz para se enviar
mensagens com botões, basta procurar o "bloco":

<code>
    //---------------------------------------------------------------------------<br>
    // Send Text Message via API Send<br>
    //---------------------------------------------------------------------------<br>
    ...<br>
</code>

## lib.js

É o módulo que contém a biblioteca de funções utilizadas neste projeto.

## BotIntelligence.js

Aqui reside o módulo de funções que analisam e permitem mensagens de respostas pelo robô.

## BotDataBase.txt

Esta é uma base de dados de teste de perguntas e respostas.

<hr>
# Conclusão

Através desta fase foi possível demonstrar que é possível se implementar um
programa que utilize o Facebook (Páginas e Messenger) onde usuários
podem interagir com robôs do programa, sendo conduzidos a um aumento de conhecimento.

Podem, portanto ser feitas coisas como:

<ul>
<li>Identificação dos usuários através de Login via Facebook.
<li>Implementação de respostas automáticas à mensagens dos usuários para determinadas páginas.
<li>Exibição de alternativas e captura das respostas com possível condução em
    árvores de conhecimento.
<li>Envio de mensagens como alertas, lembretes, etc. aos usuários conhecidos.
<li>Post de mensagens na página
</ul>

Em resumo, é possível se desenvolver um completo programa, baseado em robôs, que
conduzem os usuários a um aumento de conhecimento.
