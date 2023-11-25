namespace WebAppProject.Models.Emails
{
    public class EmailConfiguration
    {
        public string From { get; set; }
        public string SmtpServer { get; set; } // simple mail transfer protocol
        public int Port { get; set; } // port = 25
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
