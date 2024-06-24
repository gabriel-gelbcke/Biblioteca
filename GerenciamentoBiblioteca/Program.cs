using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);

// Adiciona serviços ao contêiner
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<BibliotecaContext>();

// Configuração do CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

var app = builder.Build();

// Middleware
app.UseHttpsRedirection();

app.UseCors("AllowAll"); // Adicione esta linha para usar a política de CORS

app.UseAuthorization();

app.MapControllers(); // Certifique-se de que este middleware está presente

app.MapGet("/", () => "Bem-vindo à API de Gerenciamento de Biblioteca");

////// LIVRO //////
app.MapPost("/api/livro/cadastrar", ([FromBody] Livro livro, [FromServices] BibliotecaContext banco) =>
{
    Livro? livroBusca = banco.Livros.FirstOrDefault(u => u.Id == livro.Id);

    if (livro.Titulo.Length <= 0 || livro.Autor.Length <= 0 || livro.AnoPublicacao <= 1 || livro.QuantidadeLivro <= 1){
        return Results.BadRequest("Algo deu errado no cadastro!");
    }

    if(livroBusca == null){
        banco.Livros.Add(livro);
        banco.SaveChanges();
        return Results.Created($"/livros/buscar/{livro.Id}", livro);
    }
    return Results.BadRequest("Já existe um livro cadastrado com esse ID!"); 
});

app.MapGet("/api/livros/listar", ([FromServices] BibliotecaContext banco) =>
{
    if (banco.Livros.Any())
    {
        return Results.Ok(banco.Livros.ToList());
    }
    return Results.NotFound("Não existem livros na tabela");
});

app.MapDelete("/api/livro/deletar/{id}", ([FromRoute] string Id, [FromServices] BibliotecaContext banco) => 
{
    Livro? livroBusca = banco.Livros.FirstOrDefault(u => u.Id == Id);

    if(livroBusca != null){
        banco.Livros.Remove(livroBusca);
        banco.SaveChanges();
        return Results.Created($"/livros/buscar/{Id}", livroBusca);
    }
    return Results.BadRequest("Livro não encontrado!"); 
});

app.MapPut("/api/livro/alterar/{id}", async ([FromRoute] string id, [FromBody] Livro livroAtualizado, [FromServices] BibliotecaContext banco) =>
{
    var livroBusca = await banco.Livros.FindAsync(id);

    if (livroBusca == null)
    {
        return Results.NotFound("Livro não encontrado");
    }

    livroBusca.Titulo = livroAtualizado.Titulo;
    livroBusca.Autor = livroAtualizado.Autor;
    livroBusca.QuantidadeLivro = livroAtualizado.QuantidadeLivro;
    livroBusca.AnoPublicacao = livroAtualizado.AnoPublicacao;

    await banco.SaveChangesAsync();

    return Results.Ok(livroBusca);
});

////// USUARIO //////
app.MapPost("/api/usuario/cadastrar", ([FromBody] Usuario usuario, [FromServices] BibliotecaContext banco) =>
{
    Usuario? usuarioBusca = banco.Usuarios.FirstOrDefault(u => u.Id == usuario.Id);

    if(usuarioBusca == null){
        banco.Usuarios.Add(usuario);
        banco.SaveChanges();
        return Results.Created($"/usuario/buscar/{usuario.Id}", usuario);
    }
    return Results.BadRequest("Já existe um usuario cadastrado com esse ID!"); 
});

app.MapGet("/api/usuarios/listar", ([FromServices] BibliotecaContext banco) =>
{
    if (banco.Usuarios.Any())
    {
        return Results.Ok(banco.Usuarios.ToList());
    }
    return Results.NotFound("Não existem usuarios na tabela");
});

app.MapDelete("/api/usuario/deletar/{id}", ([FromRoute] string Id, [FromServices] BibliotecaContext banco) => 
{
    Usuario? usuarioBusca = banco.Usuarios.FirstOrDefault(u => u.Id == Id);

    Emprestimo? emprestimoBusca = banco.Emprestimos.FirstOrDefault(u => u.Usuario == usuarioBusca);

    if (usuarioBusca != null)
    {
        emprestimoBusca.UsuarioId = null;
        emprestimoBusca.Usuario = null;

        banco.Usuarios.Remove(usuarioBusca);
        banco.SaveChanges();
        return Results.Created($"/usuarios/buscar/{Id}", usuarioBusca);
    }
    return Results.BadRequest("Usuario não encontrado!"); 
});

app.MapPut("/api/usuario/alterar/{id}", async ([FromRoute] string id, [FromBody] Usuario usuarioAtualizado, [FromServices] BibliotecaContext banco) =>
{
    var usuarioBusca = await banco.Usuarios.FindAsync(id);

    if (usuarioBusca == null)
    {
        return Results.NotFound("Usuário não encontrado");
    }

    usuarioBusca.Nome = usuarioAtualizado.Nome;
    usuarioBusca.Email = usuarioAtualizado.Email;

    await banco.SaveChangesAsync();

    return Results.Ok(usuarioBusca);
});

