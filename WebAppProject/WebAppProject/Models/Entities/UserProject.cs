using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAppProject.Models.Entities
{
    public class UserProject
    {
        [Key]
        public Guid UserProjectId { get; set; }
        public string UserId { get; set; }
        public Guid ProjectId { get; set; }
        [ForeignKey("UserId")]
        public IdentityUser User { get; set; }
        [ForeignKey("ProjectId")]
        public Project Project { get; set; }
    }
}
