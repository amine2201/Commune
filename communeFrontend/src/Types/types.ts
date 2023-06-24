export type userType = {
   email: string,
    password: string,
    cin?: string,
}
export enum documentType {
    legalisation = "Legalisation",
    certification = "Certification",
}

export type uploadData = {
    _file? : File ,
    documentType? : documentType,
    CINs : string[],
    
} 