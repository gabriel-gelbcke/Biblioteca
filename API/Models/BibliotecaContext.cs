using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore.Sqlite;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

public class BibliotecaContext : DbContext
{
    public DbSet<Livro> Livros { get; set; }
    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Emprestimo> Emprestimos { get; set; }
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=banco.db");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Emprestimo>()
            .HasKey(e => e.Id); 

        modelBuilder.Entity<Emprestimo>()
            .HasOne(e => e.Livro)         
            .WithMany()                     
            .HasForeignKey(e => e.LivroId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<Emprestimo>()
            .HasOne(e => e.Usuario)
            .WithMany()
            .HasForeignKey(e => e.UsuarioId)
            .OnDelete(DeleteBehavior.SetNull);
    }

    public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp",
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:3000")
                               .AllowAnyMethod()
                               .AllowAnyHeader();
                    });
            });

            // Outras configurações do serviço
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseRouting();

            app.UseCors("AllowReactApp");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
}