import { Injectable } from "@nestjs/common";
import {
  firstValueFrom,
  toArray,
  from,
  map,
  mergeAll,
  take,
  Observable,
  defer
} from "rxjs";
import axios from "axios";

@Injectable()
export class RxjsService {
  private readonly githubURL = "https://api.github.com/search/repositories?q=";
  private readonly gitlabURL = "https://gitlab.com/api/v4/projects?search=";

  private searchGithub(text: string, count: number): Observable<any> {
    return defer(() => from(axios(`${this.githubURL}${text}`)))
      .pipe(
        map((res: any) => {
          //список найденных репозиториев
          return res.data.items;
        }),
        mergeAll()
      )
      .pipe(
        //id и имя в результате
        map((res: any) => {
          return {id: res.id, fullName: res.full_name}}),
        take(count)
      );
  }

  private searchGitlab(text: string, count: number): Observable<any> {
    return defer(() => from(axios(`${this.gitlabURL}${text}`)))
      .pipe(
        map((res: any) => {
          //список найденных репозиториев
          return res.data;
        }),
        mergeAll()
      )
      .pipe(
        //id и имя в результате
        map((res: any) => {
          return {id: res.id, fullName: res.name}}),
        take(count)
      );
  }

  async searchRepositories(text: string, hub: string, count: number): Promise<any> {
    if (hub === "github"){ 
      const data$ = this.searchGithub(text, count).pipe(toArray());
      return await firstValueFrom(data$);
    }
    else if (hub === "gitlab"){
      const data$ = this.searchGitlab(text, count).pipe(toArray());
      return await firstValueFrom(data$);
    } else {
      return Promise.resolve({error: "hub should be github or gitlab"})
    }
  }
}
