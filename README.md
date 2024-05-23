# Instalace

```shell
npm install
```

# Použití v jiném projektu

1. Založit si projekt pomocí `npm init kodim-app@latest <nazev-projektu> react`.
1. Upravit soubor `package.json` – v objektu `scripts` nahradit řádek s `build` následujícími třemi řádky:
    ```
    "build:vite": "vite build",
    "build:api": "copyfiles api/* deno.* dist/",
    "build": "npm run build:vite && npm run build:api",
    ```
1. Vytvořit soubor `/.env.local` (pozor na tečku na začátku – na MacOS a Linuxu je takový soubor standardně skrytý) s následujícím obsahem:
    ```shell
    CORS_ORIGIN=http://localhost:5173
    ```
1. Zkopírovat do svého projektu následující soubory z tohoto projektu:
    ```
    /deno.json
    /src/.env.development
    ```
1. Vytvořit si adresář `/api` a v něm soubor s kódem serveru (v konfiguraci `deno.json` se předpokládá, že to bude soubor `/api/main.js`).
1. Při volání `fetch` v klientském kódu používat následující konstrukci pro zjištění adresy serveru, např.:
    ```javascript
    const API_URL = import.meta.env.VITE_API_URL ?? "/api";
    const response = await fetch(`${API_URL}/projects`);
    ```

# Spuštění

Lokální vývoj – frontend (startuje na http://localhost:5173):
```shell
npm run dev
```

Lokální vývoj – backend(startuje na http://localhost:8000):
```shell
deno task dev
```

Server (backend+frontend):
```shell
deno task start
```


# Struktura projektu

## Frontend (Vite)

```
/public             – soubory, které se beze změny kopírují do výsledné distribuce (do kořenové složky)
/src                – zdrojové kódy frontendu (HTML, CSS, JSX, JS, obrázky, …)
/dist               – výsledná aplikace k distribuci (vytvoří se až při buildu)
/node_modules       – stažené npm balíčky (vytvoří se při npm install)
/package.json       – konfigurace balíčků pro npm
/package-lock.json  – fixované verze balíčků pro npm
/vite.config.js     – konfigurace Vite.js
/src/.env           - proměnné prostředí pro frontend
/src/.env.*         - proměnné prostředí pro frontend
```

## Backend (Deno)

```
/api                – zdrojové kódy backendu (JS)
/deno.lock          – fixované verze balíčků pro Deno
/deno.json          – konfigurace Deno (může být také deno.jsonc)
/.env               - proměnné prostředí pro backend
/.env.*             - proměnné prostředí pro backend
```

## Git a GitHub
```
/.gitignore         – konfigurace Gitu – které soubory se nemají ukládat do git repository
/.github            – konfigurace GitHubu pro Deno Deploy – vytváří se automaticky při připojení projektu do Deno Deploy
```

# Backend

## Endpointy

### Projekty

<dl>
    <dt>GET /api/projects</dt>
    <dd>Vrací seznam všech projektů.</dd>
    <dt>GET /api/projects/:id</dt>
    <dd>Vrací údaje o konkrétním projektu.</dd>
    <dt>POST /api/projects</dt>
    <dd>Přidá nový projekt.</dd>
    <dt>PUT /api/projects/:id</dt>
    <dd>Přepíše informace o konkrétním projektu.</dd>
    <dt>PATCH /api/projects/:id</dt>
    <dd>Aktualizuje údaje o konkrétním projektu (zaslané informace přepíšou ty uložené, zbytek se ponechá beze změny).</dd>
    <dt>DELETE /api/projects/:id</dt>
    <dd>Smaže konkrétní projekt.</dd>
</dl>

### Úkoly

<dl>
    <dt>GET /api/tasks</dt>
    <dd>Vrací seznam všech úkolů.</dd>
    <dt>GET /api/tasks/:project/</dt>
    <dd>Vrací seznam všech úkolů v daném projektu. ‼ TODO dojde ke změně formátu URL. Nyní je důležité lomítko na konci!</dd>
    <dt>GET /api/tasks/:project/:date</dt>
    <dd>Vrací seznam všech úkolů v daném projektu pro daný den. ‼ TODO dojde ke změně formátu URL.</dd>
    <dt>GET /api/tasks/:id</dt>
    <dd>Vrací údaje o konkrétním úkolu.</dd>
    <dt>POST /api/tasks</dt>
    <dd>Přidá nový úkol.</dd>
    <dt>PUT /api/tasks/:id</dt>
    <dd>Přepíše údaje o konkrétním úkolu.</dd>
    <dt>PATCH /api/tasks/:id</dt>
    <dd>Aktualizuje údaje o konkrétním úkolu (zaslané informace přepíšou ty uložené, zbytek se ponechá beze změny).</dd>
    <dt>DELETE /api/tasks/:id</dt>
    <dd>Smaže konkrétní úkol.</dd>
</dl>

### HTTP návratové kódy
* 200 – OK, vrací data (v případě aktualizace `PUT` nebo `PATCH` byla aktualizace úspěšná).
* 201 – Created, záznam by vytvořen.
* 204 – No content – záznam byl úspěšně smazán (odpověď na `DELETE`).
* 404 – Not found – kolekce nebo záznam neexistuje.
* 500 – Obecná chyba serveru.
* 501 – Unauthorized – pro přístup ke kolekci musí být uživatel přihlášen.

## Struktura dat

### Společná metadata

```js
{
    "$$id": string,             // identifikátor záznamu
    "$$versionstamp": string,   // verze záznamu – časová značka – údaj, kdy byl záznam vytvořen nebo naposledy změněn
}
```


### Project

```js
{
    "title": string,
    "description": string,      // volitelný údaj
}
```

### Task

```js
{
    "project": string,          // identifikátor projektu
    "title": string,
    "date": string,             // datum ve formáty YYYY-MM-DD
    "time": string,             // volitelný údaj, čas ve formátu hhmm
}
```

# Autentizace
‼ TODO

# Nasazení aplikace (deploy)

## Deno Deploy

[Deno Deploy](https://deno.com/deploy)

Project Configuration:
* Framework Preset: Vite
* Install Step: npm install
* Build step: `npm run build`
* Root directory: `dist`
* Entry point: `./api/main.js`