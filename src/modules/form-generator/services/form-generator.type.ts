export interface CreateFormPropsType {
  title: string;
  spaceId: number;
  userId: number;
}

export interface FindAllUserFormsInSpacePropsType {
  spaceId: number;
  userId: number;
}

export interface FindOneFormsInSpacePropsType {
  formId: number;
}
export interface UpdateFormPropsType {
  formId: number;
}
export interface RemoveFormPropsType {
  formId: number;
}
