using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GerenciamentoBiblioteca.Migrations
{
    /// <inheritdoc />
    public partial class oito10 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "QuantidadeLivro",
                table: "Livros",
                type: "INTEGER",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "QuantidadeLivro",
                table: "Livros");
        }
    }
}
