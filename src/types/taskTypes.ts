// Rating is priority in the form and changed to a string, but rating in the database is a number.
// Rating is converted to a number before sending it to the database in the saveTaskHooks.
// Date is deadline in the form and should be optional in the app.

export type Task = {
  id: string;
  title: string;
  category: string;
  status: string;
  rating: number;
  date?: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export type TaskFormData = Omit<Task, "id" | "createdAt" | "updatedAt">;