////// EMPRESTIMO //////
app.MapPost("/api/emprestimo/cadastrar", async ([FromBody] Emprestimo emprestimo, [FromServices] BibliotecaContext banco) =>
{
    // Verificar se o usuário já tem empréstimos ativos
    bool possuiEmprestimosAtivos = await banco.Emprestimos.AnyAsync(e => e.UsuarioId == emprestimo.UsuarioId && e.DataDevolucao == null);

    Emprestimo? emprestimoBusca = banco.Emprestimos.FirstOrDefault(u => u.Id == emprestimo.Id);

    Livro? livroEmprestimo = banco.Livros.FirstOrDefault(u => u.Id == emprestimo.LivroId);

    Usuario? usuarioEmprestimo = banco.Usuarios.FirstOrDefault(u => u.Id == emprestimo.UsuarioId);

    if(livroEmprestimo == null){
        return Results.BadRequest("Livro não encontrado!"); 
    }

    if(usuarioEmprestimo == null){
        return Results.BadRequest("Usuario não encontrado!"); 
    }

    if(livroEmprestimo.QuantidadeLivro <= 0){
        return Results.BadRequest("Não há estoque!"); 
    }
    
    if(emprestimoBusca == null){
        emprestimo.Livro = banco.Livros.Find(emprestimo.LivroId);
        emprestimo.Usuario = banco.Usuarios.Find(emprestimo.UsuarioId);

        if(emprestimo.Livro == null){
            return Results.BadRequest("Livro não encontrado!"); 
        }

        if(emprestimo.Usuario == null){
            return Results.BadRequest("Usuario não encontrado!"); 
        }

        emprestimo.Livro.QuantidadeLivro--;

        banco.Emprestimos.Add(emprestimo);
        banco.SaveChanges();
        return Results.Created($"/emprestimo/buscar/{emprestimo.Id}", emprestimo);
    }
    return Results.BadRequest("Já existe um emprestimo cadastrado com esse ID!"); 
});

app.MapGet("/api/emprestimos/listar", ([FromServices] BibliotecaContext banco) =>
{
    var emprestimos = banco.Emprestimos
        .Include(e => e.Livro) 
        .Include(e => e.Usuario)  
        .ToList();

    if (emprestimos.Any())
    {
        return Results.Ok(emprestimos);
    }
    return Results.NotFound("Não existem empréstimos na tabela");
});

app.MapDelete("/api/emprestimo/deletar/{id}", ([FromRoute] string Id, [FromServices] BibliotecaContext banco) => 
{
    Emprestimo? emprestimoBusca = banco.Emprestimos.FirstOrDefault(u => u.Id == Id);

    if(emprestimoBusca != null){
        banco.Emprestimos.Remove(emprestimoBusca);
        banco.SaveChanges();
        return Results.Created($"/emprestimos/buscar/{Id}", emprestimoBusca);
    }
    return Results.BadRequest("Emprestimo não encontrado!"); 
});

app.MapDelete("/api/usuario/deletartudo", ([FromServices] BibliotecaContext banco) =>
{
    var usuarios = banco.Usuarios.ToList();

    banco.Usuarios.RemoveRange(usuarios);
    banco.SaveChanges();

    return Results.Ok("Todos os usuarios foram deletados.");
});

app.MapDelete("/api/emprestimo/deletartudo", ([FromServices] BibliotecaContext banco) =>
{
    var emprestimos = banco.Emprestimos.ToList();

    banco.Emprestimos.RemoveRange(emprestimos);
    banco.SaveChanges();

    return Results.Ok("Todos os empréstimos foram deletados.");
});

app.MapDelete("/api/livro/deletartudo", ([FromServices] BibliotecaContext banco) =>
{
    var livros = banco.Livros.ToList();

    banco.Livros.RemoveRange(livros);
    banco.SaveChanges();

    return Results.Ok("Todos os livros foram deletados.");
});

app.Run();

//Criar API

// dotnet new webapi --name primeiroapp 

// Linkar database entity framework

// dotnet add package Microsoft.EntityFrameworkCore.Sqlite 

// dotnet add package Microsoft.EntityFrameworkCore.Design 

// dotnet restore (restaura a saude das bibliotc) 

// dotnet tool install --global dotnet-ef 

// Criar banco de dados

// dotnet ef migrations add CreateDatabase 

// dotnet ef database update 

// Se nao der certo 

// dotnet tool install --global dotnet-ef 

// dotnet ef migrations add Initial 

// dotnet ef database update 

// Visual api c#

// Criar front 

// npx create-react-app meuapp --template typescript 