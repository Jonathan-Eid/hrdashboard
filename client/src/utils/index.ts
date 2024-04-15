// Thanks ChatGPT: https://chat.openai.com/share/01742fc4-c2dc-48ad-bfdf-0b0473078b2f
export function formatUSD(amount: number): string {
    // Create a NumberFormat object with USD currency style
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });
    
    // Format the amount using the formatter
    return formatter.format(amount);
}


export function statusToActiveString(status:boolean): string {

    return status ? "Active" : "Inactive"

}

export function cmpStr2Num (val1 :any, val2: any){
    if ((typeof val1 === 'string' && typeof val2 === 'number')
     || (typeof val2 === 'string' && typeof val1 === 'number'))
       return Number(val1) === Number(val2)
  }