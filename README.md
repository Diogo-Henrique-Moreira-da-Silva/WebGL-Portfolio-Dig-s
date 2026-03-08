![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Threejs](https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white)
![EmailJS](https://img.shields.io/badge/EmailJS-FFB300?style=for-the-badge&logo=https%3A%2F%2Fraw.githubusercontent.com%2Fjjoaom%2FWebGL-Portfolio%2Fmain%2Fpublic%2Fimg%2Femailjs.png&logoWidth=18)

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=jjoaom_WebGL-Portfolio&metric=bugs)](https://sonarcloud.io/summary/new_code?id=jjoaom_WebGL-Portfolio)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=jjoaom_WebGL-Portfolio&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=jjoaom_WebGL-Portfolio)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=jjoaom_WebGL-Portfolio&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jjoaom_WebGL-Portfolio)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=jjoaom_WebGL-Portfolio&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jjoaom_WebGL-Portfolio)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=jjoaom_WebGL-Portfolio&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jjoaom_WebGL-Portfolio)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=jjoaom_WebGL-Portfolio&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jjoaom_WebGL-Portfolio)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=jjoaom_WebGL-Portfolio&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=jjoaom_WebGL-Portfolio)


# Portfólio Profissional - WebGl


Website de portfólio profissional desenvolvido para a disciplina **Laboratório de Desenvolvimento de Software – Engenharia de Software (PUC Minas)**.

Este projeto é um portfólio interativo em ambiente 3D desenvolvido com Three.js, combinando navegação em primeira pessoa com telas HTML integradas ao espaço virtual.

O usuário pode explorar o ambiente utilizando controles estilo jogo (WASD + mouse) e alternar entre modo de navegação e modo de interação para acessar conteúdos como páginas de projetos, experiências e contato.

---

## 🖥️ Conceito Visual

O portfólio segue um conceito criativo inspirado em:

🟢 Interface estilo **Frutiger Aero / Windows Vista**    
🟢 Layout imersivo utilizando WebGl

A proposta é criar uma experiência diferenciada e memorável para o visitante.
Versão em português e inglês
---

## Estrutura do Site

### 📁 Sobre Mim
- Apresentação pessoal
- Objetivos profissionais

---

### 📁 Projetos
- Timeline de projetos
- Cada projeto contém:
  - Nome e descrição
  - Tecnologias utilizadas
  - Link do GitHub
  - Imagens/GIFs do funcionamento

---

### 📁 Experiências
- Histórico profissional e acadêmico
- Participações em projetos e eventos
- Descrição resumida por experiência

---

### 📁 Contato
- Links diretos:
  - WhatsApp
  - LinkedIn
  - E-mail
- Formulário de contato funcional

---

## 🎨 Wireframes
### Sobre Mim 
<p>
  <img width="700" height="1140" alt="Captura de tela 2026-03-01 190821" src="https://github.com/user-attachments/assets/69310cfd-84ba-47f8-be98-98743e56512c" />
</p>

### Projetos
<p>
  <img width="700" height="1140" alt="Captura de tela 2026-03-01 190850" src="https://github.com/user-attachments/assets/417c16f0-882f-4816-a29f-6d14728db280" />
</p>

### Experiências 
<p>
  <img width="700" height="1138" alt="Captura de tela 2026-03-01 190920" src="https://github.com/user-attachments/assets/56602ce6-1c27-471a-8709-e59cbe4c6730" />
</p>

### Contato
<p>
  <img width="700" height="1140" alt="Captura de tela 2026-03-01 190948" src="https://github.com/user-attachments/assets/3e5f8d66-0efd-472a-9c87-914990533576" />
</p>

---

## Instruções

### 1. Configurar o conteúdo do portfólio

Edite os arquivos de tradução para adicionar suas informações nas duas versões do site:

- Inglês: `/src/locales/en-portfolio.json`
- Português: `/src/locales/pt-portfolio.json`

Esses arquivos controlam todo o conteúdo exibido no portfólio (textos, projetos, descrição, etc.).

---

### 2. Configurar envio de e-mail

O formulário de contato utiliza o serviço EmailJS para enviar mensagens diretamente do site.

1. Crie uma conta em https://www.emailjs.com/
2. Conecte seu e-mail dentro da plataforma.
3. Crie:
   - um **Service**
   - um **Email Template**
4. Copie os dados fornecidos pelo painel do EmailJS:
   - **Service ID**
   - **Template ID**
   - **Public Key**

---

### 3. Criar o arquivo `.env`

Na raiz do projeto, crie um arquivo `.env` baseado no arquivo de exemplo `.env.example`

### 4. Rodar o projeto

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O projeto ficará disponível normalmente em:

```
http://localhost:5173
```

### 5. Gerar build de produção

Para gerar a versão otimizada do site para produção, execute:

```bash
npm run build
```

Os arquivos finais serão gerados na pasta:

```
/dist
```

Essa pasta contém os arquivos estáticos prontos para serem hospedados em qualquer serviço de deploy (como servidores web ou plataformas de hospedagem).


## 🎮 Controles
### Movimentação
- WASD → Andar
- Mouse → Olhar ao redor
- E → Alternar entre Jogar (mouse travado) e Interagir (mouse livre)
- Clique → Destrava o mouse para interagir com as telas

### Interação com Telas
- Quando o mouse estiver livre, é possível clicar, rolar e usar formulários normalmente.

### Modo Editar Telas
- T → Ativar/Desativar modo edição
- 1–4 → Selecionar tela
- Tab → Próxima tela
- Setas → Mover
- PgUp / PgDn → Subir/Descer
- Q / E → Rotacionar
- + / - → Escalar

### Layout
- Ctrl + S → Exportar layout
- Ctrl + O → Importar layout
