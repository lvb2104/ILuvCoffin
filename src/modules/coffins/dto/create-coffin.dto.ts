import { IsString } from 'class-validator';

export class CreateCoffinDto {
    @IsString()
    readonly brand?: string;

    @IsString({ each: true })
    readonly colors?: string[];
}
