import { IsMongoId, IsNotEmpty, IsNumber, IsString, isNotEmpty } from 'class-validator'
export class MessageDto {
  @IsNotEmpty()
  @IsString()
  readonly message: string;
  @IsNotEmpty()
  @IsString()
  readonly fromUser: string;
  @IsNotEmpty()
  @IsMongoId()
  readonly toUser: string;
}