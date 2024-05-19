using Microsoft.AspNetCore.Mvc;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<BibliotecaContext>();

var app = builder.Build();

app.MapGet("/", () => "Bem-vindo à API de Gerenciamento de Biblioteca");

app.MapGet("/api/livros/listar", ([FromServices] BibliotecaContext banco) =>
{
    if (banco.Livros.Any())
    {
        return Results.Ok(banco.Livros.ToList());
    }
    return Results.NotFound("Não existem livros na tabela");

});

app.MapPost("/api/livro/cadastrar", ([FromBody] Livro livro, [FromServices] BibliotecaContext banco) =>
{
    Livro? livroBusca = banco.Livros.FirstOrDefault(u => u.Id == livro.Id);

    if(livroBusca == null){

        banco.Livros.Add(livro);
        banco.SaveChanges();
        return Results.Created($"/livros/buscar/{livro.Id}", livro);

    }
    return Results.BadRequest("Já existe um livro cadastrado com esse ID!"); 

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

app.MapPost("/api/usuario/cadastrar", ([FromBody] Usuario usuario, [FromServices] BibliotecaContext banco) =>
{
    Livro? livroBusca = banco.Livros.FirstOrDefault(u => u.Id == usuario.Id);

    if(livroBusca == null){

        banco.Usuarios.Add(usuario);
        banco.SaveChanges();
        return Results.Created($"/livros/buscar/{usuario.Id}", usuario);

    }
    return Results.BadRequest("Já existe um usuario cadastrado com esse ID!"); 

});

app.Run();
