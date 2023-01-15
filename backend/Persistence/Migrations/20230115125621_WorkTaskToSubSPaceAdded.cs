using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class WorkTaskToSubSPaceAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "SubSpaceId",
                table: "WorkTasks",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_WorkTasks_SubSpaceId",
                table: "WorkTasks",
                column: "SubSpaceId");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkTasks_SubSpaces_SubSpaceId",
                table: "WorkTasks",
                column: "SubSpaceId",
                principalTable: "SubSpaces",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkTasks_SubSpaces_SubSpaceId",
                table: "WorkTasks");

            migrationBuilder.DropIndex(
                name: "IX_WorkTasks_SubSpaceId",
                table: "WorkTasks");

            migrationBuilder.DropColumn(
                name: "SubSpaceId",
                table: "WorkTasks");
        }
    }
}
