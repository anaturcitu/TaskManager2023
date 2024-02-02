using WebAppProject.Models.Entities;
using WebAppProject.Repositories;

namespace WebAppProject.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _repository;
        public ProjectService(IProjectRepository repository)
        {
            _repository = repository;
        }
        public void CreateNewProject(Project p)
        {
            _repository.CreateNewProject(p);
        }
        public void CreateNewTask(ProjectTask t)
        {
            _repository.CreateNewTask(t);
        }
        public void AddUserToProject(UserProject up)
        {
            _repository.AddUserToProject(up);
        }
        public List<Project> GetAllProjects()
        {
            return _repository.GetAllProjects();
        }
        public List<Project> GetUserProjects(string username)
        {
            return _repository.GetUserProjects(username);
        }
        public Project GetProjectByName(string projectName)
        {
            return _repository.GetProjectByName(projectName);
        }

        public Project GetProjectById(Guid id)
        {
            return _repository.GetProjectById(id);
        }

        public List<ProjectTask> GetAllUserTasks(string user_id)
        {
            return _repository.GetAllUserTasks(user_id);
        }
    }
}
