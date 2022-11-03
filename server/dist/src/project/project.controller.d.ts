import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    create(createProjectDto: CreateProjectDto): import(".prisma/client").Prisma.Prisma__ProjectClient<import(".prisma/client").Project, never>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").Project[]>;
    projectsByCompanyId(companyId: string): import(".prisma/client").PrismaPromise<import(".prisma/client").Project[]>;
    findOne(id: string): Promise<import(".prisma/client").Project>;
    update(id: string, updateProjectDto: UpdateProjectDto): import(".prisma/client").Prisma.Prisma__ProjectClient<import(".prisma/client").Project, never>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__CompanyClient<import(".prisma/client").Company, never>;
}
