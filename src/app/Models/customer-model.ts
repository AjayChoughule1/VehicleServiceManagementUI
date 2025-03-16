
export interface Customer {
    CustomerId: number,
    FirstName: string,
    LastName: string,
    Email: string,
    Password: string,
    Address: string,
    Mobile: string,
    IsDeleted: boolean;
    CreatedDate: Date;
    UpdatedDate: Date;
}
