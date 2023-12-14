using WebAppProject.Models.Entities;

namespace WebAppProject.Services
{
    public interface IProjectService
    {
        public void CreateNewProject(Project p);
        public void CreateNewTask(ProjectTask t);
        public void AddUserToProject(UserProject up);
        public List<Project> GetAllProjects();
    }
}
