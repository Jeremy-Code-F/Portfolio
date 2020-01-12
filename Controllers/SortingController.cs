using Microsoft.AspNetCore.Mvc;
using System.Text.Encodings.Web;

namespace MvcMovie.Controllers
{
    public class SortingController : Controller
    {
        // 
        // GET: /SortingController/

        public IActionResult Index()
        {
            return View();
        }

    }
}