import { createAction, props } from '@ngrx/store';
import { UsersActionTypes } from './types';
import { UserList, PasswordRules, Profiles, UserModel, UserCreate } from 'src/app/models/users';

// Get all

export const usersRequest = createAction(
  UsersActionTypes.usersRequest
);

export const usersSuccess = createAction(
  UsersActionTypes.usersSuccess,
  props<{ users: Array<UserList>}>()
);

export const usersFail = createAction(
  UsersActionTypes.usersFail
);

export const pwRulesRequest = createAction(
  UsersActionTypes.pwRulesRequest
);

export const pwRulesSuccess = createAction(
  UsersActionTypes.pwRulesSuccess,
  props<{ rules: Array<PasswordRules>}>()
);

export const pwRulesFail = createAction(
  UsersActionTypes.pwRulesFail
);

export const profilesRequest = createAction(
  UsersActionTypes.profilesRequest
);

export const profilesSuccess = createAction(
  UsersActionTypes.profilesSuccess,
  props<{ profiles: Array<Profiles>}>()
);

export const profilesFail = createAction(
  UsersActionTypes.profilesFail
);

// Get by IDs

export const userRequest = createAction(
  UsersActionTypes.userRequest,
  props<{ id: string}>()
);

export const userSuccess = createAction(
  UsersActionTypes.userSuccess,
  props<{ user: UserModel}>()
);

export const userFail = createAction(
  UsersActionTypes.userFail
);

// Edit

//  // User
//  //  //  Create

export const userCreateRequest = createAction(
  UsersActionTypes.userCreateRequest,
  props<{ user: UserCreate}>()
);

export const userCreateSuccess = createAction(
  UsersActionTypes.userCreateSuccess
);

export const userCreateFail = createAction(
  UsersActionTypes.userCreateFail
);
//  //  //  Data

export const userEditRequest = createAction(
  UsersActionTypes.userEditRequest,
  props<{ user: Partial<UserModel>}>()
);

export const userEditSuccess = createAction(
  UsersActionTypes.userEditSuccess
);

export const userEditFail = createAction(
  UsersActionTypes.userEditFail
);

//  //  //  Photo

export const userEditPhotoRequest = createAction(
  UsersActionTypes.userEditPhotoRequest,
  props<{ photo: string }>()
);

export const userEditPhotoSuccess = createAction(
  UsersActionTypes.userEditPhotoSuccess
);

export const userEditPhotoFail = createAction(
  UsersActionTypes.userEditPhotoFail
);

//  //  //  Password

export const userEditPasswordRequest = createAction(
  UsersActionTypes.userEditPasswordRequest,
  props<{ id: string, password: { password: string, verifyPassword: string } }>()
);

export const userEditPasswordSuccess = createAction(
  UsersActionTypes.userEditPasswordSuccess
);

export const userEditPasswordFail = createAction(
  UsersActionTypes.userEditPasswordFail
);

//  //  //  Deactivate

export const userEditDeactivateRequest = createAction(
  UsersActionTypes.userEditDeactivateRequest,
  props<{ id: string }>()
);

export const userEditDeactivateSuccess = createAction(
  UsersActionTypes.userEditDeactivateSuccess
);

export const userEditDeactivateFail = createAction(
  UsersActionTypes.userEditDeactivateFail
);

//  //  //  Activate

export const userEditActivateRequest = createAction(
  UsersActionTypes.userEditActivateRequest,
  props<{ id: string }>()
);

export const userEditActivateSuccess = createAction(
  UsersActionTypes.userEditActivateSuccess
);

export const userEditActivateFail = createAction(
  UsersActionTypes.userEditActivateFail
);

//  //  //  Profile

export const userEditProfileRequest = createAction(
  UsersActionTypes.userEditProfileRequest,
  props<{ id: string, profile: { profile_id: number } }>()
);

export const userEditProfileSuccess = createAction(
  UsersActionTypes.userEditProfileSuccess
);

export const userEditProfileFail = createAction(
  UsersActionTypes.userEditProfileFail
);


// // Rules

export const pwRuleEditRequest = createAction(
  UsersActionTypes.pwRuleEditRequest
);

export const pwRuleEditSuccess = createAction(
  UsersActionTypes.pwRuleEditSuccess,
);

export const pwRuleEditFail = createAction(
  UsersActionTypes.pwRuleEditFail
);
