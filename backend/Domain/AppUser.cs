
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace Domain.Identity
{
    public class AppUser : IdentityUser
    {
        public string Name { get; set; }
        public string Surname { get; set; }
    }
}
