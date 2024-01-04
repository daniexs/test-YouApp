import { IsArray, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProfileDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @IsNotEmpty()
  @IsString()
  readonly gender: string;
  @IsNotEmpty()
  @IsDate()
  readonly birthday : Date;
  readonly horoscope : string;
  readonly zodiac: string;
  @IsNotEmpty()
  @IsNumber()
  readonly height: number;
  @IsNotEmpty()
  @IsNumber()
  readonly weight: number;
  @IsNotEmpty()
  @IsArray()
  readonly interests : string[];
}