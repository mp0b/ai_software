# Plan d'implémentation - Null AI (Rebranding, Thème Violet, Moteur Rust & Visuels Directs)

Ce plan détaille la transformation complète de l'application : rebrand vers **Null AI** avec un thème **violet néon / obsidian cyber**, modification réelle des actions du modèle selon les réglages (bone ciblé précis, lissage, prédiction), capture d'écran **DXGI 0ms GPU direct** ultra-légère sans détruire le PC, émulation souris indétectable en Rust avec courbes humaines Bézier, visuels directs à l'écran, et écran de login propre avec "Verifying Key...", Remember Me et bouton Logout.

---

## 1. Rebranding & Thème Violet ("Null AI")
- **Nom et identité** : Remplacement de toutes les occurrences de *Raven* / *Nyron* par **Null AI** (`com.null.ai`, package `null-ai`, titres et installeur).
- **Logo Null AI** : Nouveau composant `NullLogo.tsx` arborant le symbole cyber stylisé "Ø" (Null) avec lueur violette néon.
- **Palette Tailwind Violette / Obsidienne** :
  - Accents primaires : `#a855f7` (violet vibrant), `#9333ea` (violet néon), `#c084fc` (reflets clairs), `#7c3aed`.
  - Fond et panneaux : `#09060f` (fond obsidienne profond), `#120d1e` (panneaux), bordures `#251c38`.
  - Canvases d'ambiance et auras de souris (`CyberCanvas`, `MouseAura`) basculés en particules violettes cyber.
  - Tous les composants (sliders, commutateurs, top tabs, sidebar, keybinds, logos) passent au thème violet.

---

## 2. Actions Réelles des Réglages sur le Modèle (Bone Targeting & Robustesse)
- **Ciblage anatomique précis selon le réglage** :
  - `Head` : calcul et verrouillage sur la tête (top 15% du bounding box, détection crâne).
  - `Neck` : ciblage précis de la gorge/vertèbres (top 25%).
  - `Body / Chest` : ciblage du torse supérieur / centre de gravité (42-60%).
  - `Random` : sélection dynamique aléatoire pondérée pour simuler un joueur humain et tromper les anti-cheats.
  - `Custom` : offset ajustable.
- **Support pour modèles imprécis ("modèle guez")** :
  - Algorithme de stabilisation EMA (Exponential Moving Average) et filtrage des faux positifs.
  - Prédiction de vélocité Kalman (compensation du ping et de la trajectoire pour que le tir touche toujours même si le modèle a du retard).
  - Prise en compte réelle du `FOV` (rejet strict hors du cercle), de la `Strength` (accélération et lissage de la visée), du `Deadzone` (suppression du tremblement au centre).

---

## 3. Moteur de Capture DXGI 0ms Ultra-Performant en Rust
- **DirectX 11 / DXGI Desktop Duplication (`IDXGIOutputDuplication`)** :
  - Capture directe depuis la VRAM du GPU sans copie CPU inutile (zéro-copy ou staging rapide).
  - `AcquireNextFrame` avec timeout 0ms (accès sub-milliseconde instantané).
  - Découpage par zone d'intérêt (ROI centrée sur le FOV du joueur, ex: 320x320 ou 640x640) pour minimiser drastiquement l'usage mémoire et GPU : performance maximale sans faire chauffer ni détruire le PC.
  - Gestion adaptative des FPS / VSync pour ne pas surcharger le CPU au repos.

---

## 4. Émulation Souris Indétectable en Rust
- **Moteur d'injection furtif dans `src-tauri`** :
  - Utilisation de `SendInput` avec structure `MOUSEINPUT` (`MOUSEEVENTF_MOVE`, `MOUSEEVENTF_MOVE_NOCOALESCE`).
  - Décomposition des déplacements en courbes de Bézier naturelles non-linéaires (aucun anti-cheat comme EAC/BattlEye/Vanguard ne détecte de lignes droites suspectes).
  - Micro-tremblements humains (bruit physiologique et tremblement naturel de la main) et accumulation sub-pixel.
  - Architecture prête pour liaison pilote matériel (KMBox / port COM série / USB HID virtuel).

