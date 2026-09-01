# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture

Site statique HTML/CSS/JS déployé sur Vercel (agency-a.vercel.app). Zéro framework. Backend Supabase (projet `ehxwuhxedrjmsncbhtvn`) pour auth, base de données et storage.

- `css/shared.css` — styles globaux (CSS variables : `--ink`, `--cream`, `--sand`, `--muted`, `--beige`, `--body`, `--display`)
- `js/shared.js` — nav mobile, reveal animations
- `js/auth.js` — Auth helper (getProfile, protect, logout)
- `js/supabase-client.js` — initialise `window.sb`
- `supabase/config.js` — clés Supabase publiques
- `js/admin.js` — logique admin (auth overlay, panels, CRUD)
- `js/content-loader.js` — injecte les textes Supabase sur les pages publiques via `data-content-key`
- `js/content-manager.js` — panneau admin pour éditer `site_content`
- `js/media-manager.js` — médiathèque admin (upload, replace, delete)
- `js/media-loader.js` — charge les images depuis `site_media` via `data-media-slot`

## Supabase — tables clés

- `profiles` — rôle utilisateur (`admin` | `client`)
- `inquiries` — formulaires de contact
- `projects` + `project_documents` + `project_images` + `project_messages` — espace client
- `site_media` — médiathèque (bucket `site-media`)
- `site_content` — textes éditables (clé = `page.section.key`, ex: `accueil.hero.titre`)

RLS : toutes les tables admin utilisent `public.is_admin()` (SECURITY DEFINER) pour éviter la récursion infinie sur `profiles`.

## Admin (`/admin`)

Auth via overlay intégré (pas de redirect). `showPanel` est exposé globalement via `window.showPanel` pour les onclick inline. Les panels : `overview`, `content`, `media`, `inquiries`, `clients`, `projects`, `messages`, `access`.

## Système de contenu dynamique

Les textes éditables ont l'attribut `data-content-key="page.section.key"` sur les éléments HTML. `content-loader.js` (chargé via CDN Supabase + config + supabase-client) injecte les valeurs au chargement. Pages instrumentées : index, contact, a-propos, tarifs, humanitaire, boutique.

## Déploiement

Git push sur `main` → Vercel déploie automatiquement. Le fichier `.git/index.lock` peut bloquer les commits depuis le sandbox — supprimer manuellement depuis Windows si nécessaire.

---

## Guardrails — règles impératives

### 1. Ne jamais tronquer le code
Après chaque modification d'un fichier, vérifier que le fichier n'est pas tronqué :
- Compter les balises ouvrantes/fermantes (`<div>` / `</div>`, `{` / `}`)
- Vérifier que la dernière ligne du fichier est bien la balise de fermeture attendue (`</html>`, `}`, etc.)
- Si un fichier HTML est modifié, vérifier que `</html>` est présent à la fin
- Utiliser `tail -5` ou `wc -l` pour confirmer l'intégrité du fichier après chaque write

### 2. Modifications chirurgicales uniquement
Ne jamais réécrire un fichier entier pour une modification partielle. Utiliser `Edit` (diff ciblé) plutôt que `Write` (remplacement complet) sauf si le fichier est nouveau ou nécessite une refonte totale.

### 3. Variables globales exposées pour les onclick inline
Toute fonction appelée depuis un attribut `onclick=""` en HTML doit être exposée via `window.nomFonction = nomFonction`. Ne jamais supposer qu'une fonction définie dans un IIFE ou une fonction async est accessible globalement.

### 4. IDs HTML vs JS
Avant d'utiliser `document.getElementById('monId')` dans un JS, vérifier que cet ID existe bien dans le HTML cible. Utiliser une vérification défensive : `const el = document.getElementById('monId'); if (el) el.textContent = ...`

### 5. CSS avant HTML
Si un JS construit du HTML dynamique avec des classes CSS, vérifier que ces classes sont définies dans le CSS avant de pousser. Chercher la classe dans `css/shared.css` ou dans le `<style>` de la page.

### 6. Pas de `console.log` en production
Supprimer ou commenter les `console.log` de debug avant tout commit final.

### 7. Vérification post-modification
Après chaque série de modifications :
```bash
# Vérifier intégrité fichiers HTML
for f in *.html; do tail -1 "$f"; done
# Vérifier fichiers JS (dernière ligne)
for f in js/*.js; do echo "$f:"; tail -1 "$f"; done
```
