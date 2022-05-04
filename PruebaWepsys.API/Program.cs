global using PruebaWepsys.Repositorio.Servicios;
global using PruebaWepsys.Repositorio.Modelos;
using Microsoft.EntityFrameworkCore;
using PruebaWepsys.Repositorio.Data;


var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

#region Injección de la BD
string wepsysConStringDB = builder.Configuration.GetConnectionString("PruebaWepsysDB");
builder.Services.AddDbContextFactory<PruebaWebsysDbContext>(options =>
                    options.UseSqlServer(wepsysConStringDB)
                    );
#endregion

#region Injección de los servicios
builder.Services.AddTransient<IServicioPersona, ServicioPersona>();
#endregion

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "Publico",
    builder =>
    {
        builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod();
    });
});
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("Publico");

app.UseAuthorization();

app.MapControllers();

app.Run();
