export interface FilesVersionRoot {
  id: string;
  createdAt: string;
  fileName: string;

  projectId: string;
  filesVersion: FilesVersion[];
}

export interface File {}
export interface FilesVersion {
  currentVersion: boolean;
  scale: number;
  urlPath: string;
  versionId: string;
  createdAt: string;
  versionNumber: number;
  id: string;
  size: number;
}
