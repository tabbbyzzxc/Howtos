using BusinessEntities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace DataAccess
{
    public class HTDbContext : DbContext
    {
        public HTDbContext()
        {
            var dbExists = Database.EnsureCreated();
            if (dbExists)
            {
                /*GenerateRandomObjects();*/
            }

        }

        public HTDbContext(DbContextOptions options)
            : base(options)
        {
            var dbExists = Database.EnsureCreated();
        }


        public DbSet<HowTo> HowTos { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(connectionString:
               "Server=localhost;Port=5432;User Id=postgres;Password=159874;Database=HowToDB;");
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.LogTo(Console.WriteLine);
        }


    }
}
