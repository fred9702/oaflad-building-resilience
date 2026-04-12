# Syst&egrave;me d'inscription s&eacute;curis&eacute; — Proposition technique

**Projet :** Plateforme de la campagne #BuildingResilience (resilience241)
**Date :** 12 avril 2026
**&Eacute;v&eacute;nement :** 17 avril 2026, Libreville, Gabon
**Pr&eacute;par&eacute; par :** CHOMEI COMMERZ LTD (BOMALAB)

---

## 1. Objectif

Restreindre l'inscription afin que seules les personnes ayant re&ccedil;u un QR code du comit&eacute; d'organisation puissent s'inscrire. Fournir au comit&eacute; un tableau de bord en lecture seule pour suivre les inscriptions en temps r&eacute;el.

## 2. Fonctionnement

### 2.1 Inscription prot&eacute;g&eacute;e par jeton

La page d'inscription est masqu&eacute;e du public. Elle n'est accessible qu'en scannant un QR code contenant un jeton secret dans l'URL :

```
https://resilience241.com/fr/register?t=<jeton-secret>
```

- **Sans jeton valide :** La page affiche un message &agrave; l'image de la campagne &mdash; *&laquo; L'inscription est r&eacute;serv&eacute;e aux personnes invit&eacute;es &raquo;* &mdash; en fran&ccedil;ais et en anglais. Aucun formulaire n'est affich&eacute;.
- **Avec un jeton valide :** Le formulaire d'inscription appara&icirc;t et fonctionne normalement.
- **Le jeton est v&eacute;rifi&eacute; c&ocirc;t&eacute; serveur** au chargement de la page ET lors de la soumission du formulaire, emp&ecirc;chant tout contournement.

Les jetons sont g&eacute;n&eacute;r&eacute;s de mani&egrave;re cryptographique (32+ caract&egrave;res) et stock&eacute;s en toute s&eacute;curit&eacute; dans la base de donn&eacute;es de la plateforme.

### 2.2 Fen&ecirc;tre d'inscription

Chaque jeton peut optionnellement avoir une **date d'ouverture** et une **date de fermeture** :

- Avant la date d'ouverture : l'inscription n'est pas encore disponible.
- Apr&egrave;s la date de fermeture : l'inscription est automatiquement ferm&eacute;e.
- Le comit&eacute; peut &eacute;galement **activer ou d&eacute;sactiver manuellement** un jeton &agrave; tout moment.

Les deux m&eacute;canismes fonctionnent ensemble &mdash; un jeton doit &ecirc;tre actif ET dans sa fen&ecirc;tre temporelle pour donner acc&egrave;s.

### 2.3 Apr&egrave;s l'&eacute;v&eacute;nement

Apr&egrave;s l'&eacute;v&eacute;nement (17 avril 2026), l'inscription se ferme automatiquement via la date de fermeture. Les donn&eacute;es d'inscription sont conserv&eacute;es et le tableau de bord reste accessible pour les rapports et exports post-&eacute;v&eacute;nement.

## 3. Gestion des QR codes

Le comit&eacute; dispose de deux options pour la gestion des QR codes :

### Option A : Libre-service (via le tableau de bord)

Les membres du comit&eacute; se connectent au tableau de bord et peuvent :

- Cr&eacute;er de nouveaux jetons (un QR code est g&eacute;n&eacute;r&eacute; automatiquement)
- Visualiser et t&eacute;l&eacute;charger les QR codes pour impression
- D&eacute;finir les dates d'ouverture/fermeture pour chaque jeton
- Activer ou d&eacute;sactiver les jetons instantan&eacute;ment
- Attribuer un libell&eacute; &agrave; chaque jeton (ex. : &laquo; QR &Eacute;v&eacute;nement principal &raquo;, &laquo; QR R&eacute;ception VIP &raquo;)

### Option B : Service g&eacute;r&eacute;

BOMALAB g&egrave;re les jetons pour le compte du comit&eacute; :

- BOMALAB cr&eacute;e et configure les jetons selon les demandes
- Les QR codes imprimables sont envoy&eacute;s directement au comit&eacute;
- Le comit&eacute; se concentre uniquement sur la distribution et le suivi des inscriptions

Le comit&eacute; peut choisir l'une ou l'autre option, ou une combinaison des deux.

