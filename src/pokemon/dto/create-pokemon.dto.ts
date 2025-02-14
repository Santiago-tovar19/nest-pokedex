import { IsInt, IsPositive, IsString, MinLength } from "class-validator";

export class CreatePokemonDto {
  @IsInt()
  @IsPositive()
  no: number;

  @MinLength(1)
  @IsString()
  name: string;
}
