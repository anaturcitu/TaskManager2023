using WebAppProject.Models.Entities;

namespace WebAppProject.Repositories
{
    public interface IProjectRepository
    {
        public void CreateNewProject(Project p);
        public void CreateNewTask(ProjectTask t);
        public void AddUserToProject(UserProject up);
        public List<Project> GetAllProjects();
        public List<Project> GetUserProjects(string username);
    }
}
