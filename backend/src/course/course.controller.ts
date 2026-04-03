import { Controller, Get, Param, Query } from '@nestjs/common';
import { CourseService } from './course.service';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async findAll(
    @Query()
    query: {
      search?: string;
      category?: string;
      minPrice?: string;
      maxPrice?: string;
    },
  ) {
    return await this.courseService.findAll({
      search: query.search,
      category: query.category,
      minPrice: query.minPrice ? Number(query.minPrice) : undefined,
      maxPrice: query.maxPrice ? Number(query.maxPrice) : undefined,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.courseService.findOne(id);
  }
}
