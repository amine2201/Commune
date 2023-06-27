

export type User = {
    id?: number,
    email: string,
    password: string
    role?: Role
}
export enum Role {
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
    documentType: DocumentType,
    employeeId?: string,
    citoyenIds?: number[],
    signeesIds?: number[],
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