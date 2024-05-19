using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GerenciamentoBiblioteca.Migrations
{
    /// <inheritdoc />
    public partial class dois : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Emprestimos_Livros_LivroId",
                table: "Emprestimos");

            migrationBuilder.DropIndex(
                name: "IX_Emprestimos_LivroId",
                table: "Emprestimos");

            migrationBuilder.AlterColumn<string>(
                name: "Id",
                table: "Livros",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddColumn<string>(
                name: "LivroId1",
                table: "Emprestimos",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Emprestimos_LivroId1",
                table: "Emprestimos",
                column: "LivroId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Emprestimos_Livros_LivroId1",
                table: "Emprestimos",
                column: "LivroId1",
                principalTable: "Livros",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Emprestimos_Livros_LivroId1",
                table: "Emprestimos");

            migrationBuilder.DropIndex(
                name: "IX_Emprestimos_LivroId1",
                table: "Emprestimos");

            migrationBuilder.DropColumn(
                name: "LivroId1",
                table: "Emprestimos");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Livros",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT")
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.CreateIndex(
                name: "IX_Emprestimos_LivroId",
                table: "Emprestimos",
                column: "LivroId");

            migrationBuilder.AddForeignKey(
                name: "FK_Emprestimos_Livros_LivroId",
                table: "Emprestimos",
                column: "LivroId",
                principalTable: "Livros",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
