import { IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    readonly name?: string;

    @IsString({ each: true })
    readonly phones?: string[];
}
