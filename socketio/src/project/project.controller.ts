import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { ProjectService } from './project.service';
import { NotificationService } from 'src/notification.service';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService, private readonly notificationService: NotificationService) { }

  @Post()
  async create(@Body() body: { name: string; description: string }) {
    // Create the project first
    const project = await this.projectService.create(body);

    // Then trigger the notification
    await this.notificationService.createNotification('Project Added', body.name);

    return project;
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.projectService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: { name: string; description: string }) {
    // Create the project first
    const project = await this.projectService.update(+id, body);

    // Then trigger the notification
    await this.notificationService.createNotification('Project Updated', body.name);

    return project;
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    let Project = await this.projectService.findOne(+id);

    const RProject = await this.projectService.remove(id);

    if (Project) {
    await this.notificationService.createNotification('Project Deleted', Project.name);
    }

    return RProject;
  }
}
