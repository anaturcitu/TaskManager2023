﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WebAppProject.DTO;
using WebAppProject.Models.Entities;
using WebAppProject.Services;

namespace WebAppProject.Controllers
{
    [Authorize(Roles = "User")]
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IProjectService _projectService;

        public ProjectController(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager, IProjectService projectService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _projectService = projectService;
        }
        [HttpPost("CreateProject")]
        public async Task<IActionResult> CreateProject(Project p)
        {
            var email = User.FindFirst(ClaimTypes.Email)?.Value; // gaseste emailul userului care este autentificat
            var user = await _userManager.FindByEmailAsync(email); // gaseste userul care are acel email
            
            p.Id = Guid.NewGuid();
            p.Creation_date = DateTime.Now.ToString();
            p.CreatorUsername = user.UserName;
            _projectService.CreateNewProject(p);

            UserProject userProject = new UserProject();
            userProject.Project = p;
            userProject.User = user;
            userProject.ProjectId = p.Id;
            userProject.UserId = user.Id;

            _projectService.AddUserToProject(userProject);
            return Ok(p);
        }
        [HttpGet("GetUserProjects")]
        public async Task<IActionResult> GetUserProjects()
        {
            var email = User.FindFirst(ClaimTypes.Email)?.Value; // gaseste emailul userului care este autentificat
            var user = await _userManager.FindByEmailAsync(email); // gaseste userul care are acel email

            var projectList = _projectService.GetUserProjects(user.UserName);
            return Ok(projectList);
        }
        [HttpPost("AssignNewMember")] // ASIGN MEMBER TO PROJECT
        public async Task<IActionResult> AssignNewMember(AddUserToProjectDto addUserToProjectDto)
        {
            bool user_exists = true;
            var project = _projectService.GetProjectByName(addUserToProjectDto.ProjectName);
            if (addUserToProjectDto.Email != null)
            {
                var user = await _userManager.FindByEmailAsync(addUserToProjectDto.Email); // gaseste userul care are acel email
                if(user == null)
                {
                    user_exists = false;
                }
                else
                {
                    UserProject userProject = new UserProject();
                    userProject.Project = project;
                    userProject.User = user;
                    userProject.UserId = user.Id;
                    userProject.ProjectId = project.Id;
                    _projectService.AddUserToProject(userProject);
                }
            }
            if (addUserToProjectDto.UserName != null)
            {
                var user = await _userManager.FindByNameAsync(addUserToProjectDto.UserName); // gaseste userul care are acel email
                if (user == null)
                {
                    user_exists = false;
                }
                else
                {
                    UserProject userProject = new UserProject();
                    userProject.Project = project;
                    userProject.User = user;
                    userProject.UserId = user.Id;
                    userProject.ProjectId = project.Id;
                    _projectService.AddUserToProject(userProject);
                }
            }
            if(user_exists == true)
            {
                return StatusCode(StatusCodes.Status201Created,
             new Models.Response.Response { Status = "Succes", Message = "User added to project!" });
            }
            else
            {
                return StatusCode(StatusCodes.Status404NotFound,
             new Models.Response.Response { Status = "Error", Message = "User doesn't exist!" });
            }
        }

        [HttpPost("CreateNewTask")]
        public IActionResult CreateNewTask(AddNewTaskDto addNewTaskDto)
        {
            var project = _projectService.GetProjectById(addNewTaskDto.project_id);
            ProjectTask projectTask = new ProjectTask();
            projectTask.Priority = addNewTaskDto.Priority;
            projectTask.Creation_date = DateTime.Now.ToString();
            projectTask.End_date = addNewTaskDto.End_date;
            projectTask.Name = addNewTaskDto.Name;
            projectTask.Description = addNewTaskDto.Description;
            projectTask.Project = project;
            projectTask.ProjectId = project.Id;
            _projectService.CreateNewTask(projectTask);
            return Ok();
        }

        [HttpGet("GetUserTasks")]
        public async Task<IActionResult> GetUserTasks()
        {
            var email = User.FindFirst(ClaimTypes.Email)?.Value; // gaseste emailul userului care este autentificat
            var user = await _userManager.FindByEmailAsync(email); // gaseste userul care are acel email

            var taskList = _projectService.GetAllUserTasks(user.Id);
            return Ok(taskList);
        }
    }
}
