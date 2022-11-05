import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from '@prisma/client';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    create(createProjectDto: CreateProjectDto): import(".prisma/client").Prisma.Prisma__ProjectClient<Project, never>;
    findAll(): import(".prisma/client").PrismaPromise<Project[]>;
    projectsByCompanyId(companyId: string): Promise<Project[]>;
    findOne(id: string): Promise<Project>;
    update(id: string, updateProjectDto: UpdateProjectDto): import(".prisma/client").Prisma.Prisma__ProjectClient<Project, never>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__ProjectClient<Project, never>;
}
