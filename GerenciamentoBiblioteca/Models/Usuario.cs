public class Usuario{

    public Usuario(){
        Id = Guid.NewGuid().ToString();
    }

    public Usuario(string nome, string email){
        Nome = nome;
        Email = email;
        Id = Guid.NewGuid().ToString();
    }
    
    public string Id { get; set; }
    public string Nome { get; set; }
    public string Email { get; set; }

}