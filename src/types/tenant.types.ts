export enum TenantStatus {
  TENANT_STATUS_UNSPECIFIED = 'TENANT_STATUS_UNSPECIFIED',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  DISABLED = 'DISABLED',
  ARCHIVED = 'ARCHIVED',
}

export enum MembershipRole {
  MEMBERSHIP_ROLE_UNSPECIFIED = 'MEMBERSHIP_ROLE_UNSPECIFIED',
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  GUEST = 'GUEST',
}

export enum MembershipStatus {
  MEMBERSHIP_STATUS_UNSPECIFIED = 'MEMBERSHIP_STATUS_UNSPECIFIED',
  ACTIVE = 'ACTIVE',
  INVITED = 'INVITED',
  SUSPENDED = 'SUSPENDED',
  REVOKED = 'REVOKED',
}

export interface TenantProjection {
  id: string;
  name: string;
  slug: string;
  status: TenantStatus;
  createdAt: string;
  updatedAt: string;
}

export interface TenantMembershipProjection {
  tenantId: string;
  userId: string;
  role: MembershipRole;
  status: MembershipStatus;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  deletedBy?: string | null;
  deletedAt?: string | null;
}

export interface GetTenantRequest {
  id: string;
}

export interface GetTenantResponse {
  tenant: TenantProjection;
}

export interface ValidateMembershipRequest {
  tenantId: string;
  userId: string;
}

export interface ValidateMembershipResponse {
  tenantExists: boolean;
  tenantActive: boolean;
  membershipExists: boolean;
  membershipActive: boolean;
  role: MembershipRole;
  reason: string;
}

export interface ListUserTenantsRequest {
  userId: string;
}

export interface ListUserTenantsResponse {
  memberships: TenantMembershipProjection[];
}

export interface CreateMembershipRequest {
  tenantId: string;
  userId: string;
  role: MembershipRole;
  status: MembershipStatus;
  createdBy: string;
}

export interface CreateMembershipResponse {
  membership: TenantMembershipProjection;
  created: boolean;
}

export interface UpdateMembershipStatusRequest {
  tenantId: string;
  userId: string;
  status: MembershipStatus;
  updatedBy: string;
}

export interface UpdateMembershipStatusResponse {
  membership: TenantMembershipProjection;
}

export interface RevokeMembershipRequest {
  tenantId: string;
  userId: string;
  updatedBy: string;
}

export interface RevokeMembershipResponse {
  membership: TenantMembershipProjection;
}

export interface TenantServiceClient {
  getTenant(request: GetTenantRequest): Promise<GetTenantResponse>;
  validateMembership(request: ValidateMembershipRequest): Promise<ValidateMembershipResponse>;
  listUserTenants(request: ListUserTenantsRequest): Promise<ListUserTenantsResponse>;
  createMembership(request: CreateMembershipRequest): Promise<CreateMembershipResponse>;
  updateMembershipStatus(
    request: UpdateMembershipStatusRequest,
  ): Promise<UpdateMembershipStatusResponse>;
  revokeMembership(request: RevokeMembershipRequest): Promise<RevokeMembershipResponse>;
}
