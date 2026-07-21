export interface UserProjection {
  id: string;
  username: string;
  displayName?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  primaryPhone?: string | null;
  avatarUrl?: string | null;
  locale?: string | null;
}

export interface GetUsersByIdsRequest {
  ids: string[];
}

export interface GetUsersByIdsResponse {
  users: UserProjection[];
}

export interface UserServiceClient {
  getUsersByIds(request: GetUsersByIdsRequest): Promise<GetUsersByIdsResponse>;
}
