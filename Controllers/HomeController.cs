using Microsoft.AspNetCore.Mvc;

namespace FestivalMvc.Controllers;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        ViewData["Title"] = "Nordlys Festival 2026";
        return View();
    }
}
