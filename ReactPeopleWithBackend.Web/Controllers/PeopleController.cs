using Microsoft.AspNetCore.Mvc;
using ReactPeopleWithBackend.Data;
using ReactPeopleWithBackend.Web.Models;

namespace ReactPeopleWithBackend.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly string _connectionString;

        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        public List<Person> GetAll()
        {
            var repo = new PersonRepository(_connectionString);
            return repo.GetAll();
        }

        [HttpPost]
        public void Add(Person person)
        {
            var repo = new PersonRepository(_connectionString);
            repo.Add(person);
        }

        [HttpPost]
        public void Update(Person person)
        {
            var repo = new PersonRepository(_connectionString);
            repo.Update(person);
        }

        [HttpPost]
        public void Delete(Person person)
        {
            var repo = new PersonRepository(_connectionString);
            repo.Delete(person.Id);
        }

        [HttpPost]
        public void DeleteAll(DeleteAllViewModel vm)
        {
            var repo = new PersonRepository(_connectionString);
            repo.DeleteAll(vm.PersonIds);
        }
    }

}