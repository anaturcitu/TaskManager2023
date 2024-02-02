using WebAppProject.Models.Entities;

namespace WebAppProject.DTO
{
    public class AddNewTaskDto
    {
        public Guid project_id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string End_date { get; set; }
        public Priority Priority { get; set; }
    }
}
