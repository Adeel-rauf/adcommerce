interface priceProps{
amount:number,
className?:string
}
export default function Price({amount,className}:priceProps) {
    const priceFormat = new Number(amount).toLocaleString('en-US',{
        style:'currency',
        currency:'USD',
        maximumFractionDigits:2
    })
    return (
        <span className={`${className}`}> {priceFormat}</span>
    );
}
