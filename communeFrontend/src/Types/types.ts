export type userType = {
   email: string,
    password: string,
    cin?: string,
}
export enum documentType {
    legalisation = "LEGALISATION",
    certification = "CERTIFICATION",
}

export type uploadData = {
    _file? : File ,
    documentType? : documentType,
    CINs : string[],
    
} 
export enum notificationType  {
    documentToSign = "DOCUMENT_TO_SIGN",
    documentApproved = "DOCUMENT_APPROVED",
    documentRejected = "DOCUMENT_REJECTED"
}

export type notification={
    id:string,
    message:string,
    type:notificationType,
    citoyenId:string,
    documentId:string
}