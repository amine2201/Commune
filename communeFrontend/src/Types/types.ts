

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