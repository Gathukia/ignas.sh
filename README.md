# Ignas.sh

Welcome to **Ignas.sh**, my personal site built with Next.js. It features a bunch of stuff, my portfolio, blogs, projects...etc

## Live Site

Check the live version here: [ignas.sh](https://ignas-sh.pages.dev).


## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Javascript]

## Getting Started

To run the site locally:

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/ignas-sh.git
   ```

2. Go to the project directory:
   ```bash
   cd ignas-sh
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Folder Structure

```
ignas-sh/
├── app/
│   ├── blog/
│   │   ├── [slug]/
│   │   │   └── page.js
│   │   ├── page.js
│   ├── projects/
│   │   ├── [id]/
│   │   │   └── page.js
│   │   ├── page.js
│   ├── about/
│   │   └── page.js
│   ├── contact/
│   │   └── page.js
│   ├── layout.js
│   ├── page.js
│   └── globals.css
├── components/
│   ├── ui/
│   │   ├── Button.js
│   │   ├── Card.js
│   │   └── Input.js
│   ├── layout/
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   └── Navbar.js
│   ├── blog/
│   │   ├── BlogCard.js
│   │   └── BlogList.js
│   └── projects/
│       ├── ProjectCard.js
│       └── ProjectList.js
├── public/
│   ├── images/
│   │   ├── logo.svg
│   │   └── favicon.ico
│   └── fonts/
│       └── custom-font.woff2
├── data/
│   ├── projects.json
│   └── blog-posts.json
├── scripts/
│   └── generate-sitemap.js
├── .gitignore
├── .eslintrc.js
├── .prettierrc
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

## Deployment

The site is deployed on Cloudflare Pages. Pushes to the `main` branch automatically trigger new deployments.

## Contributing

All contributions are welcome! Here’s how to contribute:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/MyFeature`)
3. Commit your changes (`git commit -m 'Added MyFeature'`)
4. Push your branch (`git push origin feature/MyFeature`)
5. Open a Pull Request

## License

Licensed under the [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/). You can share, adapt, and use this project personally & commercially as long as you give proper credit.

## Contact

Feel free to reach out!

- Twitter: [@ignas](https://twitter.com/ignas_edwin)
