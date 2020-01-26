using Microsoft.AspNetCore.Mvc;
using System.Text.Encodings.Web;

namespace Portfolio.Controllers
{
    public class TicTacController : Controller
    {
        // 
        // GET: /TicTac/

        public IActionResult Index()
        {
            return View();
        }

    }
}