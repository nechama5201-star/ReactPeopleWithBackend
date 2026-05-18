using Microsoft.EntityFrameworkCore;

namespace ReactPeopleWithBackend.Data
{
    public class PersonRepository
    {
        private readonly string _connectionString;

        public PersonRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetAll()
        {
            using var context = new ReactPeopleWithBackendDataContext(_connectionString);
            return context.People.ToList();
        }

        public void Add(Person person)
        {
            using var context = new ReactPeopleWithBackendDataContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }

        public void Update(Person person)
        {
            using var context = new ReactPeopleWithBackendDataContext(_connectionString);
            context.People.Update(person);
            context.SaveChanges();
        }

        public void Delete(int id)
        {
            using var context = new ReactPeopleWithBackendDataContext(_connectionString);
            var person = context.People.FirstOrDefault(p => p.Id == id);
            if (person != null)
            {
                context.People.Remove(person);
                context.SaveChanges();
            }
        }

        public void DeleteAll(List<int> personIds)
        {
            using var context = new ReactPeopleWithBackendDataContext(_connectionString);
            var people = context.People.Where(p => personIds.Contains(p.Id)).ToList();
            foreach (var person in people)
            {
                context.People.Remove(person);
            }
            context.SaveChanges();
        }
    }
}