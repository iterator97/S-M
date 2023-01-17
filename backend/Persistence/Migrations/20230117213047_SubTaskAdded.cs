using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class SubTaskAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AssignWorkerId",
                table: "WorkTasks",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "WorkTasks",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "WorkTasks",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDoneOnTime",
                table: "WorkTasks",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_WorkTasks_AssignWorkerId",
                table: "WorkTasks",
                column: "AssignWorkerId");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkTasks_AspNetUsers_AssignWorkerId",
                table: "WorkTasks",
                column: "AssignWorkerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkTasks_AspNetUsers_AssignWorkerId",
                table: "WorkTasks");

            migrationBuilder.DropIndex(
                name: "IX_WorkTasks_AssignWorkerId",
                table: "WorkTasks");

            migrationBuilder.DropColumn(
                name: "AssignWorkerId",
                table: "WorkTasks");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "WorkTasks");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "WorkTasks");

            migrationBuilder.DropColumn(
                name: "IsDoneOnTime",
                table: "WorkTasks");
        }
    }
}
