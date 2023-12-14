namespace WebAppProject.Models.Entities
{
    public class Project
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string? Creation_date { get; set; }
        public List<ProjectTask>? Tasks { get; set; }
    }
}
