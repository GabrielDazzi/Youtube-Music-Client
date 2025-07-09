# YouTube Music Client

**Um cliente de desktop leve e multiplataforma para o YouTube Music, construído com Electron e focado em uma experiência de audição limpa, sem anúncios e com integração nativa ao sistema operacional.**

![Screenshot do App](https://github.com/user-attachments/assets/0016e4a0-0eaf-4cce-b097-e3ca8f733156)

## Principais Funcionalidades

-   **Experiência Sem Anúncios**
    -   Utiliza um bloqueador de anúncios integrado para remover todas as interrupções visuais e de áudio, permitindo que você ouça suas músicas sem pausas.

-   **Controle por Teclas de Mídia Globais**
    -   Controle a reprodução (`Tocar/Pausar`, `Próxima`, `Anterior`) usando as teclas de mídia do seu teclado, mesmo quando o aplicativo estiver em segundo plano.
    
-   **Notificações Nativas**
    -   Receba uma notificação no seu desktop toda vez que uma música nova começar a tocar, mostrando o título, o artista e a capa do álbum.

-   **Leve e Integrado**
    -   Roda em uma janela de aplicativo dedicada, sem a necessidade de um navegador completo, oferecendo uma experiência mais ágil e integrada ao seu desktop (Windows, macOS e Linux).

## Tecnologias Utilizadas

-   [**Electron**](https://www.electronjs.org/) - Framework para criar aplicativos de desktop multiplataforma.
-   [**Node.js**](https://nodejs.org/) - Ambiente de execução para o processo principal do aplicativo.
-   [**@ghostery/adblocker-electron**](https://github.com/ghostery/adblocker-electron) - Engine de bloqueio de anúncios e rastreadores.
-   [**electron-store**](https://github.com/sindresorhus/electron-store) - Para persistência de configurações, como o tamanho da janela.
