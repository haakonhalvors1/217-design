# IS-217 festivalnettside (Mappe 2)

Dette er en **ASP.NET Core MVC**-løsning med **Razor views** og **C#**, uten database og uten modeller.

Målet er å levere en kjørbar forside som følger designet deres, med forbedringer fra evalueringen i Mappe 1.

## Struktur

- `Program.cs` – oppstart og routing
- `Controllers/HomeController.cs` – controller for forsiden
- `Views/Home/Index.cshtml` – forside i Razor
- `Views/Shared/_Layout.cshtml` – felles layout
- `wwwroot/css/site.css` – styling
- `wwwroot/js/site.js` – enkel frontend-logikk

## Hvordan kjøre

1. Åpne mappen i VS Code.
2. Kjør `dotnet restore`.
3. Kjør `dotnet run`.
4. Åpne adressen som vises i terminalen (typisk `https://localhost:xxxx`).

## Begrensninger

- Ingen database (ingen persistent lagring på server)
- Ingen autentisering/autorisasjon
- Ingen domenemodeller ennå

Senere kan dere legge til modeller, database og innlogging hvis oppgaven krever det.