---

## 5. Visuels Directs en Temps Réel (Screen Level)
- **Overlay & Viewport temps réel haute fidélité** :
  - Affichage précis des Bounding Boxes (boîtes tactiques avec encoches angulaires violettes).
  - Squelette & points anatomiques (Tête, Cou, Torse) qui s'illuminent en fonction du bone sélectionné.
  - Snapline du réticule vers le bone cible verrouillé.
  - Cercle de FOV et Deadzone dynamique.
  - Télémétrie en direct (FPS, latence DXGI < 0.5ms, distance cible, pourcentage de confiance).

---

## 6. Écran de Connexion Pro & Simple (No Bullshit, Remember Me & Logout)
- **Authentification sobre et réaliste** :
  - Titre : **Null AI - Activation**.
  - Champ de clé de licence.
  - Case à cocher **Remember Me** (mémorisation de la clé dans le stockage persistant).
  - Message lors de la validation : simplement **"Verifying Key..."**, sans baratin d'IA fictive.
  - Remplissage rapide de test disponible.
- **Bouton Logout** :
  - Ajout d'un bouton de déconnexion direct dans l'interface (en haut à droite / paramètres) avec confirmation, permettant de revenir instantanément à l'écran d'activation.

---

## Fichiers Modifiés & Créés
- [NEW] `src/components/NullLogo.tsx` : Logo épuré Null AI avec gradient violet néon.
- [MODIFY] `src-tauri/Cargo.toml` : Ajout des dépendances Windows API pour capture DXGI et SendInput souris.
- [MODIFY] `src-tauri/tauri.conf.json` : Rebrand vers "Null AI", identifiant `com.null.ai`.
- [MODIFY] `src-tauri/src/lib.rs` : Commandes Rust DXGI 0ms, émulation souris indétectable avec courbes de Bézier et micro-jitter, inspection de modèle.
- [MODIFY] `tailwind.config.js` : Palette complète violette/obsidienne `null-purple`.
- [MODIFY] `src/context/ConfigContext.tsx` : Gestion du thème violet, persistance et nouveau nom.
- [MODIFY] `src/services/detectionEngine.ts` : Moteur de calcul précis des os anatomiques (Head, Neck, Torso, Body), filtre anti-gigue pour modèles légers et prédiction de vélocité.
- [MODIFY] `src/views/LicenseScreen.tsx` : Écran d'authentification propre sans bullshit ("Verifying Key...", Remember Me).
- [MODIFY] `src/components/TopTabs.tsx` & `Sidebar.tsx` : Intégration du thème violet, bouton Logout et logo Null AI.
- [MODIFY] `src/components/Detection/LiveDetectionViewport.tsx` : Rendu des visuels directs avec le nouveau ciblage par os et thème violet.
- [MODIFY] `src/views/VisualsView.tsx`, `AimingView.tsx`, `AISettingsView.tsx` : Intégration des réglages dynamiques réels.

---

## Plan de Vérification
1. **Compilation Frontend & TypeScript** : Exécuter `npm run build` pour vérifier l'absence d'erreurs de typage et valider les composants.
2. **Compilation Rust Backend** : Lancer `cargo check` dans `src-tauri` pour s'assurer que les appels Windows API (SendInput, DXGI status) compilent parfaitement.
3. **Validation Fonctionnelle** :
   - Tester le flux de connexion : champ licence, case "Remember Me", texte "Verifying Key...", puis bouton Logout pour se déconnecter.
   - Vérifier le ciblage du modèle quand on change de bone (`Head`, `Neck`, `Body`) : le point de visée et la snapline doivent cibler exactement l'os correspondant.
   - Vérifier les performances et le thème violet unifié sur l'ensemble des onglets.
