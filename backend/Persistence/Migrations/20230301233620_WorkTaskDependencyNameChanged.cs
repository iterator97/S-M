using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class WorkTaskDependencyNameChanged : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DependencyId",
                table: "WorkTaskDependencies",
                newName: "WorkTaskDependencyId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "WorkTaskDependencyId",
                table: "WorkTaskDependencies",
                newName: "DependencyId");
        }
    }
}
