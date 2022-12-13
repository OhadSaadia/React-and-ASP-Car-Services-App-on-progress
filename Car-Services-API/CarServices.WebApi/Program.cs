using CarServices.Entities.DB;
using CarServices.Entities.Models;
using CarServices.WebApi.Repos;
using CarServices.WebApi.Repos.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";


// Add services to the container.
builder.Services.AddDbContext<CarServicesAppDBContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("CarServicesDB")));
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<CarServicesAppDBContext>()
                .AddDefaultTokenProviders();


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.AllowAnyMethod();
                          policy.AllowAnyHeader();
                          policy.AllowAnyOrigin();

                      });
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
   .AddJwtBearer(options =>
   {
       options.SaveToken = true;
       options.RequireHttpsMetadata = false;
       options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
       {
           ValidateAudience = true,
           ValidateIssuer = true,
           ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
           ValidAudience = builder.Configuration["JWT:ValidAudience"],
           IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"]))
       };
   });

builder.Services.AddScoped<IAccountRepo, AccountRepo>();
builder.Services.AddAutoMapper(typeof(Program));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthentication();
app.UseAuthorization();


//app.Map("/api/accounts/jwtcheck", ValidateToken);

app.MapControllers();

app.Run();


//void HandleUserReferanceRoute(IApplicationBuilder app)
//{
//    string stream;
//    app.Use(async (context, next) => {
//        stream = context.Request.Headers["Authorization"].ToString().Split(" ")[1];
//        Debug.WriteLine(stream);
//        var token = new JwtSecurityTokenHandler().ReadJwtToken(stream);
//        var email = token.Claims.SingleOrDefault(claim =>
//                                    claim.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
//                                    ).Value;
//        context.Request.QueryString = context.Request.QueryString.Add("useremail", email);

//        await next.Invoke();
//    });

//    app.UseRouting();

//    app.UseEndpoints(endpoints =>
//    {
//        endpoints.MapControllers();
//    });

//}

//int? ValidateToken(IApplicationBuilder app)
//{




//    if (token == null)
//        return null;

//    var tokenHandler = new JwtSecurityTokenHandler();
//    var key = Encoding.ASCII.GetBytes(builder.Configuration["JWT:Secret"]);
//    try
//    {
//        tokenHandler.ValidateToken(token, new TokenValidationParameters
//        {
//            ValidateIssuerSigningKey = true,
//            IssuerSigningKey = new SymmetricSecurityKey(key),
//            ValidateIssuer = false,
//            ValidateAudience = false,
//            // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
//            ClockSkew = TimeSpan.Zero
//        }, out SecurityToken validatedToken);

//        var jwtToken = (JwtSecurityToken)validatedToken;
//        var userId = int.Parse(jwtToken.Claims.First(x => x.Type == "id").Value);

//        // return user id from JWT token if validation successful
//        return userId;
//    }
//    catch
//    {
//        // return null if validation fails
//        return null;
//    }
//}




//public class SimpleResponseMiddleware
//{
//    private readonly RequestDelegate _next;
//    private readonly IConfiguration _configuration;
//    string stream;
//    public SimpleResponseMiddleware(RequestDelegate next,
//                                    IConfiguration configuration)
//    {
//        _next = next;
//        _configuration = configuration;
//    }

//    public async Task InvokeAsync(HttpContext context)
//    { 
//        stream = context.Request.Headers["Authorization"].ToString().Split(" ")[1];
//        var key = Encoding.ASCII.GetBytes(_configuration["JWT:Secret"]);
//        try
//        {
//            new JwtSecurityTokenHandler().ValidateToken(stream, new TokenValidationParameters
//            {
//                ValidateIssuerSigningKey = true,
//                IssuerSigningKey = new SymmetricSecurityKey(key),
//                ValidateIssuer = false,
//                ValidateAudience = false,
//                // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
//                ClockSkew = TimeSpan.Zero
//            }, out SecurityToken validatedToken);
//        }
//        catch
//        {
//            // return null if validation fails
//            return null;
//        }
//    }
//}


//public static class MiddlewareExtensions
//{
//    public static IApplicationBuilder UseSimpleResponseMiddleware(this IApplicationBuilder builder)
//    {
//        return builder.UseMiddleware<SimpleResponseMiddleware>();
//    }
//}