# Oviedo · Agente de Abastecimiento ABC×XYZ

## Deploy en Netlify (5 minutos)

### 1. Subir a GitHub
1. Crea un repo nuevo en github.com
2. Sube todos estos archivos manteniendo la estructura de carpetas

### 2. Conectar con Netlify
1. Ve a app.netlify.com → "Add new site" → "Import an existing project"
2. Conecta tu repo de GitHub
3. Build settings: déjalos vacíos (ya están en netlify.toml)
4. Click "Deploy site"

### 3. Agregar la API Key de Anthropic
1. En Netlify → Site → Site configuration → Environment variables
2. Click "Add a variable"
3. Key: `ANTHROPIC_API_KEY`
4. Value: tu API key de Anthropic (empieza con `sk-ant-...`)
5. Click "Save" → luego "Trigger deploy" para que tome efecto

### 4. Compartir con tu equipo
Comparte la URL de Netlify (ej: `https://oviedo-abastecimiento.netlify.app`)

## Cómo obtener una API Key
1. Ve a console.anthropic.com
2. Crea una cuenta o inicia sesión
3. API Keys → Create Key
4. Copia la key (solo se muestra una vez)

## Estructura del proyecto
```
oviedo-app/
├── public/
│   └── index.html          ← La aplicación completa
├── netlify/
│   └── functions/
│       └── claude.js       ← Proxy seguro a la API de Anthropic
└── netlify.toml            ← Configuración de Netlify
```

## Costo estimado
- Netlify: Gratis (plan free)
- Anthropic API: ~$0.01-0.05 por análisis completo (claude-sonnet)
