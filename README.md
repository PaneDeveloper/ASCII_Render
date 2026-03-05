ASCII Render v5.4 

Um renderizador de vídeo e imagem em tempo real que transforma mídia em arte ASCII e sistemas de partículas dinâmicos. Construído para experimentação visual de alta performance diretamente no navegador.

🚀 Funcionalidades Principais

Hybrid Engine: Alternância inteligente entre processamento local (JavaScript Client-side) e processamento em nuvem via Socket.io.

Modos de Renderização:

Classic: ASCII tradicional (baixa densidade).

Hi-Res: Caracteres de alta definição para capturar detalhes minuciosos.

Blocks: Estilo retrô de preenchimento denso.

Particles: Engine de pontos dinâmicos ("bolinhas") com densidade ajustável.

Gravação Integrada: Captura sincronizada do Canvas e do áudio original, gerando arquivos .webm prontos para uso.

Pós-Processamento: Ajustes de brilho, contraste, inversão cromática e espelhamento (Flip).

Persistência de Preferências: Configurações de interface salvas apenas no LocalStorage do seu navegador.

🔒 Privacidade & LGPD

Este projeto foi desenvolvido respeitando a Lei Geral de Proteção de Dados (LGPD) e os princípios de Privacy by Design:

Sem Coleta de Dados: O site não coleta, armazena ou compartilha dados pessoais, imagens ou vídeos enviados pelo usuário.

Processamento Local: Todo o processamento de imagem ocorre em tempo real na memória RAM do seu dispositivo (ou é enviado temporariamente ao seu próprio servidor local, caso use o modo Cloud).

Memória Volátil: Assim que a página é atualizada ou fechada, qualquer rastro da mídia processada é permanentemente apagado da memória do navegador.

LocalStorage: O site utiliza apenas o armazenamento local para lembrar suas preferências de visualização (brilho, contraste, etc.), sem enviar essas informações para servidores externos.

⚠️ Aviso de Performance & Hardware

Este projeto inclui uma Engine de Partículas de alta intensidade.

Consentimento Obrigatório: O modo de partículas só é ativado após a confirmação no modal de segurança.

Hardware: O uso intenso de recursos pode aquecer dispositivos móveis. Use com moderação.

Aviso Legal: O software é fornecido "como está", sem garantias de qualquer tipo. Os desenvolvedores não se responsabilizam por danos de hardware decorrentes do uso intensivo de processamento.

📂 Como Hospedar (GitHub Pages)

Este projeto é totalmente compatível com o GitHub Pages:

Faça o Push dos arquivos para o seu repositório.

No GitHub, vá a Settings > Pages.

Em Build and deployment, selecione a branch main.

O link estará disponível em minutos!

💻 Estrutura Técnica (Open Source)

O código foi desenhado para ser modular e transparente:

Sincronização: O sistema reinicia o vídeo automaticamente ao iniciar uma gravação.

Áudio: Utilização da API AudioContext para roteamento de sinal.

Gráficos: Manipulação direta de ImageData via HTML5 Canvas API.

📝 Licença

Distribuído sob a licença MIT. Sinta-se à vontade para contribuir, abrir Issues ou fazer um Fork!

Desenvolvido com ❤️ por Pane Developer
