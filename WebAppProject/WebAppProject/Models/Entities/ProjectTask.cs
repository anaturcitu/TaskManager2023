namespace WebAppProject.Models.Entities
{
    public enum Priority
    {
        low,
        medium,
        high
    }
    public class ProjectTask
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Creation_date { get; set; }
        public string End_date { get; set; }
        public Priority Priority { get; set; }
    }
}
