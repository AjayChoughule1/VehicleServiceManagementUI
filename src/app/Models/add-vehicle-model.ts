export interface AddVehicleRequest{
    VehicleCategory: string;
    VehicleRegNo: string;
    VehicleNumber: string;
    VehicleModel: string;
    VehicleBrand: string;
    Status:string,
    IsDeleted: boolean;
    CreatedDate: Date;
    UpdatedDate: Date;
    CustomerId:number
}