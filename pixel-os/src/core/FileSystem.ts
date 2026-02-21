import projectsdata from '../data/projects.json';
import profiledata from '../data/profile.json';

// Types based on JSON
export type Project = typeof projectsdata[0];
export type Profile = typeof profiledata;

export class FileSystem {
    static getProjects(): Project[] {
        return projectsdata;
    }

    static getProfile(): Profile {
        return profiledata;
    }

    static getFile(id: string): Project | undefined {
        return projectsdata.find(p => p.id === id);
    }
}
