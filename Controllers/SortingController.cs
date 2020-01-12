using Microsoft.AspNetCore.Mvc;
using System.Text.Encodings.Web;

namespace MvcMovie.Controllers
{
    public class SortingController : Controller
    {
        // 
        // GET: /SortingController/

        public string Index()
        {
            return "This is my default action...";
        }

        // 
        // GET: /SortingController/Welcome/ 

        public string Welcome()
        {
            return "This is the Welcome action method...";
        }
    }
}