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