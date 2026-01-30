interface ITaskItem {
  id: string;
  title: string;
  status: string;
  userId: string;
  user: string;
}

export class TaskItem implements ITaskItem {
  id: string;
  title: string;
  status: string;
  userId: string;
  user: string;

  constructor(id: string, title: string, status: string, userId: string, user: string) {
    this.id = id;
    this.title = title;
    this.status = status;
    this.userId = userId;
    this.user = user;
  }
}
