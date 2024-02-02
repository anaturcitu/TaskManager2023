using WebAppProject.Models.Entities;

namespace WebAppProject.Services
{
    public interface IProjectService
    {
        public void CreateNewProject(Project p);
        public void CreateNewTask(ProjectTask t);
        public void AddUserToProject(UserProject up);
        public List<Project> GetAllProjects();
        public List<Project> GetUserProjects(string username);
        public Project GetProjectByName(string projectName);
        public Project GetProjectById(Guid id);
        public List<ProjectTask> GetAllUserTasks(string user_id);
    }
}
