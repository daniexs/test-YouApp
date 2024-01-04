import { IsNotEmpty, IsString } from "class-validator";

// user.dto.ts
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;
  @IsNotEmpty()
  @IsString()
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
