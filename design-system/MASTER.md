# Design System Master - Afriatlas Travel

## 1. Identité de Marque
**Concept** : "The Modern Explorer"
**Valeurs** : Confiance, Aventure, Élégance, Sérénité.
**Style Visuel** : Minimalisme moderne avec des touches de Glassmorphism (flou d'arrière-plan, bordures subtiles).

## 2. Palette de Couleurs
Système de jetons sémantiques pour assurer la cohérence.

| Jeton | Rôle | Valeur Hex (Clair) | Valeur Hex (Sombre) |
|-------|------|--------------------|---------------------|
| `primary` | Identité principale (Océan) | `#003366` | `#4D94FF` |
| `secondary` | Aventure & Luxe (Sable/Or) | `#C5A059` | `#D4B982` |
| `accent` | Action & Énergie (Corail) | `#FF6F61` | `#FF8E84` |
| `surface` | Fond de carte/composant | `#FFFFFF` | `#1A1A1A` |
| `background` | Fond de page | `#F8F9FA` | `#0F0F0F` |
| `text-main` | Texte principal | `#1A1A1A` | `#F5F5F5` |
| `text-muted` | Texte secondaire | `#6C757D` | `#ADB5BD` |

## 3. Typographie
**Polices recommandées (Google Fonts)** :

- **Titres (Headings)** : `Playfair Display`
  - *Usage* : H1, H2, H3 pour un aspect élégant et éditorial.
  - *Poids* : Bold (700) ou Medium (500).
- **Corps (Body)** : `Montserrat` ou `Inter`
  - *Usage* : Paragraphes, labels, boutons.
  - *Poids* : Regular (400), Medium (500) pour l'emphase.

**Échelle de taille** :
- Base : 16px (1rem)
- Ratio : 1.250 (Major Third)

## 4. Composants & Effets
- **Bordures** : Rayon de `12px` pour les cartes, `50px` pour les boutons "pill".
- **Ombres** : Subtiles et diffuses (`0 4px 20px rgba(0,0,0,0.05)`).
- **Glassmorphism** : Utiliser sur les barres de navigation et les modaux.
  - `backdrop-filter: blur(10px); background: rgba(255, 255, 255, 0.7);`
- **Icônes** : Utiliser une famille cohérente (ex: Lucide ou Heroicons) avec un trait de `1.5px`.

## 5. Anti-patterns à éviter
- Pas d'emojis comme icônes de navigation.
- Éviter le noir pur (`#000`) pour le texte ; préférer des gris très foncés.
- Ne pas mélanger plus de 2 familles de polices.
- Éviter les contrastes trop faibles (respecter le ratio 4.5:1).
