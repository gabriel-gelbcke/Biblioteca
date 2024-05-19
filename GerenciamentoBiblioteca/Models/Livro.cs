public class Livro{

    public Livro()
    {
        Id = Guid.NewGuid().ToString();
    }

    public Livro(string titulo, string autor, int anopublicacao){
        Titulo = titulo;
        Autor = autor;
        AnoPublicacao = anopublicacao;
        Id = Guid.NewGuid().ToString();
    }

    public string Id { get; set; }
    public string Titulo { get; set; }
    public string Autor { get; set; }
    public int AnoPublicacao { get; set; }
}