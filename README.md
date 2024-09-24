Website pentru perii: Casa Periilor: https://apapiu.github.io/casa-periilor/


Dev:`npm run dev`

Then to deploy:
Deploy to GH Pages: `npm run deploy`

Initial setup github actions deploy run: `npm install gh-pages --save-dev` 
and add: ```"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}```

