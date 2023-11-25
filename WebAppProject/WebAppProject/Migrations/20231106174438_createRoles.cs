using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace WebAppProject.Migrations
{
    /// <inheritdoc />
    public partial class createRoles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "53dc486e-4f00-4461-9b6d-869e323a0b39", "2", "Admin", "Admin" },
                    { "df71f91c-aba9-46f9-9e0f-256a63b61a6f", "1", "User", "User" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "53dc486e-4f00-4461-9b6d-869e323a0b39");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "df71f91c-aba9-46f9-9e0f-256a63b61a6f");
        }
    }
}
