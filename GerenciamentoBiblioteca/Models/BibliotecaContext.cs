using Microsoft.EntityFrameworkCore;

public class BibliotecaContext : DbContext
{
    public DbSet<Livro> Livros { get; set; }
    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Emprestimo> Emprestimos { get; set; }
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=banco.db");

    }
}
