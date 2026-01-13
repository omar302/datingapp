using API.Entities;

namespace API.Interfaces;

public interface ITokenService
{
    Task<string> CreateTokenAsync(AppUser user);
    string GenerateRefreshToken();
}
