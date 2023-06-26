

export type User = {
    id?: string,
    email: string,
    password: string
    userType?: userType
}
export enum userType {
    citoyen = "CITOYEN",
    admin = "ADMIN",
    employee = "EMPLOYEE"
}
export type Citoyen = User & {
    firstName?: string,
    lastName?: string,
    cin: string
}
export type Employee = User & {
    firstName: string,
    lastName: string
}


export enum DocumentType {
    legalisation = "LEGALISATION",
    certification = "CERTIFICATION",
}
export type document = {
    id?: number | undefined,
    name?: string,
    type: DocumentType,
    employeeId?: string,
    citoyenIds?: string[],
    signeesIds?: string[],
    status?: DocumentStatus
}
export enum DocumentStatus {
    pending = "PENDING",
    approved = "APPROVED",
    rejected = "REJECTED"
}
export type UploadData = {
    _file? : File ,
    documentType? : DocumentType,
    CINs : string[],
    
} 
export type Userdata = {
    id?: number | undefined,
    email: string,
    cin?: string,
    role?: string, }
export enum NotificationType  {
    documentToSign = "DOCUMENT_TO_SIGN",
    documentApproved = "DOCUMENT_APPROVED",
    documentRejected = "DOCUMENT_REJECTED"
}

export type Notification={
    id:string,
    message:string,
    type:NotificationType,
    citoyenId:string,
    documentId:string
}