## 4. Tableau de bord du comit&eacute;

Un espace d'administration prot&eacute;g&eacute;, accessible uniquement aux membres autoris&eacute;s du comit&eacute;.

### 4.1 Acc&egrave;s et authentification

- Chaque membre du comit&eacute; re&ccedil;oit un acc&egrave;s personnel (via un lien magique envoy&eacute; par email &mdash; aucun mot de passe &agrave; retenir)
- Bas&eacute; sur Supabase Auth (standard industriel, sans co&ucirc;t suppl&eacute;mentaire)
- Pas de mot de passe partag&eacute; &mdash; chaque membre a ses propres identifiants

### 4.2 Fonctionnalit&eacute;s du tableau de bord

Toutes les fonctionnalit&eacute;s sont **en lecture seule** &mdash; le tableau de bord est con&ccedil;u pour le suivi, pas pour la modification des inscriptions.

| Fonctionnalit&eacute; | Description |
|---|---|
| **Vue d'ensemble** | Nombre total d'inscriptions, r&eacute;partition par cat&eacute;gorie (gouvernement, partenaire, soci&eacute;t&eacute; civile, etc.), &eacute;volution dans le temps |
| **Liste des participants** | Tableau consultable et filtrable : nom, email, organisation, cat&eacute;gorie, pr&eacute;f&eacute;rence linguistique, date d'inscription |
| **Export CSV** | T&eacute;l&eacute;chargement de la liste compl&egrave;te des participants au format tableur |
| **Vue jetons / QR codes** | Voir les jetons actifs, leur statut, et t&eacute;l&eacute;charger les QR codes *(Option A uniquement)* |

### 4.3 Ce que le tableau de bord ne fait pas

- Pas de modification ni de suppression d'inscriptions
- Pas de processus d'approbation (l'inscription est imm&eacute;diate)
- Pas de communications par email aux inscrits (hors p&eacute;rim&egrave;tre)

## 5. Question pour le comit&eacute;

**Inscription par panel :** Le programme de l'&eacute;v&eacute;nement comprend deux panels de discussion. Le formulaire d'inscription devrait-il demander aux participants &agrave; quel(s) panel(s) ils souhaitent assister ?

- **Oui :** Ajout de cases &agrave; cocher pour la s&eacute;lection des panels. Le tableau de bord afficherait le nombre de participants par panel pour la planification des capacit&eacute;s.
- **Non :** Une inscription unique au niveau de l'&eacute;v&eacute;nement suffit.

C'est un ajout simple si souhait&eacute; et cela ne modifie pas l'architecture g&eacute;n&eacute;rale.

## 6. Visibilit&eacute; et r&eacute;f&eacute;rencement

- La page d'inscription est **retir&eacute;e de la navigation publique du site et du sitemap**
- Les moteurs de recherche ne pourront ni indexer ni d&eacute;couvrir la page d'inscription
- Le **seul point d'entr&eacute;e** vers l'inscription est l'URL du QR code
- Les visiteurs acc&eacute;dant directement &agrave; `/register` (sans jeton) voient le message &laquo; sur invitation uniquement &raquo;

## 7. R&eacute;sum&eacute; s&eacute;curit&eacute;

| Mesure | D&eacute;tail |
|---|---|
| Validation du jeton | C&ocirc;t&eacute; serveur au chargement de la page ET &agrave; la soumission du formulaire |
| Format du jeton | G&eacute;n&eacute;r&eacute; cryptographiquement, 32+ caract&egrave;res |
| Authentification | Supabase Auth avec comptes individuels pour le comit&eacute; |
| Acc&egrave;s aux donn&eacute;es | Donn&eacute;es d'inscription lisibles uniquement par les membres authentifi&eacute;s |
| RGPD | Suivi du consentement avec horodatage (existant) |
| Verrouillage automatique | Date de fermeture configurable par jeton |

## 8. Calendrier

La mise en oeuvre peut commencer imm&eacute;diatement apr&egrave;s approbation. Le syst&egrave;me est con&ccedil;u pour &ecirc;tre op&eacute;rationnel bien avant la date de l'&eacute;v&eacute;nement du 17 avril 2026.

---

*Ce document est confidentiel et destin&eacute; au comit&eacute; d'organisation de #BuildingResilience.*
