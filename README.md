# jessehoekema.is-a.dev

[![Tech stack](https://skillicons.dev/icons?i=svelte,ts,css,html)](https://skillicons.dev)

My personal site made in svelte(kit), typescript, css, html

https://jessehoekema.com

## For me

- vercel only works when you have ```import adapter from '@sveltejs/adapter-auto';``` in the svelte.config.js (coolify will not work)

- for coolify u do: ```import adapter from '@sveltejs/adapter-node';```


## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.  