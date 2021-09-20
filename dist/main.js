(()=>{"use strict";var e={787:(e,s,t)=>{const r=require("throng");var o=t.n(r);const n=require("bunyan");var a=t.n(n);const i=JSON.parse('{"name":"typescriptnodetemplate","version":"1.0.0","description":"Template para usar TypeScript con nodejs","main":"./dist/main.js","scripts":{"test":"cross-env NODE_ENV=test jest --verbose --silent --collectCoverage","test:watch":"npm test -- --watch","start":"cross-env NODE_ENV=production node ./dist/main.js | bunyan","dev:start":"cross-env NODE_ENV=development npx ts-node-dev ./src/index.ts | bunyan","build":"cross-env NODE_ENV=production webpack --config webpack.prod.js"},"keywords":["template","node","typescript"],"author":"TacEtarip","license":"ISC","dependencies":{"bunyan":"^1.8.15","compression":"^1.7.4","cors":"^2.8.5","cross-env":"^7.0.3","dotenv":"^10.0.0","express":"^4.17.1","helmet":"^4.6.0","morgan":"^1.10.0","swagger-ui-express":"^4.1.6","throng":"^5.0.0"},"devDependencies":{"@types/bunyan":"^1.8.7","@types/compression":"^1.7.2","@types/cors":"^2.8.12","@types/express":"^4.17.13","@types/jest":"^27.0.1","@types/morgan":"^1.9.3","@types/supertest":"^2.0.11","@types/swagger-ui-express":"^4.1.3","@types/throng":"^5.0.2","@typescript-eslint/eslint-plugin":"^4.31.1","@typescript-eslint/parser":"^4.31.1","eslint":"^7.32.0","eslint-config-google":"^0.14.0","eslint-plugin-import":"^2.24.2","eslint-plugin-jest":"^24.4.2","eslint-plugin-node":"^11.1.0","jest":"^27.2.0","supertest":"^6.1.6","ts-jest":"^27.0.5","ts-loader":"^9.2.5","ts-node":"^10.2.1","ts-node-dev":"^1.1.8","tslib":"^2.3.1","typescript":"^4.4.3","webpack":"^5.53.0","webpack-cli":"^4.8.0","webpack-merge":"^5.8.0","webpack-node-externals":"^3.0.0"},"engines":{"node":"14.16.x"},"jest":{"moduleNameMapper":{"\\\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":"<rootDir>/__mocks__/fileMock.js"}}}');t(142).config();const{version:p}=i,c=(e,s)=>a().createLogger({name:`${e}:${s}`}),u={development:{estado:"development",port:parseInt(process.env.PORT),verify_fb:process.env.VERIFY_TOKEN,log:()=>c("DEVELOPMENT",p)},production:{estado:"production",port:parseInt(process.env.PORT),verify_fb:process.env.VERIFY_TOKEN,log:()=>c("PRODUCCION",p)},test:{estado:"test",verify_fb:process.env.VERIFY_TOKEN,port:1,log:()=>c("TEST",p)}},l=e=>{switch(e){case"development":return u.development;case"production":return u.production;case"test":return u.test}return null},d=require("compression");var g=t.n(d);const v=require("express");var h=t.n(v);const m=require("helmet");var f=t.n(m);const b=require("swagger-ui-express");var y=t.n(b);const E=JSON.parse('{"openapi":"3.0.2","info":{"license":{"name":"MIT","url":"https://github.com/TacEtarip/loscreadores/blob/main/LICENSE"},"contact":{"email":"hu3rtas@outlook.com","name":"Luis Huertas"},"title":"Template TypeScript Node","version":"1.0.0","description":"Template para realizar una aplicación de nodejs con express"},"servers":[{"url":"http://localhost:8081"}],"paths":{}}'),_=require("morgan");var w=t.n(_);const j=require("cors");var N=t.n(j);const O=require("http");var x=t.n(O);const T=process.env.WEB_CONCURRENCY||1,k=l("production"),R=parseInt(process.env.PORT);o()({worker:e=>{k.log().info(`Id Worker ${e}`);const s=new class{constructor(e){this.app=h()(),this.agregarConfiguracionBasica(),this.agregarRutas(),this.agregarDocumentacion(),this.crearServidor(e)}agregarConfiguracionBasica(){this.app.use(f()()),this.app.use(g()()),this.app.use(N()()),this.app.use(w()(":method :url")),this.app.use(h().json()),this.app.use(h().urlencoded({extended:!0}))}agregarDocumentacion(){this.app.use("/api-docs",y().serve,y().setup(E)),this.app.get("/",((e,s)=>{s.redirect("/api-docs")}))}agregarRutas(){const e=(()=>{const e=(0,v.Router)();return e.get("/",((e,s)=>s.json({message:"Ruta /fb funciona"}))),e.post("/webhook",((e,s)=>{try{const t=e.body;return"page"===t.object?(t.entry.forEach((e=>{const s=e.messaging[0];console.log(s)})),s.status(200).send("EVENT_RECEIVED")):s.status(404).json({error:"El evento no es de una pagina de subscripcion"})}catch(e){return s.status(500).json({error:e.message})}})),e.get("/webhook",((e,s)=>{const t=l("production").verify_fb,r=e.query["hub.mode"],o=e.query["hub.verify_token"],n=e.query["hub.challenge"];if(r&&o)return"subscribe"===r&&o===t?(console.log("WEBHOOK_VERIFIED"),s.status(200).send({message:"Verificacion exitosa",challenge:n})):s.status(403).json({error:"Verificacion fallida"})})),new class{constructor(e,s){this._router=s,this._ruta="/"===e[0]?e:"/"+e}get ruta(){return this._ruta}get router(){return this._router}}("fb",e)})();this.app.use(e.ruta,e.router)}crearServidor(e){this.server=x().createServer(this.app),this.server.listen(e)}}(R).server;s.on("listening",(()=>{k.log().info("http://localhost:"+R)})),s.on("close",(()=>{k.log().info("Servidor cerrado")}))},count:T})},142:e=>{e.exports=require("dotenv")}},s={};function t(r){var o=s[r];if(void 0!==o)return o.exports;var n=s[r]={exports:{}};return e[r](n,n.exports,t),n.exports}t.n=e=>{var s=e&&e.__esModule?()=>e.default:()=>e;return t.d(s,{a:s}),s},t.d=(e,s)=>{for(var r in s)t.o(s,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:s[r]})},t.o=(e,s)=>Object.prototype.hasOwnProperty.call(e,s),t(787)})();
//# sourceMappingURL=main.js.map