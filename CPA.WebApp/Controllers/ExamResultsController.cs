using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using CPA.WebApp.Config;
using RestSharp;

namespace CPA.WebApp.Controllers
{
   /// <summary>
   /// examResults Controller
   /// Normally I would have created a seperate API project for any CRUD operations
   /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class ExamResultsController: ControllerBase
    {
        private readonly string _apiUrl;
        private readonly ILogger<ExamResultsController> _logger;
        public ExamResultsController(ILogger<ExamResultsController> logger, ApplicationConfiguration configuration)
        {
            _logger = logger;
            _apiUrl = configuration.APIUrl;
        }

        [HttpGet]
        public ActionResult Get()
        {
            var client = new RestClient(_apiUrl);
            var request = new RestRequest(Method.GET);
            request.AddHeader("cache-control", "no-cache");
            request.AddHeader("content-type", "application/json");
            IRestResponse response = client.Execute(request);

            return Ok(response.Content);
        }
    }
}
