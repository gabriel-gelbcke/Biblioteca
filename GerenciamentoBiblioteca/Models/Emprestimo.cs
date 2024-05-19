public class Emprestimo
{
    public Emprestimo(){
        Id = Guid.NewGuid().ToString();
    }

    public Emprestimo(String livroId, String usuarioId, string dataemprestimo, string datadevolucao){
        LivroId = livroId;
        UsuarioId = usuarioId;
        DataEmprestimo = dataemprestimo;
        DataDevolucao = datadevolucao;
        Id = Guid.NewGuid().ToString();
    }


    public string? Id { get; set; }
    

    public string? LivroId { get; set; }
    public Livro? Livro { get; set; }


    public string? UsuarioId { get; set; }
    public Usuario? Usuario { get; set; }


    public string? DataEmprestimo { get; set; }
    public string? DataDevolucao { get; set; }
}