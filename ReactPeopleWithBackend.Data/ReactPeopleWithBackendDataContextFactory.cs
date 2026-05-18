using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactPeopleWithBackend.Data;

public class ReactPeopleWithBackendDataContextFactory : IDesignTimeDbContextFactory<ReactPeopleWithBackendDataContext>
{
    public ReactPeopleWithBackendDataContext CreateDbContext(string[] args)
    {
        var config = new ConfigurationBuilder()
           .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), 
           $"..{Path.DirectorySeparatorChar}ReactPeopleWithBackend.Web"))
           .AddJsonFile("appsettings.json")
           .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

        return new ReactPeopleWithBackendDataContext(config.GetConnectionString("ConStr"));
    }
}