using Microsoft.EntityFrameworkCore;
using WebAppProject.Data;
using WebAppProject.Models.Entities;

namespace WebAppProject.Repositories
{
    public class ProjectRepository:IProjectRepository
    {
        private MyDbContext _dbContext;
        public ProjectRepository(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void CreateNewProject(Project p)
        {
            _dbContext.Projects.Add(p);
            _dbContext.SaveChanges();
        }
        public void CreateNewTask(ProjectTask t)
        {
            _dbContext.ProjectTasks.Add(t);
            _dbContext.SaveChanges();
        }
        public List<Project> GetAllProjects()
        { 
            return _dbContext.Projects.ToList();
        }
        public List<Project> GetUserProjects(string username)
        {
            var projects = _dbContext.Projects.Where(p => p.CreatorUsername == username).ToList();
            return projects;
        }
        public Project GetProjectByName(string projectName)
        {
            var project = _dbContext.Projects.SingleOrDefault(p => p.Name == projectName);
            return project;
        }
        public void AddUserToProject(UserProject userProject)
        {
            _dbContext.UserProjects.Add(userProject);
            _dbContext.SaveChanges();
        }

        public Project GetProjectById(Guid id)
        {
            return _dbContext.Projects.SingleOrDefault(p => p.Id == id);
        }

        public List<ProjectTask> GetAllUserTasks(string user_id)
        {
            var userProjects = _dbContext.UserProjects // obtinem toate proiectele in care este asociat utilizatorul
                            .Where(up=>up.UserId == user_id)
                            .Include(up=>up.Project)
                            .ToList();
            var projectIds = userProjects.Select(up=>up.ProjectId).ToList(); // luam id-urile proiectelor
            var userTasks = _dbContext.ProjectTasks // luam toate task-urile utilizatorului
                .Where(pt=>projectIds.Contains(pt.ProjectId))
                .ToList();
            return userTasks;
        }
    }
}
