﻿using Microsoft.EntityFrameworkCore;
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
        public void AddUserToProject(UserProject up)
        {
            _dbContext.UserProjects.Add(up);
            _dbContext.SaveChanges();
        }
        public List<Project> GetAllProjects()
        { 
            return _dbContext.Projects.ToList();
        }
    }
}
