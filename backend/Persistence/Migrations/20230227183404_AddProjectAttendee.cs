using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddProjectAttendee : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectAttendee_AspNetUsers_AppUserId",
                table: "ProjectAttendee");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectAttendee_Projects_ProjectId",
                table: "ProjectAttendee");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProjectAttendee",
                table: "ProjectAttendee");

            migrationBuilder.RenameTable(
                name: "ProjectAttendee",
                newName: "ProjectAttendees");

            migrationBuilder.RenameIndex(
                name: "IX_ProjectAttendee_ProjectId",
                table: "ProjectAttendees",
                newName: "IX_ProjectAttendees_ProjectId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectAttendees",
                table: "ProjectAttendees",
                columns: new[] { "AppUserId", "ProjectId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectAttendees_AspNetUsers_AppUserId",
                table: "ProjectAttendees",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectAttendees_Projects_ProjectId",
                table: "ProjectAttendees",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectAttendees_AspNetUsers_AppUserId",
                table: "ProjectAttendees");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectAttendees_Projects_ProjectId",
                table: "ProjectAttendees");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProjectAttendees",
                table: "ProjectAttendees");

            migrationBuilder.RenameTable(
                name: "ProjectAttendees",
                newName: "ProjectAttendee");

            migrationBuilder.RenameIndex(
                name: "IX_ProjectAttendees_ProjectId",
                table: "ProjectAttendee",
                newName: "IX_ProjectAttendee_ProjectId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectAttendee",
                table: "ProjectAttendee",
                columns: new[] { "AppUserId", "ProjectId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectAttendee_AspNetUsers_AppUserId",
                table: "ProjectAttendee",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectAttendee_Projects_ProjectId",
                table: "ProjectAttendee",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
