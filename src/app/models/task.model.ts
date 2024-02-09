export class Task {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public priorityLevel: string,
    public status: string,
    public dueDate: Date
  ) {}
}
