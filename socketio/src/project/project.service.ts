import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from './project.schema';
import { Model } from 'mongoose';
import { Counter } from './counter.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    @InjectModel('Counter') private readonly counterModel: Model<Counter>,
  ) { }

  async create(projectData: { name: string; description: string }): Promise<Project> {
    const counter = await this.counterModel.findOneAndUpdate(
      { id: 'projectId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const project = new this.projectModel({
      id: counter.seq,
      ...projectData,
    });

    return project.save();
  }

  findAll() {
    return this.projectModel.find().exec();
  }

  async findOne(id: number) {
    return await this.projectModel.findOne({ id });
  }

  async update(id: number, updateData: any) {
    const { _id, ...cleanData } = updateData;
    return await this.projectModel.findOneAndUpdate({ id }, cleanData, { new: true });
  }


  remove(id: number) {
    return this.projectModel.deleteOne({ id: id });
  }
}
