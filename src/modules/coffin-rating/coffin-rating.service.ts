import { Injectable } from '@nestjs/common';
import { CoffinsService } from '../coffins/coffins.service';

@Injectable()
export class CoffinRatingService {
    constructor(private readonly coffinService: CoffinsService) {}
}
