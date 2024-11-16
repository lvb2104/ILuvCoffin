import { Module } from '@nestjs/common';
import { CoffinRatingService } from './coffin-rating.service';
import { CoffinsModule } from '../coffins/coffins.module';

@Module({
  imports: [CoffinsModule],
  providers: [CoffinRatingService]
})
export class CoffinRatingModule {}
