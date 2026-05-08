# Forslag til evaluering i IS-217

Bruk denne for å dokumentere funn i oppgaven.

## 1) Testoppsett

- Antall testpersoner: ____
- Enheter: ____
- Scenarioer:
  1. Finne et arrangement
  2. Legge arrangement i favoritter
  3. Legge billett i kurv
  4. Bytte brukerprofil
  5. Sende inn tilbakemelding

## 2) Brukbarhet (1–5)

- Lærbarhet: ____
- Effektivitet: ____
- Feilrate: ____
- Tilfredshet: ____

## 3) Støtte for flere brukere

Vurdering:

- [ ] Brukerdata holdes separert per profil
- [ ] Rolle vises tydelig
- [ ] UI oppfører seg stabilt ved raskt bytte av bruker
- [ ] Data gjenlastes riktig etter refresh

Kommentar:

## 4) Begrensninger og forbedringer

### Begrensninger nå

- Lokal lagring i nettleser (ikke delt mellom klienter)
- Ingen autentisering
- Ingen server-side validering

### Neste steg

- Backend (f.eks. Node/Express)
- Database (f.eks. PostgreSQL)
- Ekte innlogging og roller
- Logging/analytics for bedre evaluering
