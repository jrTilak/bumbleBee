<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://bumblebee.thapatilak.com.np/">
    <img src="/src/client/src/images/favicon.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Bumblebee - AI Powered Chatbot</h3>

  <p align="center">
Bumblebee is an AI powered chatbot that can help you with your queries. It is a web based application that can be accessed from anywhere.    
<br />
    <a href="https://bumblebee.thapatilak.com.np/">View Demo</a>
    ·
    <a href="https://github.com/jrTilak/bumblebee/issues">Request Feature</a>
    ·
    <a href="https://jrtilak.me/">Read More</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

<img src="/src/client/src/images/hero-image.png" />

## Built With

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) [![Vite.js][Vite.js]][Vite-url] [![React.js][React.js]][React-url] [![Node.js][Node.js]][Node-url] [![CSS][CSS]][CSS-url] [![HTML][HTML]][HTML-url]

## Usage

- Simply visit the website and start chatting with the bot. [https://bumblebee.thapatilak.com.np/](https://bumblebee.thapatilak.com.np/)

## Setup in local machine

1.  Clone the repo
2.  `pnpm` is used as package manager. Install it using the following command
    ```sh
    npm install -g pnpm
    ```
3.  Add the following environment variables in a env file

- `src/client/.env`

  ```sh
    VITE_BACKEND_URL=
  ```

- `src/server/.env`

  ```sh
  FRONTEND_URL=
  COOKIE_SECRET=

  GEMINI_API_KEY=
  FRONTEND_DOMAIN=
  MONGODB_URL=
  JWT_SECRET=
  ```

1.  Install the dependencies
    ```sh
    pnpm install
    ```
2.  Start the server

    ```sh
    pnpm dev:server # for server
    pnpm dev:client # for client
    ```

    [contributors-shield]: https://img.shields.io/github/contributors/jrtilak/bumblebee.svg?style=for-the-badge
    [contributors-url]: https://github.com/jrtilak/bumblebee/graphs/contributors
    [forks-shield]: https://img.shields.io/github/forks/jrtilak/bumblebee.svg?style=for-the-badge
    [forks-url]: https://github.com/jrtilak/bumblebee/network/members
    [stars-shield]: https://img.shields.io/github/stars/jrtilak/bumblebee.svg?style=for-the-badge
    [stars-url]: https://github.com/jrtilak/bumblebee/stargazers
    [issues-shield]: https://img.shields.io/github/issues/jrtilak/bumblebee.svg?style=for-the-badge
    [issues-url]: https://github.com/jrtilak/bumblebee/issues
    [product-screenshot]: /frontend/src/images/hero-image.png
    [React.js]: https://img.shields.io/badge/React.js-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
    [React-url]: https://reactjs.org
    [Vite.js]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white
    [vite-url]: https://vitejs.dev/
    [Javascript]: https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E
    [Javascript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
    [CSS]: https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white
    [CSS-url]: https://developer.mozilla.org/en-US/docs/Web/css
    [HTML]: https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white
    [HTML-url]: https://developer.mozilla.org/en-US/docs/Web/html
    [Node.js]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
    [Node-url]: https://nodejs.org/en
