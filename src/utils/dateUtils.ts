

export const IsoToNormalDate = (dateString:string) => {
  try {
    return new Date(dateString).toISOString().split("T")[0];
  } catch (error) {
    console.log(error)
    return "";
  }
};


export const IsoToReadableFormat = (dateString: string) => {
    try {
        console.log(dateString,": string or what date?")
        
        const date = new Date(dateString)
        const userLocale = navigator.language;
        return  date.toLocaleDateString(userLocale,{
            day: "numeric",
            month: "short",
            year: "numeric"
        })

    } catch (error) {
        console.log(error)
        return ""
    }
}
