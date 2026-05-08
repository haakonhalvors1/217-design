using Microsoft.AspNetCore.Mvc;

namespace FestivalMvc.Controllers;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        ViewData["Title"] = "Landstreffet Stavanger 2026";
        return View();
    }

    public IActionResult Billetter()
    {
        ViewData["Title"] = "Kjøp Billetter - Landstreffet Stavanger";
        return View();
    }

    public IActionResult Fordeler()
    {
        ViewData["Title"] = "LS-Fordeler - Landstreffet Stavanger";
        return View();
    }

    public IActionResult Info()
    {
        ViewData["Title"] = "LS-Info - Landstreffet Stavanger";
        return View();
    }

    public IActionResult Artister()
    {
        ViewData["Title"] = "Artister - Landstreffet Stavanger";
        return View();
    }

    public IActionResult Samarbeid()
    {
        ViewData["Title"] = "Samarbeid - Landstreffet Stavanger";
        return View();
    }

    public IActionResult LS2027()
    {
        ViewData["Title"] = "LS2027 - Landstreffet Stavanger";
        return View();
    }
}
